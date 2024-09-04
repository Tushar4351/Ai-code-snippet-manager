import mongoose, { Schema } from "mongoose";

//Define the SingleTagType Schema
const SingleTagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    clerkUserId: {
      type: String,
      required: true,
    },
  },
  {
    id: false,
  }
);
const SingleSnippetSchema = new mongoose.Schema({
  clerkUserId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  isImportant: {
    type: Boolean,
    default: false,
  },
  tags: {
    type: [SingleTagSchema],
    required: true,
    default: [],
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
    default: "",
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

// Export the model
const SingleSnippet =
  mongoose.models.SingleSnippet ||
  mongoose.model("SingleSnippet", SingleSnippetSchema);
export default SingleSnippet;
