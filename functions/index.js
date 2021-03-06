const functions = require("firebase-functions");
const admin = require("firebase-admin");
const firebaseKey = require("./firebase-key.json");
const express = require("express");
const profile = require("./services/profile");
const {getPostsSearch, getPost, postNewPost} = require("./services/posts");
const cors = require("cors");
const app = express();

app.use(cors());
admin.initializeApp(admin.credential.cert(firebaseKey));
// routes of profile
app.get("/profile", profile);

// routes activities of posts
app.get("/activities/posts", getPostsSearch);
app.get("/activities/post:id", getPost);
app.post("/activities/post", postNewPost);

exports.api = functions.https.onRequest(app);
