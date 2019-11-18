/*
 * All routes for Polls are defined here
 * Since this file is loaded in server.js into api/polls,
 *   these routes are mounted onto /polls
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
  router.get("/", (req, res) => {
    let query = `SELECT * FROM polls`;
    console.log(query);
    db.query(query)
      .then(data => {
        const polls = data.rows;
        res.json({ polls });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/", (req, res) => {
    let query = `SELECT * FROM questions`;
    console.log(query);
    db.query(query)
      .then(data => {
        const questions = data.rows;
        res.json({ questions });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/", (req, res) => {
    db.query(`SELECT * FROM responses;`)
      .then(data => {
        const responses = data.rows;
        res.json({ responses });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      })
  })

  router.post('/new_poll', (req, res) => {
    const newPoll = req.body;
    const userID = req.session.userID;
    database.addNewPoll(db, newPoll, userID)
    .then(data => {
      console.log('return from polls insert', data)
      database.addNewQuestions(db, newPoll, data)
    })
    .then(data2 => {
      console.log('return from questions insert', data2)
      database.addNewResponses(db, newPoll, data2)
    })

  });




  return router;
};

