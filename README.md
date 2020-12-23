[![Project Status: WIP – Initial development is in progress, but there has not yet been a stable, usable release suitable for the public.](https://www.repostatus.org/badges/latest/wip.svg)](https://www.repostatus.org/#wip)
[![MIT License](https://img.shields.io/github/license/sophiabrandt/json-to-buttondown-email.svg)](https://github.com/sophiabrandt/json-to-buttondown-email/blob/master/LICENSE)

# json-to-buttondown-email (WIP)

**json-to-buttondown-email** is a Node.js script to send newsletter emails via [buttondown.email][buttondown].

The script fetches blog posts from a [JSON API](https://www.rockyourcode.com/index.json).  
After some HTML formatting, data is sent off to the email service's [REST API](https://buttondown.email/features/api).

Github Actions ensure that the script is run periodically.

I've created this script for my personal use, but feel free to fork it and make it your own.

## Requirements

- Node.js
- [Buttondown.email account (free tier or better)][buttondown]
- JSON Endpoint for polling your blog

## Usage

The script creates a new draft for buttondown.email.  
Go to [https://buttondown.email/emails/drafts](https://buttondown.email/emails/drafts) to edit your draft and send it to your newsletter subscribers.

The script **does not** send emails automatically because I prefer to have a final quality control pass.

1. Fork the repository and clone it to your computer if you want to modify it.

2. [Create encrypted secrets for your repository](https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets):

- BLOG_NAME
- BUTTONDOWN_EMAIL_TOKEN (this is the access token from buttondown.email)
- EMAIL
- JSON_ENDPOINT
- TWITTER_HANDLE

_Note:_ While it's only necessary to encrypt your buttondown access token, it's easier to store the other variables as secrets as well.

3. The script runs every day at 19:05 UTC. You can specify a different interval. Modify [.github/workflows/send.yml](./github/workflows/send.yml):

```yaml
on:
  push:
  workflow_dispatch:
  schedule:
  # Modify the line below, see https://crontab.guru/ for help
    - cron:  '5 19 * * *'
```

4. Currently, the script creates a newsletter from the latest blog post. The value is hard-coded under [index.js](index.js) as the `blogPostLimit`.

```js
/*
Change setting below for a different limit.
The maximum depends on your API endpoint, of course.
*/
const blogPostLimit = 1
```

## Roadmap

json-to-buttondown-email is a rough script that I created to programmatically send emails whenI release a new blog post.

I don't plan any new features.

If someone has a better idea for a free rss-to-rest-api workflow, I'm all ears.

## Contributing

To contribute to json-to-buttondown-email, follow these steps:

1. Fork this repository.
2. Create a branch: `git checkout -b <branch_name>`.
3. Make your changes and commit them: `git commit -m '<commit_message>'`
4. Push to the original branch: `git push origin <project_name>/<location>`
5. Create the pull request.

Alternatively see the GitHub documentation on [creating a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## License

[MIT](License) &copy; 2020, Sophia Brandt.

[buttondown]: https://buttondown.email
