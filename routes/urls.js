/*
 * All routes for URLs are defined here
 * Since this file is loaded in server.js into api/urls,
 *   these routes are mounted onto /urls
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const app     = express();
const router  = express.Router();
const database = require('../db/database.js');
const helpers = require('../routes/helpers.js')
const cookieSession = require('cookie-session');
const convertNumber = require("./helpers.js");

app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));

module.exports = (db) => {
  // ------------------ GET -------------------------//

  // Shows the admin_url page for a given poll
  router.get("/admin/:admin_url", (req, res) => {
    const userID = req.session.userID;
    if (!userID) {
      console.log("Not a user!");
      res.send(null);
      return;
    }
    const admin_url = req.params.admin_url;
    database.getAdminPoll(db, admin_url)
      .then(pollDetails => {
        const templateVars = {
          title: pollDetails[0].title,
          question: pollDetails[0].question,
          choice1: pollDetails[0].choice,
          choice1_id: pollDetails[0].id,
          score1: pollDetails[0].score,
          choice2: pollDetails[1].choice,
          choice2_id: pollDetails[1].id,
          score2: pollDetails[1].score,
          choice3: pollDetails[2].choice,
          choice3_id: pollDetails[2].id,
          score3: pollDetails[2].score,
          choice4: pollDetails[3].choice,
          choice4_id: pollDetails[3].id,
          score4: pollDetails[3].score,
          question_id: pollDetails[0].question_id,
          admin_url: pollDetails[0].admin_url,
          guest_url: pollDetails[0].guest_url
        }
        res.render('admin', templateVars)
      })
      .catch(e => res.send(e));
  });

  // Shows the guest_url page for a given poll
  router.get("/guest/:guest_url", (req, res) => {
    const guest_url = req.params.guest_url;
    database.getGuestPoll(db, guest_url)
      .then(pollDetails => {
        const templateVars = {
          title: pollDetails[0].title,
          question: pollDetails[0].question,
          choice1: pollDetails[0].choice,
          choice1_id: pollDetails[0].id,
          choice2: pollDetails[1].choice,
          choice2_id: pollDetails[1].id,
          choice3: pollDetails[2].choice,
          choice3_id: pollDetails[2].id,
          choice4: pollDetails[3].choice,
          choice4_id: pollDetails[3].id,
          question_id: pollDetails[0].question_id
        }
        res.render('guest', templateVars);
      })
      .catch(e => res.send(e));
    });

  // ------------------ POST -------------------------//

  // Update the Borda Scores based on a guest submission
  router.post("/guest/:guest_url", (req, res) => {
    if (req.session.voteID === req.body.question_id) {
      res.send({message: 'You voted already!'});
    } else {
      req.session.voteID = req.body.question_id;


    const score_1 = convertNumber.switchStatement(req.body.response_1);
    const score_2 = convertNumber.switchStatement(req.body.response_2);
    const score_3 = convertNumber.switchStatement(req.body.response_3);
    const score_4 = convertNumber.switchStatement(req.body.response_4);
    const id_1 = req.body.id1;
    const id_2 = req.body.id2;
    const id_3 = req.body.id3;
    const id_4 = req.body.id4;
    database.updateBorda(db, [score_1, id_1]);
    database.updateBorda(db, [score_2, id_2]);
    database.updateBorda(db, [score_3, id_3]);
    database.updateBorda(db, [score_4, id_4]);

    const questionID = req.body.question_id;
    helpers.emailNewSubmission(db, questionID);

    res.send({message: 'done'});
    }

  })
  return router;
};

