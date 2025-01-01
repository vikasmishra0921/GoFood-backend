const mongoose = require("mongoose");

// Make sure the password is URL-encoded if it contains special characters like @
const mongoURI =
  "mongodb+srv://mishravikas8087:Vikasmishra0921@cluster0.poqdm.mongodb.net/goFoodmern?retryWrites=true&w=majority&appName=Cluster0";

const MongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB successfully.");

    // Connect to the existing 'food_items' collection
    const FoodItem = mongoose.model(
      "Fooditem",
      new mongoose.Schema({}, { collection: "food_items" })
    );

    // Fetch all documents from the collection
    const data = await FoodItem.find({});

    // Store the data globally
    global.food_items = data;

    const food_category = mongoose.model(
      "foodCategory",
      new mongoose.Schema({}, { collection: "food_category" })
    );

    const catData = await food_category.find({});

    global.food_category = catData;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
  }
};

module.exports = MongoDB;
