var mongoose = require("mongoose");
var InvenSchema = new mongoose.Schema({
  description: String,
  category: String,
  subCategory: String,
  type: String,
  specification: String,
  material: String,
  quantity: Number,
  purchaseDate: Date
});
mongoose.model("WorkInven", InvenSchema);

module.exports = mongoose.model("WorkInven");
