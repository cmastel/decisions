function signUp(data) {
  console.log('signUp called')
  return $.ajax({
    method: "POST",
    url: "/api/users",
    data
  });
}
