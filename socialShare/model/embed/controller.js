const Controller = require('../../lib/controller');
const embedFacade = require('./facade');

class EmbedController extends Controller {}

module.exports = new EmbedController(embedFacade);
