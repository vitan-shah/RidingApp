module.exports = {
  "api/auth/signin": {
    post: {
      tags: ["Auth"],
      summary: "User Signin Route",
      description: "User Signin Route",
      parameters: [
        {
          in: "body",
          schema: {
            $ref: "#/components/schemas/signin_schema",
          },
        },
      ],
      responses: {
        200: {
          description: "get user data successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/success_response",
              },
            },
          },
          404: {
            description: "Not found",
          },
        },
      },
    },
  },
};
