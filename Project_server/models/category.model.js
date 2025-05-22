import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    default: "",
    trim: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("Category", categorySchema);
