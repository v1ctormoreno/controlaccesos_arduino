const router = require('express').Router();
const pool = require('../database');

router.get('/', (req, res) => {
    res.send("Working on the API");
})

module.exports = router;