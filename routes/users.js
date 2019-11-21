/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const database = require('../db/database.js');


module.exports = (db) => {
  // --------------------- GET --------------------- //

  // Displays details of users table in the browser
  router.get("/", (req, res) => {
    const userID = req.session.userID;
    db.query(`SELECT * FROM users;`)
    .then( data => {
      for (let i = 0; i < data.rows.length; i++) {
        if ( data.rows[i].id === userID) {
          res.send(data.rows[i]);
          break;
        }
        res.send({});
        break;
      }
     })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      })
  })

  // Gets user information to update Header (whether they are logged in or not)
  router.get("/me", (req, res) => {
    const userID = req.session.userID;
    if (!userID) {
      res.send(null);
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

    database.getUserByEmail(db, user.email)
      .then(data => {
        if (data.length !== 0) {
          res.send();
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

  const login = function (email, password) {
    return database.getUserByEmail(db, email)
      .then(user => {
        if (bcrypt.compareSync(password, user[0].password)) {
          return user;
        }
        return null;
      });
  }
  // Login in for existing user
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

  // User logout
  router.post('/logout', (req, res) => {
    req.session.userID = null;
    res.send({});
  });

  return router;
  };
