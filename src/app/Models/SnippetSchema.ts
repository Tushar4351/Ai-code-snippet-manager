import mongoose, { Schema } from "mongoose";

// Define the SingleTagType Schema
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
    _id: false,
  }
);

// Define the SingleSnippet Schema
const SingleSnippetSchema = new Schema({
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
    default: [],
  },
  description: {
    type: String,
  },
  code: {
    type: String,
  },
  language: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: "",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const SingleSnippet =
  mongoose.models.SingleSnippet ||
  mongoose.model("SingleSnippet", SingleSnippetSchema);
export default SingleSnippet;
