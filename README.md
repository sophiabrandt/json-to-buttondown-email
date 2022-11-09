[![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)
[![MIT License](https://img.shields.io/github/license/sophiabrandt/json-to-buttondown-email.svg)](https://github.com/sophiabrandt/json-to-buttondown-email/blob/master/LICENSE)

# json-to-buttondown-email

**json-to-buttondown-email** is a Node.js script to send newsletter drafts from a JSON API to [buttondown.email][buttondown].

The script fetches blog posts from a [JSON endpoint](https://www.rockyourcode.com/index.json).  
After some HTML formatting, the blog posts are sent off to the email service's [REST API](https://buttondown.email/features/api).

Github Actions ensure that the script runs periodically.

I've created this script for my personal use, but feel free to fork it and make it your own.

## Requirements

For local development:

- Node.js
- [Buttondown.email account (free tier or better)][buttondown]
- JSON endpoint for polling your blog

## Usage

The script creates a new draft for buttondown.email.  
Go to [https://buttondown.email/emails/drafts](https://buttondown.email/emails/drafts) to edit your draft and send it to your newsletter subscribers.

The script **does not** send emails automatically. You can change the [Buttondown API endpoint](https://api.buttondown.email/v1/schema) if you like a different behavior.

1. Fork the repository and clone it to your computer.

2. [Create encrypted secrets for your repository](https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets):

- POST_LIMIT (number of posts to fetch from your blog)
- BLOG_NAME
- BUTTONDOWN_EMAIL_TOKEN (this is the access token from buttondown.email)
- EMAIL
- JSON_ENDPOINT
- MASTODON_URL

_Note:_ We want to keep the buttondown access token secret.

3. The script runs every Monday at 19:05 UTC. You can specify a different interval. Adjust [.github/workflows/send.yml](.github/workflows/send.yml):

```yaml
on:
  push:
  workflow_dispatch:
  schedule:
    # Change the line below, see https://crontab.guru/ for help
    - cron: "5 19 * * 1"
```

4. The script creates a newsletter from the latest blog post. The value is hard-coded in [fetch.js](fetch.js) as the `blogPostLimit`.

```js
/*
Change setting below for a different limit.
The maximum depends on your API endpoint, of course.
*/
const blogPostLimit = 1;
```

## Roadmap

json-to-buttondown-email is a script that I created to send newsletter drafts when I release a new blog post.

I don't plan any new features.

If someone has a better idea for a free rss/json-to-rest-api workflow, I'm all ears.

## Contributing

To contribute to json-to-buttondown-email, follow these steps:

1. Fork this repository.
2. Create a branch: `git checkout -b <branch_name>`.
3. Make your changes and commit them: `git commit -m '<commit_message>'`
4. Push to the original branch: `git push origin <project_name>/<location>`
5. Create the pull request.

Alternatively see the GitHub documentation on [creating a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## License

[MIT](LICENSE) &copy; 2020, Sophia Brandt.

[buttondown]: https://buttondown.email
