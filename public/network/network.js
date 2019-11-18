function getMyDetails() {
  return $.ajax({
    method: "GET",
    url: "/api/users/me",
  });
};

function signUp(data) {
  console.log('signUp called')
  return $.ajax({
    method: "POST",
    url: "/api/users",
    data
  });
}

function logIn(data) {
  console.log('login called')
  return $.ajax({
    method: "POST",
    url: "api/users/login",
    data
  });
}

function logOut() {
  return $.ajax({
    method: "POST",
    url: "api/users/logout",
  });
};

function newPoll(data) {
  console.log('newPoll called')
  return $.ajax({
    method: "POST",
    url: "/api/polls/new_poll",
    data
  });
}
