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

const getUserByQuestionId = function (db, questionId) {
  return db.query(`
    SELECT users.email, polls.admin_url
    FROM users
    JOIN polls ON users.id = polls.user_id
    JOIN questions ON polls.id = questions.poll_id
    WHERE questions.id = $1;
  `, [questionId]
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
    ($1, $5)
    RETURNING *;
  `, values)
  .then(res => res.rows)
  .catch(err => console.log(err));
}

const getPollDetailsDB = function (db, admin_url) {
  const values = [
    admin_url,
  ]
return db.query(`
  SELECT *
  FROM polls
  JOIN questions ON polls.id = questions.poll_id
  JOIN responses ON questions.id = responses.question_id
  WHERE polls.admin_url = $1;
`, values)
.then(res => res.rows)
.catch(err => console.log(err));
}

const getGuestPoll = function (db, guest_url) {
  const values = [
    guest_url,
  ]
return db.query(`
  SELECT polls.title, questions.question, responses.choice, questions.id as question_id, responses.id
  FROM polls
  JOIN questions ON polls.id = questions.poll_id
  JOIN responses ON questions.id = responses.question_id
  WHERE polls.guest_url = $1;
`, values)
.then(res => res.rows)
.catch(err => console.log(err));
}

const getAdminPoll = function (db, admin_url) {
  const values = [
    admin_url,
  ]
return db.query(`
  SELECT polls.title, questions.question, responses.choice, questions.id as question_id, responses.id, responses.borda_score as score, polls.admin_url, polls.guest_url
  FROM polls
  JOIN questions ON polls.id = questions.poll_id
  JOIN responses ON questions.id = responses.question_id
  WHERE polls.admin_url = $1;
`, values)
.then(res => res.rows)
.catch(err => console.log(err));
}

const getPollsById = function (db, user_id) {
  const values = [
    user_id
  ]
return db.query(`
  SELECT *
  FROM polls
  WHERE polls.user_id = $1;
`, values)
.then(res => res.rows)
.catch(err => console.log(err));
}

const updateBorda = function (db, values) {
  return db.query(`
    UPDATE responses
    SET borda_score = borda_score + $1
    WHERE id = $2;
  `, values)
  .then(res => res.rows)
  .catch(err => console.log(err));
}

const deletePollById = function (db, pollID) {
  return db.query(`
    DELETE FROM polls WHERE polls.id = $1;
  `, [pollID])
  .then(() => console.log('Poll deleted'))
  .catch(err => console.log(err));
}

module.exports = {
  addUser,
  getUserByEmail,
  getUserById,
  getUserByQuestionId,
  addNewPoll,
  addNewQuestions,
  addNewResponses,
  getPollDetailsDB,
  getGuestPoll,
  getPollsById,
  updateBorda,
  getAdminPoll,
  deletePollById,
};
