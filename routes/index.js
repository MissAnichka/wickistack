let express = require('express');
let router = express.Router();
let wiki = require('./wiki');
let user = require('./user');
router.use('/wiki', wiki);
router.use('/user', user);

module.exports = router;