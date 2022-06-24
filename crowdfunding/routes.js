const routes = module.exports = require('next-routes')();

routes.add("/components/:slug", "show.js")