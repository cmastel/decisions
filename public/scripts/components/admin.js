$(() => {




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
        <h2 class="admin-title">${data.admin_url}</h2>
        <div class="admin-main">
          <div class="admin-main-question">Question:</div>
          <div class="admin-main-question-content">9</div>
          <ul class="admin-main-list">
            <li class="admin-main-list-item">9<span>8</span></li>
            <li class="admin-main-list-item">9<span>8</span></li>
            <li class="admin-main-list-item">9<span>8</span></li>
            <li class="admin-main-list-item">9<span">8</span></li>
          </ul>
        </div>
      </div>
      `;
    }
   $adminPage.append(userPoll);
  }

   window.adminPage.update = updateAdminPage;

  getPollDetails(admin_url)
    .then( data => {
      console.log("HEEEEEERRRREREEEEERERE",data);
      updateAdminPage(data)
    })
    .catch(e => console.log(e));


});
