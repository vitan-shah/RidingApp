//responses
const responses = require("../utils/responses");
const cloudinary = require("cloudinary").v2;

//model
const Rides = require("../models").Rides;
const User = require("../models").User;
const Documents = require("../models").documents;

exports.getUser = async (req, res) => {
  try {
    if (!req.params.id) {
      return responses.badRequestResponse(res, { err: "Provide User ID." });
    }
    let user = await User.findById(req.params.id);
    if (!user) return responses.unauthorizedResponse(res, "Not valid User ID.");
    return responses.successResponse(res, user);
  } catch (error) {
    return responses.serverErrorResponse(res);
  }
};

exports.updateUser = async (req, res) => {
  try {
    if (!req.params.id) {
      return responses.badRequestResponse(res, { err: "Provide Params id" });
    }
    let user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return responses.unauthorizedResponse(res);
    }

    if (
      !req.body.name ||
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)
    ) {
      return responses.badRequestResponse(
        res,
        {},
        "Provide both name and email"
      );
    }
    user.name = req.body.name;
    user.email = req.body.email;
    user.save();

    return responses.successResponse(res, user, "User Updated Successfully..");
  } catch (error) {
    console.log(error);
    return responses.serverErrorResponse(res);
  }
};

exports.uploadDocs = async (req, res) => {
  try {
    if (!req.params.id) return responses.unauthorizedResponse(res);

    let user = await User.findOne({ _id: req.params.id });
    if (!user) return responses.unauthorizedResponse(res);

    try {
      const rc_img = Buffer.from(req.body.rc_img, "base64");
      let url = await new Promise(async (resolve, reject) => {
        await cloudinary.uploader
          .upload_stream({ format: "jpg" }, (err, res) => {
            if (err) {
              return responses.serverErrorResponse(
                res,
                "RC image upload error"
              );
            } else {
              resolve(res.url);
              // filteredBody.photo = result.url;
            }
          })
          .end(rc_img);
      });
      req.body.rc_img = url;
    } catch (error) {
      console.log(error);
      return responses.serverErrorResponse(res, "RC image upload error");
    }
    try {
      const dl_img = Buffer.from(req.body.dl_img, "base64");
      let url = await new Promise(async (resolve, reject) => {
        await cloudinary.uploader
          .upload_stream({ format: "jpg" }, (err, res) => {
            if (err) {
              return responses.serverErrorResponse(
                res,
                "dl image upload error"
              );
            } else {
              resolve(res.url);
              // filteredBody.photo = result.url;
            }
          })
          .end(dl_img);
      });
      req.body.dl_img = url;
    } catch (error) {
      console.log(error);
      return responses.serverErrorResponse(res, "DL image upload error");
    }

    let new_doc = await new Documents({
      ...req.body,
      user_id: req.params.id,
      is_document_verified: false,
    });
    new_doc.save();

    return responses.successfullyCreatedResponse(res, new_doc);
  } catch (error) {
    console.log(error);
    return responses.serverErrorResponse(res);
  }
};

exports.getDocs = async (req, res) => {
  try {
    let docs = await Documents.find({ is_document_verified: false }).populate(
      "user_id"
    );
    return responses.successResponse(res, docs);
  } catch (error) {
    console.log(error);
    return responses.serverErrorResponse(res);
  }
};

exports.verifyDocs = async (req, res) => {
  try {
    await Documents.findByIdAndUpdate(req.params.id, {
      is_document_verified: true,
    });
    return responses.successResponse(res, {});
  } catch (error) {
    console.log(error);
    return responses.serverErrorResponse(res);
  }
};

exports.deleteDocs = async (req, res) => {
  try {
    await Documents.findByIdAndDelete(req.params.id);
    return responses.successResponse(res, {});
  } catch (error) {
    console.log(error);
    return responses.serverErrorResponse(res);
  }
};
