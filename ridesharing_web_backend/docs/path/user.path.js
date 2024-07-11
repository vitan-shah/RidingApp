module.exports = {
  "/api/user/": {
    get: {
      tags: ["User"],
      summary: "checking route",
      description: "checking route",
      parameters: [
        {
          name: "token",
          in: "query",
          schema: {
            type: "string",
            required: true,
            description: "Authentication token",
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
