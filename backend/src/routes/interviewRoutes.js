const express = require("express");
const {
  createInterview,
  getMyInterviews,
  getInterviewById,
  answerQuestion,
  getInterviewHistory,
  deleteInterview,
} = require("../controllers/interviewController");
const { protect } = require("../middleware/authMiddleware");
const { validateRequest } = require("../middleware/validateMiddleware");
const {
  createInterviewValidator,
  answerQuestionValidator,
  interviewIdValidator,
} = require("../validators/interviewValidator");

const router = express.Router();

router.use(protect);

router.post("/", createInterviewValidator, validateRequest, createInterview);
router.get("/", getMyInterviews);
router.get("/history", getInterviewHistory);
router.get("/:id", interviewIdValidator, validateRequest, getInterviewById);
router.delete("/:id", interviewIdValidator, validateRequest, deleteInterview);
router.post(
  "/:id/answer",
  answerQuestionValidator,
  validateRequest,
  answerQuestion,
);

module.exports = router;
