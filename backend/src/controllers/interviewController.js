const Interview = require("../models/Interview");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const {
  generateInterviewQuestions,
  evaluateCompleteInterview,
} = require("../services/geminiService");

const createInterview = asyncHandler(async (req, res) => {
  const { role, type, experienceLevel = "mid", questionCount = 5 } = req.body;

  const generatedQuestions = await generateInterviewQuestions({
    role,
    type,
    experienceLevel,
    count: questionCount,
  });

  if (!generatedQuestions.length) {
    throw new ApiError(502, "Unable to generate interview questions");
  }

  const interview = await Interview.create({
    user: req.user._id,
    role,
    type,
    experienceLevel,
    status: "in-progress",
    totalQuestions: generatedQuestions.length,
    currentQuestionIndex: 0,
    questions: generatedQuestions.map((item) => ({
      question: item.question,
    })),
  });

  res.status(201).json({
    success: true,
    message: "Interview created successfully",
    interview,
    currentQuestion: interview.questions[0],
    currentQuestionIndex: 0,
  });
});

const getMyInterviews = asyncHandler(async (req, res) => {
  const interviews = await Interview.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .populate("user", "name email");

  res.status(200).json({
    success: true,
    count: interviews.length,
    interviews,
  });
});

const getInterviewById = asyncHandler(async (req, res) => {
  const interview = await Interview.findOne({
    _id: req.params.id,
    user: req.user._id,
  }).populate("user", "name email");

  if (!interview) {
    throw new ApiError(404, "Interview not found");
  }

  res.status(200).json({
    success: true,
    interview,
  });
});

const answerQuestion = asyncHandler(async (req, res) => {
  const { answer } = req.body;

  const interview = await Interview.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!interview) {
    throw new ApiError(404, "Interview not found");
  }

  if (interview.status === "completed") {
    throw new ApiError(400, "Interview already completed");
  }

  const question = interview.questions[interview.currentQuestionIndex];
  if (!question) {
    throw new ApiError(404, "Question not found");
  }

  question.answer = answer;

  const nextQuestionIndex = interview.currentQuestionIndex + 1;
  const isLastAnswer = nextQuestionIndex >= interview.totalQuestions;

  interview.currentQuestionIndex = nextQuestionIndex;

  let evaluation = null;

  if (isLastAnswer) {
    evaluation = await evaluateCompleteInterview({
      role: interview.role,
      type: interview.type,
      experienceLevel: interview.experienceLevel,
      questions: interview.questions,
    });

    interview.status = "completed";
    interview.completedAt = new Date();
    interview.evaluation = evaluation;
  }

  await interview.save();

  res.status(200).json({
    success: true,
    message: isLastAnswer
      ? "Interview completed successfully"
      : "Answer saved successfully",
    question,
    evaluation,
    completed: isLastAnswer,
    nextQuestion: isLastAnswer ? null : interview.questions[nextQuestionIndex],
    currentQuestionIndex: interview.currentQuestionIndex,
    interview: isLastAnswer ? interview : undefined,
  });
});

const getInterviewHistory = asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 5, 1), 50);
  const skip = (page - 1) * limit;

  const filter = { user: req.user._id };

  const [history, totalCount] = await Promise.all([
    Interview.find(filter)
      .select(
        "role type experienceLevel evaluation completedAt currentQuestionIndex totalQuestions status createdAt",
      )
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Interview.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    count: history.length,
    totalCount,
    currentPage: page,
    totalPages: Math.max(Math.ceil(totalCount / limit), 1),
    limit,
    history,
  });
});

const deleteInterview = asyncHandler(async (req, res) => {
  const interview = await Interview.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!interview) {
    throw new ApiError(404, "Interview not found");
  }

  res.status(200).json({
    success: true,
    message: "Interview deleted successfully",
  });
});

module.exports = {
  createInterview,
  getMyInterviews,
  getInterviewById,
  answerQuestion,
  getInterviewHistory,
  deleteInterview,
};
