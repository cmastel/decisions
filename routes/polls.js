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
const cuid    = require('cuid');

app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));

module.exports = (db) => {
  router.get("/polls", (req, res) => {
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

  router.get("/questions", (req, res) => {
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

  router.get("/responses", (req, res) => {
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
    newPoll.adminUrl = cuid();
    newPoll.guestUrl = cuid();
    const userID = req.session.userID;
    database.addNewPoll(db, newPoll, userID)
    .then(pollData => {
      database.addNewQuestions(db, newPoll, pollData)
      .then(questionData => {
        database.addNewResponses(db, newPoll, questionData)
        .then(() => {
          console.log('polldata', pollData)
          res.send(pollData)
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message })
        })
      })
    })


  });




  return router;
};

