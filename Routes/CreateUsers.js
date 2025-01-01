// const express = require("express");
// const router = express.Router();
// const user = require("../Models/Users");
// const { body, validationResult } = require("express-validator");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const jwtSecret = "MyNameisVikasMysirNameisMishra";
// //Register
// router.post(
//   "/createuser",
//   [
//     body("name").isLength({ min: 3 }),
//     body("email").isEmail(),
//     body("password", "Incorrect password").isLength({ min: 5 }),
//   ],

//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const salt = await bcrypt.genSalt(10);
//     let secPassword = await bcrypt.hash(req.body.password, salt);

//     try {
//       await user.create({
//         name: req.body.name,
//         password: secPassword,
//         email: req.body.email,
//         location: req.body.location,
//       });

//       // Respond after successful user creation
//       res.json({ success: true });
//     } catch (error) {
//       console.log(error);
//       res.json({ success: false });
//     }
//   }
// );

// //Login

// router.post(
//   "/loginuser",
//   [
//     body("email").isEmail(),
//     body("password", "Incorrect password").isLength({ min: 5 }),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     let email = req.body.email;
//     try {
//       let userData = await user.findOne({ email });
//       if (!userData) {
//         return res
//           .status(400)
//           .json({ erors: "Try logging with correct credentials" });
//       }

//       const pwdCompare = await bcrypt.compare(
//         req.body.password,
//         userData.password
//       );
//       if (!pwdCompare) {
//         return res
//           .status(400)
//           .json({ erors: "Try logging with correct password" });
//       }

//       const data = {
//         user: {
//           id: userData.id,
//         },
//       };

//       const authToken = jwt.sign(data, jwtSecret);
//       return res.json({ success: true, authToken: authToken });
//     } catch (error) {
//       console.log(error);
//       res.json({ success: false });
//     }
//   }
// );

// module.exports = router;




const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "MyNameisVikasMysirNameisMishra";

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hash the password and save the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({ success: true, message: "User created successfully", newUser });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Login route
router.post("/loginuser", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT token
    const authToken = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "1h" });
    res.json({ success: true, authToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
