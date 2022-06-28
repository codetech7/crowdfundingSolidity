const routes = require('next-routes')();

routes

.add("/campaigns/new-charity-project","/campaigns/new-charity-project")
.add("/campaigns/:address", "/campaigns/show")
.add("/campaigns/:address/requests", "/campaigns/requests/new");

module.exports = routes;