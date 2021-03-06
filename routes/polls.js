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
const helpers = require('../routes/helpers.js')
const cookieSession = require('cookie-session');
const cuid    = require('cuid');

app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));

// ------------------- GET ----------------------- //
module.exports = (db) => {
  // Displays details of polls table in the browser
  router.get("/polls", (req, res) => {
    let query = `SELECT * FROM polls`;
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

  // Displays details of questions table in the browser
  router.get("/questions", (req, res) => {
    let query = `SELECT * FROM questions`;
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

  // Displays details of responses table in the browser
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

  // Get a summary of a user's polls
  router.get("/polls/user", (req, res) => {
    const userID = req.session.userID;
    if (!userID) {
      res.send(null);
      return;
    }

    database.getPollsById(db, userID)
      .then(polls => {
        res.send(polls);
      })
      .catch(e => res.send(e));
  })

  // ------------------- POST ----------------------- //

  // Creates a new poll
  router.post('/new_poll', (req, res) => {
    const newPoll = req.body;
    newPoll.adminUrl = cuid();
    newPoll.guestUrl = cuid();
    const userID = req.session.userID;
    helpers.emailNewPoll(db, userID, newPoll.adminUrl, newPoll.guestUrl);
    database.addNewPoll(db, newPoll, userID)
    .then(pollData => {
      database.addNewQuestions(db, newPoll, pollData)
      .then(questionData => {
        database.addNewResponses(db, newPoll, questionData)
        .then((data) => {
          res.send({...data, ...pollData, ...questionData})
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message })
        })
      })
    })

  });

  // Delets a given poll entry, and cascades to delete questions and responses
  router.post("/delete", (req, res) => {
    const pollID = req.body.pollID;
    database.deletePollById(db, pollID)
    .then(() => {
      res.send('done');
    })
  })

  return router;
};

