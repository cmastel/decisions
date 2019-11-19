/*
 * All routes for URLs are defined here
 * Since this file is loaded in server.js into api/urls,
 *   these routes are mounted onto /urls
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const app     = express();
const router  = express.Router();
const database = require('../db/database.js')
const cookieSession = require('cookie-session');

app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));

module.exports = (db) => {
  router.get("/admin/:admin_url", (req, res) => {
    const userID = req.session.userID;
    console.log(req.session.userID)
    if (!userID) {
      console.log("Not a user!");
      res.send(null);
      return;
    }
    const admin_url = req.params.admin_url;
    // res.send({ url: admin_url })
    database.getPollDetailsDB(db, admin_url)
      .then(pollDetails => {
        //res.send( pollDetails );
        res.render('index', pollDetails)
      })
      .catch(e => res.send(e));
  });

  router.get("/guest/:guest_url", (req, res) => {
    const guest_url = req.params.guest_url;
    console.log('guestURL', guest_url)
    database.getGuestPoll(db, guest_url)
      .then(pollDetails => {
        res.send( pollDetails );
      })
      .catch(e => res.send(e));
    });


  return router;
};

