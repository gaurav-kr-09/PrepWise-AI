const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, default: "" },
  score: { type: Number, default: 0 },
  strengths: [{ type: String }],
  weaknesses: [{ type: String }],
  suggestions: [{ type: String }],
  feedback: { type: String, default: "" },
});

const interviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      required: [true, "Interview role is required"],
      trim: true,
    },
    type: {
      type: String,
      enum: ["hr", "technical"],
      required: true,
    },
    experienceLevel: {
      type: String,
      default: "mid",
    },
    status: {
      type: String,
      enum: ["draft", "in-progress", "completed"],
      default: "in-progress",
    },
    totalQuestions: {
      type: Number,
      default: 0,
    },
    currentQuestionIndex: {
      type: Number,
      default: 0,
    },
    questions: [questionSchema],
    evaluation: {
      overallScore: {
        type: Number,
        default: 0,
      },
      communicationScore: {
        type: Number,
        default: 0,
      },
      technicalScore: {
        type: Number,
        default: 0,
      },
      strengths: [{ type: String }],
      weaknesses: [{ type: String }],
      suggestedImprovements: [{ type: String }],
      finalSummary: {
        type: String,
        default: "",
      },
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const Interview = mongoose.model("Interview", interviewSchema);

module.exports = Interview;
