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
const cuid    = require('cuid');

app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));

module.exports = (db) => {
  router.get("/:adminUrl", (req, res) => {
  console.log('req.params', req.params);
    // database.getUrlDetails(db, req.pa)

  });


  return router;
};

