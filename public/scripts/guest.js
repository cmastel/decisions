$(() => {

  //Drag and drop logic
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

  $("#guest-url-form").on('submit', (event) => {
    event.preventDefault();
    let data = {}
    data = {...data, 'response_1': $('#first-choise').index()}
    data = {...data, 'response_2': $('#second-choise').index()}
    data = {...data, 'response_3': $('#third-choise').index()}
    data = {...data, 'response_4': $('#fourth-choise').index()}
    data = {...data, ...$('#first-choise')[0].dataset, ...$('#second-choise')[0].dataset, ...$('#third-choise')[0].dataset, ...$('#fourth-choise')[0].dataset};
    console.log('data', data);
    console.log($('#first-choise')[0].dataset)

    $.ajax({
      method: "POST",
      url: "/api/urls/guest/:guest_url",
      data: data
    }).done((res) => {
     if (res.message === 'done') {
      $('.container').remove();
      $('#guest-header').load('/static/thanks.html', () => alert('Load was performed.'));
     } else {

      $('#guest-header-title').fadeOut('slow', () => {
        $('#guest-header-title').load('/static/error.html', () => {
            $('#guest-header-title').fadeIn('slow');
        });
    });

      // $('#guest-header').load('/static/error.html');
      // $(".guest-error").toggleClass("bounceAlpha");
      // $(".guest-error").toggleClass("hide");
     }
    });

  })
});
