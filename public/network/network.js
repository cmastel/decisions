function getMyDetails() {
  return $.ajax({
    method: "GET",
    url: "/api/users/me",
  });
};

function getPollDetails(admin_url) {
  console.log('getPollData called');
  return $.ajax({
    method: "GET",
    url: `/api/urls/admin/:${admin_url}`,
    data
  })
}

function getGuestURL(guest_url) {
  return $.ajax({
    method: "GET",
    url: `/api/urls/guest/:${guest_url}`,
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
    url: "/api/new_poll",
    data
  });
}

function getPollDetails(admin_url) {
  console.log('getPollData called');
  return $.ajax({
    method: "GET",
    url: `/api/urls/:${admin_url}`
  })
}

function getPollsById() {
  console.log('getPollsById called');
  return $.ajax({
    method: "GET",
    url: `/api/polls/user`
  })
}

function deletePoll(data) {
  console.log('deletePoll called');
  return $.ajax({
    method: "POST",
    url: `/api/delete`,
    data
  })

}
