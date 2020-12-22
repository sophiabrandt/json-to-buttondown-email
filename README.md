# send-to-buttondown-email (WIP)

I use this script to send newsletter emails via [buttondown.email](https://buttondown.email).

The script uses JavaScript (and Node.js) to fetch blog posts from the [JSON API that I set up for my blog](https://www.rockyourcode.com/index.json).  
After some HTML formatting, I send off the data to the email service's [REST API](https://buttondown.email/features/api).

I use Github Actions to run the script periodically.

