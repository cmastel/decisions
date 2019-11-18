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

const addNewPoll = function (db, newPoll, userID) {
  if (!userID) {
    res.send({ message: "not logged in" });
    return;
  };
  const created = new Date;
  const createdDate = created.getFullYear() + '-' + (created.getMonth() + 1) + '-' + created.getDate();
  const values = [
    newPoll.poll_title,
    newPoll.adminUrl,
    newPoll.guestUrl,
    userID,
    createdDate
  ]
  return db.query(`
    INSERT INTO polls (title, admin_url, guest_url, user_id, created_on)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `, values)
  .then(res => res.rows[0])
  .catch(err => console.log(err));
}

const addNewQuestions = function (db, newQuestions, pollData) {
  const values =[
    pollData.id,
    newQuestions.poll_question
  ]
  return db.query(`
    INSERT INTO questions (poll_id, question)
    VALUES ($1, $2)
    RETURNING *;
  `, values)
  .then(res => res.rows[0])
  .catch(err => console.log(err));
}

const addNewResponses = function (db, newQuestions, questionsData) {
  const values =[
    questionsData.id,
    newQuestions.response_1,
    newQuestions.response_2,
    newQuestions.response_3,
    newQuestions.response_4
  ]
  return db.query(`
    INSERT INTO responses (question_id, choice)
    VALUES ($1, $2),
    ($1, $3),
    ($1, $4),
    ($1, $5);
  `, values)
  .then(res => res.rows[0])
  .catch(err => console.log(err));
}

module.exports = { addUser, getUserByEmail, getUserById, addNewPoll, addNewQuestions, addNewResponses };
