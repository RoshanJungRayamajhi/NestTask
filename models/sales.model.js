const mongoose = require("mongoose")


const saleSchema = mongoose.Schema({
    agentName: {
    type: String,
    required: [true, "Agent name is required"],
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
    min: [0, "Amount must be a non-negative number"],
  },
  salesCount: {
    type: Number,
    required: [true, "Sales count is required"],
    min: [0, "Sales count must be a non-negative number"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
},{timestamps:true})


const saleModel = mongoose.model("Sale",saleSchema)

module.exports = saleModel;