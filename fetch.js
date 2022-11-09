const fetch = require("node-fetch");
const fs = require("fs");

require("dotenv").config();

const POST_LIMIT = process.env.POST_LIMIT ?? 1;
const BLOG_NAME = process.env.BLOG_NAME;
const EMAIL = process.env.EMAIL;
const JSON_ENDPOINT = process.env.JSON_ENDPOINT;
const MASTODON_URL = process.env.MASTODON_URL;

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
  items.slice(0, POST_LIMIT).forEach((item) => {
    posts += `## [${item.title}](${item.url})

Published on: ${item.date_published}\n
tags: ${item.tags}\n
${item.content}\n
<hr />\n`;
  });

  const titles = items.slice(0, POST_LIMIT).map((item) => {
    return " " + item.title;
  });

  return {
    titles: titles,
    content: `Hello 👋! Thanks for subscribing.\n\n
Here are my latest articles:\n
${posts}
Thank you for reading my blog.\n
Don't hesitate to reach out via [email](mailto:${EMAIL}") or [Mastodon](${MASTODON_URL})!
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
