const request = require("supertest");
const app = require("../server");

const signin_cases = [
  ["8154990216", "1234567890", 200],
  ["8154", "1234567890", 400],
  ["8154990216", "12345", 400],
];

const register_cases = [
  [
    {
      name: "darshan modi",
      password: "1234567890",
      email: "darshan@gmail.com",
    },
    400,
  ],
  [
    {
      name: "darshan modi",
      password: "1234567890",
      email: "darshan@gmail.com",
      mobile_no: "8154990216",
      gender: "male",
    },
    400,
  ],
  [
    {
      name: null,
      password: "1234567890",
      email: "darshan@gmail.com",
      mobile_no: "8154990216",
      gender: "male",
    },
    400,
  ],
  [
    {
      name: "jyot maheshwari",
      password: "1234567890",
      email: "jyot@gmail.com",
      mobile_no: 6355657697,
      gender: "female",
    },
    201,
  ],
];
describe("POST /api/auth/signin", () => {
  test.each(signin_cases)(
    `test case %j %j `,
    async (mobile_no, pass, output) => {
      await request(app)
        .post("/api/auth/signin")
        .send({ mobile_no: mobile_no, password: pass })
        .expect(output);
    }
  );
});

describe("POST /api/auth/register", () => {
  test.each(register_cases)(`test case %j`, async (body, output) => {
    await request(app).post("/api/auth/register").send(body).expect(output);
  });
});
