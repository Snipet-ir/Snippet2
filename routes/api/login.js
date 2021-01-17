const express = require('express');
const router = express();
const controller = require('../../controllers/api/login');
const validator = require('../../services/validator');

router.post('/login', validator.login, controller.login);
router.post('/signup', validator.signup, controller.signup);

module.exports = router;
