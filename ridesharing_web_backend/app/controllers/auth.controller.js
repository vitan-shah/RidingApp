const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
//responses
const responses = require("../utils/responses");

//model
const User = require("../models").User;

//sent sms
const sms = require("../utils/sendSms.js");

//validation
const validate_user = require("../validations/register.validation");

exports.register = async (req, res) => {
  try {
    // console.log(req.body);
    let validate = await validate_user(req.body);
    // console.log(validate.error);
    if (validate.error) {
      // console.log("validate called.");
      return responses.badRequestResponse(
        res,
        validate.error.details[0].message
      );
    }

    let user = await User.findOne({
      $or: [
        {
          mobile_no: req.body.mobile_no,
        },
        {
          email: req.body.email,
        },
      ],
    });

    if (user) {
      // console.log("user called.");
      return responses.badRequestResponse(
        res,
        {},
        "Email Or User Name Already Registered..."
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(req.body.password, salt);

    req.body.password = hash_password;

    //generate OTP
    let otp_val = Math.floor(1000 + Math.random() * 9000);
    req.body.token = await jwt.sign({ otp: otp_val }, process.env.SECRET, {
      expiresIn: "30m",
    });

    let new_user = await User.create(req.body);
    try {
      await sms(new_user.mobile_no, `OTP : ${otp_val}`);
    } catch (error) {
      return responses.serverErrorResponse(res, "Error While Sending Otp..");
    }

    let { password, token, ...user_data } = new_user._doc;
    return responses.successfullyCreatedResponse(
      res,
      user_data,
      "User Created Successfully..."
    );
  } catch (error) {
    console.log(error);
    responses.serverErrorResponse(res, "Server Error...");
  }
};

exports.signin = async (req, res) => {
  try {
    let { mobile_no, password } = req.body;

    if (!mobile_no || !password) {
      return responses.badRequestResponse(res, "please, enter all fields.");
    }

    let user = await User.findOne({ mobile_no: mobile_no });

    if (!user) {
      return responses.badRequestResponse(res, "Invalid Credentials.");
    }

    let isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return responses.badRequestResponse(res, {}, "Invalid Credentials.");
    }
    if (!user.is_verified || user.is_deleted) {
      return responses.badRequestResponse(res, "User is not verified..");
    }

    let token = await jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: "1d",
    });

    return responses.successResponse(
      res,
      { user, token },
      "User Log in Successful."
    );
  } catch (err) {
    return responses.serverErrorResponse(res, "Server Error.");
  }
};

exports.verify = async (req, res) => {
  try {
    let user = await User.findOne({ mobile_no: req.params.mobile_no });
    if (!user) {
      return responses.unauthorizedResponse(res, "Invalid User.");
    }
    let decoded = await jwt.verify(user.token, process.env.SECRET);
    console.log(decoded);
    if (!decoded) {
      return responses.badRequestResponse(res, { err: "OTP expired!" });
    }
    if (decoded.otp !== req.body.otp) {
      return responses.badRequestResponse(res, { err: "Invalid OTP" });
    }
    user.is_verified = true;
    await user.save();
    return responses.successResponse(res, {}, "user verfied sucessfully.");
  } catch (error) {
    return responses.serverErrorResponse(res);
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const Credentials = {
      name: "admin",
      password: "admin",
    };
    if (!req.body.name || !req.body.password) {
      return responses.badRequestResponse(res, {}, "Provide All Credentials..");
    }
    if (
      req.body.name !== Credentials.name ||
      req.body.password !== Credentials.password
    ) {
      return responses.unauthorizedResponse(res);
    }
    return responses.successResponse(res, { ...Credentials, token: "1234" });
  } catch (error) {
    return responses.serverErrorResponse(res);
  }
};

