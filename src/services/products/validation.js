import { checkSchema, validationResult } from "express-validator";

const productsSchema = {
    name:{
        in:["body"],
        isString:{
            errorMessage:"name should be a string"
        }
    },
    description:{
        in:["body"],
        isString:{
            errorMessage:"description should be a string"
        }
    },
    brand:{
        in:["body"],
        isString:{
            errorMessage:"brand should be a string"
        }
    },
    price:{
        in:["body"],
        isNumeric:{
            errorMessage:"price should be numeric"
        }
    },
    category:{
        in:["body"],
        isString:{
            errorMessage:"category should be string"
        }
    },
    imageUrl:{
        in:["body"],
        isString:{
            errorMessage:"imageUrl should be a string"
        }
    }

}

const reviewSchema = {
  comment: {
    in: ["body"],
    isString: {
      errorMessage: "comment should be a string",
    },
  },
  rate: {
    in: ["body"],
    isNumeric: {
      errorMessage: "rating should be numeric",
    },
  },
};

const searchSchema = {
  category: {
    in: ["query"],
    isString: {
      errorMessage: "category must be a string",
    },
  },
};

export const checkProductsSchema = checkSchema(productsSchema)
export const checkSearchSchema = checkSchema(searchSchema);
export const checkReviewSchema = checkSchema(reviewSchema);

export const checkValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Product vlidation is failed");
    error.status = 400;
    next(error);
  }
  next();
};
