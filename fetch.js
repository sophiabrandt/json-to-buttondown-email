const fetch = require("node-fetch");
const fs = require("fs");

require("dotenv").config();

const blogPostLimit = 1;

const BLOG_NAME = process.env.BLOG_NAME;
const EMAIL = process.env.EMAIL;
const JSON_ENDPOINT = process.env.JSON_ENDPOINT;
const TWITTER_HANDLE = process.env.TWITTER_HANDLE;

async function fetchJSONItems(jsonEndpoint) {
  try {
    const response = await fetch(jsonEndpoint);
    const data = await response.json();
    if (response.ok) {
      return data.items;
    } else {
      return Promise.reject(data);
    }
  } catch (err) {
    return Promise.reject(err);
  }
}

async function getPosts() {
  const items = await fetchJSONItems(JSON_ENDPOINT);
  let posts = "";
  items.slice(0, blogPostLimit).forEach((item) => {
    posts += `
  <h2><a href=${item.url}>${item.title}</a></h2>
  <p>Published on: ${item.date_published}</p>
  <p>tags: ${item.tags}</p>
  ${item.content_html}
  <hr />`;
  });

  const titles = items.slice(0, blogPostLimit).map((item) => {
    return " " + item.title;
  });

  return {
    titles: titles,
    content: `
  <p>Hello 👋! Thanks for subscribing.</p>
  ${posts}
  <p>Thank you for reading my blog posts.</p>
  <p>Don't hesitate to reach out via <a href="mailto:${EMAIL}">email</a> or <a href="https://twitter.com/${TWITTER_HANDLE}">Twitter</a>!
  `,
  };
}

(async () => {
  let blogPosts = {};
  try {
    blogPosts = await getPosts();
  } catch (err) {
    console.log("Failed to load blog posts: ", err);
  }

  // write to file so that we can diff it in Github actions
  blogPostsString = JSON.stringify(blogPosts);
  fs.writeFile("posts.json", blogPostsString, function (err) {
    if (err) return console.log(err);
    console.log(`${blogPostsString} > posts.json`);
  });
})();
