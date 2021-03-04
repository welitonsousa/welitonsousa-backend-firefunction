const auth = require("../auth.json");
const admin = require("firebase-admin");

const error = (res, statusError, response) => {
  return res.status(statusError).json(response);
};

const getAllPosts = async (req, res) => {
  try {
    const data = await admin.firestore().collection("posts").get();
    const response = data.docs.map( (doc) => {
      return {id: doc.id, data: doc.data()};
    });

    res.send({success: true, data: response});
  } catch (e) {
    error(res, 501, {success: false, message: "Algo deu errado"});
  }
};

const getPost = async (req, res) => {
  try {
    const id = req.body.id;
    const data = await admin.firestore().collection("posts").doc(id).get();
    console.log(data.data());

    res.send({success: true, data: data.data() ? data.data() : []});
  } catch (e) {
    error(res, 501, {success: false, message: "Algo deu errado"});
  }
};

const postNewPost = async (req, res) => {
  const {title, smallDescription, fullDescription, link, image} = req.body;
  const token = `${req.headers.token}`;

  try {
    if (title && smallDescription && fullDescription &&
        link !== undefined && image !== undefined && auth.token === token) {
      await admin.firestore().collection("posts").add({
        title: title,
        smallDescription: smallDescription,
        fullDescription: fullDescription,
        image: image,
        link: link,
      });
      res.send({success: true, message: "Post adicionado"});
    } else {
      error(res, 401, {success: false, message: "Não autorizadoo"});
    }
  } catch (e) {
    error(res, 501, {success: false, message: "Algo deu errado"});
  }
};

module.exports = {postNewPost, getAllPosts, getPost};
