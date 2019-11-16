/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const database = require('../db/database.js')


module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      })
  })

  router.post('/', (req, res) => {
    const user = req.body;

    if (database.getUserByEmail(db, user.email)) {
      console.log('users already exists');
      // redirect to Login page
    } else {
      user.password = bcrypt.hashSync(user.password, 12);
      database.addUser(db, user)
      .then(user => {
        if (!user) {
          res.send({error: "error"});
          return;
        }
        req.session.userID = user.id;
        res.send("🤗");
      })
      .catch(e => res.send(e));
    }

  });

  return router;
};
