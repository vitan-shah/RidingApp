module.exports = {
  sigin_schema: {
    type: "object",
    required: ["email,password"],
    properties: {
      email: {
        type: "String",
        example: "abc@gmail.com",
      },
      password: {
        type: "String",
        example: "123456",
      },
    },
  },
};
