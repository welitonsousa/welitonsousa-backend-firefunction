const admin = require("firebase-admin");

const error = (res, statusError, response) => {
  return res.status(statusError).json(response);
};

const getUserProfile = async (req, res) => {
  try {
    const data = await admin.firestore().collection("profile")
        .doc("data").get();
    if (data.data() !== undefined) {
      res.send({success: true, data: data.data().data});
    } else {
      res.send({success: true, data: []});
    }
  } catch (e) {
    error(res, 501, {success: false, message: "Algo deu errado"});
  }
};

module.exports = getUserProfile;
