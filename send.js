const fetch = require("node-fetch");
const fs = require("fs").promises;
const path = require("path");

require("dotenv").config();

const BLOG_NAME = process.env.BLOG_NAME;
const BUTTONDOWN_EMAIL_TOKEN = process.env.BUTTONDOWN_EMAIL_TOKEN;

async function postDraft(draft) {
  try {
    const response = await fetch("https://api.buttondown.email/v1/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${BUTTONDOWN_EMAIL_TOKEN}`,
      },
      body: JSON.stringify(draft),
      status: "draft",
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  } catch (err) {
    return Promise.reject(err);
  }
}

(async () => {
  // read posts from file and convert back to JSON
  let postsRaw = "{}";
  try {
    postsRaw = await fs.readFile(path.join(__dirname + "/posts.json"));
  } catch (err) {
    console.log("Failed to read blog posts from file: ", err);
  }

  const blogPosts = JSON.parse(postsRaw);

  // create draft and send it
  const draft = {
    subject: `${BLOG_NAME}:${blogPosts.titles}`,
    body: blogPosts.content,
  };
  try {
    const response = await postDraft(draft);
  } catch (err) {
    console.log("Failed to post draft", err);
  }
})();
