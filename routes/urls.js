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
    if (!userID) {
      console.log("Not a user!");
      res.send(null);
      return;
    }
    const admin_url = req.params.admin_url;
    database.getPollDetailsDB(db, admin_url)
      .then(pollDetails => {
        res.render('index', pollDetails)
      })
      .catch(e => res.send(e));
  });

  router.get("/guest/:guest_url", (req, res) => {
    const guest_url = req.params.guest_url;
    database.getGuestPoll(db, guest_url)
      .then(pollDetails => {
        const templateVars = {
          title: pollDetails[0].title,
          question: pollDetails[0].question,
          choice1: pollDetails[0].choice,
          choice1_id: pollDetails[0][response.id],
          choice2: pollDetails[1].choice,
          choice3: pollDetails[2].choice,
          choice4: pollDetails[3].choice,
          pollID: pollDetails[0].id
        }
        console.log('templateVars', templateVars)
        res.send('guest', templateVars);
      })
      .catch(e => res.send(e));
    });

  router.post("/guest/:guest_url", (req, res) => {
    console.log('req', req.body)
    req.session.voteID = req.body.poll_id;
    const score_1 = req.body.response_1
    const score_2 = req.body.response_2
    const score_3 = req.body.response_3
    const score_4 = req.body.response_4
    console.log('currentScores', score_1, score_2, score_3, score_4);
    database.updateBorda(db, [req.body.poll_id, score_1, score_2, score_3, score_4])
    .then(res => {
      console.log('res', res);
    })
    res.send('done')

  })
  return router;
};

