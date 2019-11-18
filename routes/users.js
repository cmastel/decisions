/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
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

  router.get("/me", (req, res) => {
    const userID = req.session.userID;
    if (!userID) {
      res.send({ message: "not logged in" });
      return;
    }

    database.getUserById(db, userID)
      .then(user => {
        if (!userID) {
          res.send({ error: "no user with that id" });
          return;
        }
        res.send({ user: { first_name: user.first_name, last_name: user.last_name } });
      })
      .catch(e => res.send(e));
  })


  // sign-up for a new user
  router.post('/', (req, res) => {
    const user = req.body;
    let exists;

    database.getUserByEmail(db, user.email)
      .then(data => {
        if (data.length !== 0) {
          // redirect to Login page
          console.log('User exists, not adding to db')
        } else {
          user.password = bcrypt.hashSync(user.password, 12);
          database.addUser(db, user)
            .then(user => {
              if (!user) {
                res.send({ error: "error" });
                return;
              }
              req.session.userID = user[0].id;
              res.send(user);
            })
            .catch(e => res.send(e));
        }
      })
      .catch(e => res.send(e));
  });

  //User login
  const login = function (email, password) {
    return database.getUserByEmail(db, email)
      .then(user => {
        if (bcrypt.compareSync(password, user[0].password)) {
          return user;
        }
        return null;
      });
  }

  router.post('/login', (req, res) => {
    const { email, password } = req.body;
    login(email, password)
      .then(user => {
        if (!user) {
          res.send({ error: "error" });
          return;
        }
        req.session.userID = user[0].id;
        res.send(user);
      })
      .catch(e => res.send(e));
  });


  router.post('/logout', (req, res) => {
    req.session.userID = null;
    res.send({});
  });


  return router;
  };
