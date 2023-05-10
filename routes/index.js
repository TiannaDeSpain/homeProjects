const express = require('express');
const router = express.Router();
const passport = require('passport');


router.use('/homeImprove', require('./homeImprove'));
router.use('/paint', require('./paint'));
router.use('/', require('./swagger'));

// eslint-disable-next-line no-unused-vars
router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) {return next(err);}
        res.redirect('/');
    });
});

module.exports = router;
