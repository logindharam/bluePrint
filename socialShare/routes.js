const Router = require('express').Router;
const router = new Router();

const user = require('./model/user/router');
const embed = require('./model/embed/router');



router.route('/').get((req, res) => {
  res.json({ message: 'Welcome to localhost API!' });
});

router.use('/user', user);
router.use('/embed', embed);

module.exports = router;
