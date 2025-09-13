import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL || "");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error Connecting to the DB");
    process.exit(1);
  }
};

export const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  blogs: {
    type: Array<mongoose.Schema.Types.ObjectId>,
    required: false,
    ref: "Blog",
  },
});

export const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: false,
    },
    thumbnail: {
      type: Image,
      required: false,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true },
);

export const Blog = mongoose.model("Blog", blogSchema);
export const User = mongoose.model("User", userSchema);
