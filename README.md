# ena-website-api

Serves up JSON data describing the current contents of a dropbox folder and makes the files available at public URLs.

## Installation

- I run it on Ubuntu 20 on AWS EC2.
- [Setup dropbox](https://www.linuxbabe.com/ubuntu/install-dropbox-headless-ubuntu-server).
- Install [nvm](https://github.com/nvm-sh/nvm#installing-and-updating).
- Keep live with something like [PM2](https://pm2.keymetrics.io/).
- Manage server traffic with [NGINX](https://www.nginx.com/).
- Apply HTTPS with [certbot](https://certbot.eff.org/).

## Related projects

- [ctp-website-api](https://github.com/AmericanRedCross/ctp-website-api)
- [sims-website-api](https://github.com/AmericanRedCross/sims-website-api)