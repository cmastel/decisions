// -------------- GET ------------------- //

function getMyDetails() {
  return $.ajax({
    method: "GET",
    url: "/api/users/me",
  });
}

function getGuestURL(guest_url) {
  return $.ajax({
    method: "GET",
    url: `/api/urls/guest/:${guest_url}`,
  });
}

function getPollDetails(admin_url) {
  return $.ajax({
    method: "GET",
    url: `/api/urls/admin/:${admin_url}`
  });
}

function getPollsById() {
  return $.ajax({
    method: "GET",
    url: `/api/polls/user`
  });
}

// -------------- POST ------------------- //


function signUp(data) {
  return $.ajax({
    method: "POST",
    url: "/api/users",
    data
  });
}

function logIn(data) {
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
}

function newPoll(data) {
  return $.ajax({
    method: "POST",
    url: "/api/new_poll",
    data
  });
}

function deletePoll(data) {
  return $.ajax({
    method: "POST",
    url: `/api/delete`,
    data
  });
}

