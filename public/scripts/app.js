$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((user) => {
    console.log(user)
    if (Object.keys(user).length !== 0) {
      views_manager.show('myPolls');
    } else {
      views_manager.show('mainPage');
    }
  });
});
