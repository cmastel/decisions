$(() => {

  const $guestURL = $('#guestURL');

  function updateGuestURL(pollData) {
    const pageInfo = $(`
    <h2>Poll Title</h2>
    <h3>Question</h3>
    <form id="guest-url-form" class="guest-url-form">
          <div class="guest-url-form__field-wrapperr">
            <input type="text" name="response_1" placeholder="What rank (1-4)?">
          </div>
          <div class="guest-url-form__field-wrapper">
              <input type="text" name="response_2" placeholder="What rank (1-4)?">
          </div>
          <div class="guest-url-form__field-wrapper">
              <input type="text" name="response_3" placeholder="What rank (1-4)?">
          </div>
          <div class="guest-url-form__field-wrapper">
              <input type="text" name="response_4" placeholder="What rank (1-4)?">
          </div>
          <div class="guest-url-form__field-wrapper">
              <button>Create New Poll</button>
              <a id="guest-url-form__cancel" href="#">Cancel</a>
          </div>
        </form>
    `);

    $guestURL.append(pageInfo);
  }

  window.$guestURL = $guestURL;

  getGuestURL()
  .then(function( json ) {
    updateGuestURL(json);
  })

  console.log(getGuestURL())

  $guestURL.on('submit', function(event) {
    event.preventDefault();
    console.log('guestURL submit pressed');
    const data = $(this).serialize();
    newPoll(data)
    .then(json => {
      console.log('json', json);
   })
  });



  $('body').on('click', '#guest-url__cancel', function() {
    views_manager.show('mainPage');
    return false;
  });

});
