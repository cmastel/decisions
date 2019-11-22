$(() => {

  const DOMAIN = 'http://localhost:8080/';

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

  // Submit button to send New Poll form contents to database
  $newPoll.on('submit', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    newPoll(data)
    .then(json => {
      updateAdminPage(json)
   })
  });

  // Cancel button for New Poll
  $newPoll.find('.cancel-btn').on('click', () => views_manager.show('mainPage'));
    $('body').on('click', '#new-poll-form__cancel', function() {
    views_manager.show('myPolls');
    return false;
  });

  // ----------------- Refresh Page to Show Poll Details ------------------------ //
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
      <div class="container">
        <p class="guest-title">${data.title}</p>
        <p class="guest-question">${data.question}</p>
        <p class="guest-result-title">Current results:</p>
        <form id="guest-url-form" class="guest-url-form">
          <ul class="list-choises">
            <li id="first-choise" class="list-choises-item" data-question_id="<%= question_id %>" data-id1="<%= choice1_id %>">
              <span>${data[0].choice}</span>
              <span>${data[0].borda_score}</span>
            </li>
            <li id="second-choise" class="list-choises-item" data-id2="<%= choice2_id %>">
              <span>${data[1].choice}</span>
              <span>${data[1].borda_score}</span>
            </li>
            <li id="third-choise" class="list-choises-item" data-id3="<%= choice3_id %>">
              <span>${data[2].choice}</span>
              <span>${data[2].borda_score}</span>
            </li>
            <li id="fourth-choise" class="list-choises-item" data-id4="<%= choice4_id %>">
              <span>${data[3].choice}</span>
              <span>${data[3].borda_score}</span>
            </li>
          </ul>
            <div class="guest-url-form__field-wrapper">
            </div>
          </form>
          <div class="admin-urls">
            <p class="admin-urls-title">Links:</p>
            <div class="admin-urls-row">
              <p class="admin-urls-row-text">Admin's:</p>
              <div class="admin-urls-links">
                <a href="${DOMAIN}api/urls/admin/${data.admin_url}">${DOMAIN}api/urls/admin/${data.admin_url}</a>
              </div>
            </div>
            <div class="admin-urls-row">
              <p class="admin-urls-row-text">Guest's:</p>
            <div class="admin-urls-links">
              <a href="${DOMAIN}api/urls/guest/${data.guest_url}">${DOMAIN}api/urls/guest/${data.guest_url}</a>
            </div>
            </div>
            </div>
          </div>
        </div>
      `;
    }
   $adminPage.append(userPoll);
  }

   window.adminPage.update = updateAdminPage;

});
