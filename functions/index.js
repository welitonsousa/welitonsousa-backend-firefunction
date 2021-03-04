const functions = require("firebase-functions");
const admin = require("firebase-admin");
const firebaseKey = require("./firebase-key.json");
const express = require("express");
const app = express();
const profile = require("./services/profile");

const {getAllPosts, getPost, postNewPost} = require("./services/posts");

admin.initializeApp(admin.credential.cert(firebaseKey));

// routes of profile
app.get("/profile", profile);

// routes activities of posts
app.get("/activities/posts", getAllPosts);
app.get("/activities/post", getPost);
app.post("/activities/post", postNewPost);

exports.api = functions.https.onRequest(app);
