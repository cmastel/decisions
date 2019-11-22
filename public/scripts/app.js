$(() => {

  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((user) => {
    if (Object.keys(user).length !== 0) {
      views_manager.show('myPolls');
    } else {
      views_manager.show('mainPage');
    }
  });

  // Highlight highest responce on admin url summary
  const list = $('.list-choises-item');

  let arr = [];
  for (const item of list) {
    arr.push(Number(item.children[1].textContent));
  }
  const maxNumber = Math.max(...arr);
  for (const item of list) {
    if (maxNumber === Number(item.children[1].textContent)) {
      $(item).css("background-color", "rgba(31, 117, 255, 0.3)");
    }
  }

});
