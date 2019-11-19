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
    newPoll(data)
    .then(json => {
      console.log('json', json);
      updateAdminPage(json)
   })
  });


  $('body').on('click', '#new-poll-form__cancel', function() {
    views_manager.show('myPolls');
    return false;
  });



  window.adminPage = {};

  const $adminPage = $('#main-content');

  function updateAdminPage(data) {

    $adminPage.find('#admin').remove();

    let userPoll;

    if(Object.keys(data).length === 0) {
      userPoll = null;
    } else {
      views_manager.show('');
      userPoll= `
      <div class="admin">
        <h2 class="admin-title">${data.title}</h2>
        <div class="admin-main">
          <div class="admin-main-question">Question:</div>
          <div class="admin-main-question-content">${data.question}</div>
          <ul class="admin-main-list">
             <li class="admin-main-list-item">${data[0].choice}<span>${data[0].borda_score}</span></li>
            <li class="admin-main-list-item">${data[1].choice}<span>${data[1].borda_score}</span></li>
            <li class="admin-main-list-item">${data[2].choice}<span>${data[2].borda_score}</span></li>
            <li class="admin-main-list-item">${data[3].choice}<span">${data[3].borda_score}</span></li>
          </ul>
        </div>
        <div><a href="http://localhost:8080/api/urls/admin/${data.admin_url}">http://localhost:8080/api/urls/admin/${data.admin_url}</a></div>
        <div><a href="http://localhost:8080/api/urls/guest/${data.guest_url}">http://localhost:8080/api/urls/guest/${data.guest_url}</a></div>
      </div>
      `;
    }
   $adminPage.append(userPoll);
  }

   window.adminPage.update = updateAdminPage;

});
