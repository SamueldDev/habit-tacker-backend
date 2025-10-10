
import{ body, validationResult } from "express-validator"

// register validator
export const registerValidator = [
  body("name").escape().notEmpty().withMessage("name is required"),
  body("email").escape().isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

// login validator
export const loginValidator = [
  body("email").escape().isEmail().withMessage("Valid email is required"),
  body("password").escape().notEmpty().withMessage("Password is required"),
];

// validation result
export const validationResultMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        return res.status(422).json({
            status: false,
            message: "Validation failed",
            errors: errors.array(),
        });
    }
    next();
}