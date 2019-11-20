$(() => {
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
    let data = {'poll-id': event.target[0].value}
    data = {...data, 'response_1': event.target[1].value}
    data = {...data, 'response_2': event.target[2].value}
    data = {...data, 'response_3': event.target[3].value}
    data = {...data, 'response_4': event.target[4].value}
    data = {...data, ...event.target[1].dataset, ...event.target[2].dataset, ...event.target[3].dataset, ...event.target[4].dataset};
    console.log('data', data)

    $.ajax({
      method: "POST",
      url: "/api/urls/guest/:guest_url",
      data: data
    }).done((user) => {
      console.log('DONE')
    });

  })
});
