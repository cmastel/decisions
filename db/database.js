const addUser = function(db, user) {
  return db.query(`
    INSERT INTO users (
      first_name, last_name, email, password)
    VALUES ($1, $2, $3, $4)
  `, [user.first_name, user.last_name, user.email, user.password]
  )
  .then(res => res.rows)
  .catch(err => console.log(err));
};

const getUserByEmail = function(db, email) {
  return db.query(`
    SELECT * FROM users
    WHERE $1 = users.email
  `, [email]
  )
  .then(res => res.rows)
  .catch(err => console.log(err));
}

module.exports = { addUser, getUserByEmail };
