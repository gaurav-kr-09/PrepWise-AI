const { body, param } = require("express-validator");

const createInterviewValidator = [
  body("role").trim().notEmpty().withMessage("Role is required"),
  body("type")
    .isIn(["hr", "technical"])
    .withMessage("Type must be either hr or technical"),
  body("experienceLevel").optional().trim(),
  body("questionCount")
    .optional()
    .isInt({ min: 1, max: 20 })
    .withMessage("Question count must be between 1 and 20"),
];

const answerQuestionValidator = [
  param("id").isMongoId().withMessage("Valid interview id is required"),
  body("answer").trim().notEmpty().withMessage("Answer is required"),
];

const interviewIdValidator = [
  param("id").isMongoId().withMessage("Valid interview id is required"),
];

module.exports = {
  createInterviewValidator,
  answerQuestionValidator,
  interviewIdValidator,
};
