import express from 'express';
let router = express.Router();
import withAuth from '../utils/auth.js';

router.get('/', withAuth, (req, res) => {
  res.render('home', { user: req.session.user });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

export {router as default};
