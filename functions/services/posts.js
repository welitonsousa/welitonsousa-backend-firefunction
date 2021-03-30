/* eslint-disable max-len */
const auth = require("../auth.json");
const admin = require("firebase-admin");
const formatText = require("../helper/formatText");
const {v4: uuidv4} = require("uuid");

const error = (res, statusError, response) => {
  return res.status(statusError).json(response);
};

const dateToYMD = (date) => {
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();
  return (d <= 9 ? "0" + d : d) + "/" + (m <= 9 ? "0" + m : m) + "/" + "" + y;
};

const getAllPosts = async (req, res) => {
  try {
    const data = await admin
        .firestore()
        .collection("posts")
        .orderBy("date")
        .get();
    const response = data.docs.map((doc) => {
      const res = {id: doc.id, data: doc.data()};
      return res;
    });

    res.send({success: true, data: response.reverse()});
  } catch (e) {
    error(res, 501, {success: false, message: "Algo deu errado"});
  }
};

const getPostsSearch = async (req, res) => {
  try {
    const {search = ""} = req.query;
    const data = await admin
        .firestore()
        .collection("posts")
        .orderBy("date")
        .get();
    const response = data.docs.map((doc) => {
      const res = {id: doc.id, data: doc.data()};
      return res;
    });

    const results = response.reverse();

    const finalResult = results.filter((t) => {
      return (
        t.data.title.toLowerCase().includes(formatText(search.toLowerCase())) ||
        t.data.smallDescription.toLowerCase().includes(formatText(search.toLowerCase()))
      );
    });

    res.send({success: true, data: finalResult});
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
  const {
    title,
    smallDescription,
    fullDescription,
    repo,
    image,
    imageExample,
  } = req.body;
  const token = `${req.headers.token}`;

  try {
    if (
      title &&
      smallDescription &&
      fullDescription &&
      image !== undefined &&
      auth.token === token
    ) {
      const uuid = (title + "-" + uuidv4()).replace(/ /g, "-");

      await admin
          .firestore()
          .collection("posts")
          .doc(uuid)
          .set({
            title: title,
            smallDescription: smallDescription,
            fullDescription: fullDescription,
            image: image,
            repo: repo.title && repo.link ? repo : {},
            imageExample: imageExample,
            dateShow: `${dateToYMD(new Date())}`,
            date: new Date(),
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

module.exports = {postNewPost, getAllPosts, getPost, getPostsSearch};
