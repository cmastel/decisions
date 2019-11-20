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
const cookieSession = require('cookie-session');
const convertNumber = require("./helpers.js");

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
        console.log(pollDetails)
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
        console.log(templateVars);
        res.render('guest', templateVars);
      })
      .catch(e => res.send(e));
    });

  router.post("/guest/:guest_url", (req, res) => {
    console.log('req', req.body);
    // if (req.session.voteID === req.body.question_id) {
    //   console.log("YES TO  COOKIES")
    //   res.send({message: 'You voted already!'});
    // } else {
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

    res.send({message: 'done'});
    // }

  })
  return router;
};

