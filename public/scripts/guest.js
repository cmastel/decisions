$(() => {

  var isDragging = false;
  $(".list-choises-item")
  .mousedown(function() {
      isDragging = false;
  })
  .mousemove(function() {
      isDragging = true;
   })
  .mouseup(function() {
      var wasDragging = isDragging;
      isDragging = false;
      if (!wasDragging) {
          $("#throbble").toggle();
      }
  });
  $(".list-choises").sortable();
  // let isDragging = false;
  // $('.list')
  // .mousedown(function() {
  //   isDragging = false;
  // })
  // .mousemove(function() {
  //   isDragging = true;
  // })
  // .mouseup(function() {
  //   isDragging = false;
  // })

  // $("ul").sortable();
  $("#guest-url-form").on('submit', (event) => {
    event.preventDefault();
    let QQQ = $('#first-choise')[0].dataset;
    let data = {'poll-id': event.target[0].value}
    data = {...data, 'response_1': $('#first-choise').index()}
    data = {...data, 'response_2': $('#second-choise').index()}
    data = {...data, 'response_3': $('#third-choise').index()}
    data = {...data, 'response_4': $('#fourth-choise').index()}
    data = {...data, ...$('#first-choise')[0].dataset, ...$('#second-choise')[0].dataset, ...$('#third-choise')[0].dataset, ...$('#fourth-choise')[0].dataset};
    console.log('data', data)

    $.ajax({
      method: "POST",
      url: "/api/urls/guest/:guest_url",
      data: data
    }).done(() => {
      console.log('DONE')
    });

  })
});
