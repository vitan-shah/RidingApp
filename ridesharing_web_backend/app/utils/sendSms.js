const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

module.exports = async (phone, message) => {
  let res = await client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NO,
    to: "+91" + phone,
  });
  return res;
};
