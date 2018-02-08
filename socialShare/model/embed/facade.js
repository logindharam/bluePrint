const Facade = require('../../lib/facade');
const embedSchema = require('./schema');

class EmbedFacade extends Facade {}

module.exports = new EmbedFacade('Embed', embedSchema);
