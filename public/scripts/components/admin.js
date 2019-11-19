$(() => {

  function updateAdminPage(data) {
    const $adminPage = $(`
    <div class="admin">
      <h2 class="admin-title>${data.title}</h2>
      <div class="admin-main">
        <div class="admin-main-question">Question:</div>
        <div class="admin-main-question-content">${data.question}</div>
        <ul class="admin-main-list">
          <li class="admin-main-list-item">${data.choice}<span>${data.score}</span></li>
          <li class="admin-main-list-item">${data.choice}<span>${data.score}</span></li>
          <li class="admin-main-list-item">${data.choice}<span>${data.score}</span></li>
          <li class="admin-main-list-item">${data.choice}<span">${data.score}</span></li>
        </ul>
      </div>
    </div>
    `);
    window.$adminPage = $adminPage;
  }


  getPollDetails(adminUrl)
    .then( data => updateAdminPage(data))
    .catch(e => console.log(e));


});
