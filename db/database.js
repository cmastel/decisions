const addUser = function(db, user) {
  return db.query(`
    INSERT INTO users (
      first_name, last_name, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `, [user.first_name, user.last_name, user.email, user.password]
  )
  .then(res => res.rows)
  .catch(err => console.log(err));
};

const getUserByEmail = function(db, email) {
  return db.query(`
    SELECT * FROM users
    WHERE users.email = $1
  `, [email]
  )
  .then(res => res.rows)
  .catch(err => console.log(err));
}

const getUserById = function (db, userId) {
  return db.query(`
    SELECT * FROM users
    WHERE id = $1
  `, [userId]
  )
  .then(res => res.rows[0])
  .catch(err => console.log(err));
}

const addNewPoll = function (db, newPoll) {
  console.log('newPoll to db', newPoll);

  return db.query(`

  `)
  .then(res => res.rows[0])
  .catch(err => console.log(err));
}

module.exports = { addUser, getUserByEmail, getUserById, addNewPoll };
