const auth = require("../auth.json");
const admin = require("firebase-admin");

const error = (res, statusError, response) => {
  return res.status(statusError).json(response);
};

const dateToYMD = (date) => {
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();
  return (d <= 9 ? "0" + d : d)+ "/" + (m<=9 ? "0" + m : m) + "/" + "" + y;
  // return "" + y + "/" + (m<=9 ? "0" + m : m) + "/" + (d <= 9 ? "0" + d : d);
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
  const id = req.params.id;
  try {
    const data = await admin.firestore().collection("posts").doc(id).get();

    res.send({success: true, data: data.data() ? data.data() : []});
  } catch (e) {
    error(res, 501, {success: false, message: "Algo deu errado"});
  }
};

const postNewPost = async (req, res) => {
  const {title, smallDescription, fullDescription, repo, image, imageExample} =
   req.body;
  const token = `${req.headers.token}`;

  try {
    if (title && smallDescription && fullDescription &&
      image !== undefined && auth.token === token) {
      await admin.firestore().collection("posts").add({
        title: title,
        smallDescription: smallDescription,
        fullDescription: fullDescription,
        image: image,
        repo: repo.title && repo.link ? repo : {},
        imageExample: imageExample,
        date: `${dateToYMD(new Date())}`,
      });
      res.send({success: true, message: "Post adicionado"});
    } else {
      error(res, 401, {success: false, message: "Não autorizadoo"});
    }
  } catch (e) {
    console.log(e);
    error(res, 501, {success: false, message: "Algo deu errado"});
  }
};

module.exports = {postNewPost, getAllPosts, getPost};
