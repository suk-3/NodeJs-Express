const express = require('express');

const router = express.Router();

const base = require('./base/controller');

router.get('/', base.functionality);

const health = require('./health/controller');

router.get('/health', health.functionality);

module.exports = router;
