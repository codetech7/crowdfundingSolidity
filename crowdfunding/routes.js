const routes = require('next-routes')();

routes

.add("/campaigns/new-charity-project","/campaigns/new-charity-project")
.add("/campaigns/:address", "/campaigns/show");

module.exports = routes;