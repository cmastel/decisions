$(() => {

  const $newPoll = $(`
  <form id="new-polls-form" class="new-polls-form">
        <p>New Poll</p>

        <div class="new-poll-form__field-wrapper">
          <input type="text" name="poll_title" placeholder="Title">
        </div>

        <div class="new-poll-form__field-wrapper">
          <input type="text" name="poll_question" placeholder="What is your question?">
        </div>

        <div class="new-poll-form__field-wrapperr">
          <input type="text" name="response_1" placeholder="Your first possible answer">
        </div>

        <div class="new-poll-form__field-wrapper">
            <input type="text" name="response_2" placeholder="Your second possible answer">
        </div>

        <div class="new-poll-form__field-wrapper">
            <input type="text" name="response_3" placeholder="Your third possible answer">
        </div>

        <div class="new-poll-form__field-wrapper">
            <input type="text" name="response_4" placeholder="Your fourth possible answer">
        </div>

        <div class="new-poll-form__field-wrapper">
            <button>Create New Poll</button>
            <a id="new-poll-form__cancel" href="#">Cancel</a>
        </div>
      </form>
  `);
  window.$newPoll = $newPoll;

  $newPoll.on('submit', function(event) {
    event.preventDefault();
    console.log('submit pressed');
    const data = $(this).serialize();
    signUp(data)
    .then(json => {
      console.log(json)
      header.update(json[0]);
      views_manager.show('myPolls');
   })
  });

  $('body').on('click', '#new-poll-form__cancel', function() {
    views_manager.show('myPolls');
    return false;
  });

});
