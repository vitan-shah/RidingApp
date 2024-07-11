module.exports = {
  success_response: {
    type: "object",
    properties: {
      data: {
        type: "object",
        description: "The user data",
        example: {},
      },
      msg: {
        type: "string",
        description: "Success message",
        example: "Success Response",
      },
    },
  },
  validation_response: {
    type: "object",
    properties: {
      err: {
        type: "object",
        description: "err",
        example: {},
      },
      msg: {
        type: "string",
        description: "Validation Error",
        example: "Validation error",
      },
    },
  },
};

/**
 * @swagger
 * components:
 *   schemas:
 *     validation_response:
 *       type: object
 *       properties:
 *         err:
 *           type: object
 *           description: Error.
 *           example: {}
 *         msg:
 *           type: string
 *           description: Validation error
 *           example: Validation error
 */
