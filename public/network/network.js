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
};

function logOut() {
  return $.ajax({
    method: "POST",
    url: "api/users/logout",
  });
};
