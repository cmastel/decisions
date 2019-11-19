$(() => {

  const $newPoll = $(`
  <form id="new-polls-form" class="signup-form">
        <p>New Poll</p>
        <div class="form-floating-label">
          <input type="text" name="poll_title" class="signup-form-input">
          <label for="poll_title">Title</label>
        </div>
        <div class="form-floating-label">
          <input type="text" name="poll_question" class="signup-form-input" >
          <label for="poll_question">What is your question?</label>
        </div>
        <div class="form-floating-label">
          <input type="text" name="response_1" class="signup-form-input">
          <label for="response_1"> Your first possible answer</label>
        </div>
        <div class="form-floating-label">
            <input type="text" name="response_2" class="signup-form-input">
            <label for="response_2"> Your second possible answer</label>
        </div>
        <div class="form-floating-label"">
            <input type="text" name="response_3" class="signup-form-input">
            <label for="response_3"> Your third possible answer</label>
        </div>
        <div class="form-floating-label">
            <input type="text" name="response_4" class="signup-form-input">
            <label for="response_4"> Your fourth possible answer</label>
        </div>
        <div class="signup-form-buttons">
            <button class="signup-form-buttons-btn" type="Submit">Submit</button>
            <button class="signup-form-buttons-btn " type="button" >Cancel</button>
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


  $newPoll.find('.cancel-btn').on('click', () => views_manager.show('mainPage'));

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
