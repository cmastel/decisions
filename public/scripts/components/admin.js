$(() => {

  function updateAdminPage(data) {
    const $adminPage = $(`
    <div class="admin-page">
      <h2>${data.title}</h2>
      <div>
        <div>Question:</div>
        <div>${data.question}</div>
        <ul>
          <li>${data.choice}<span>${data.score}</span></li>
          <li>${data.choice}<span>${data.score}</span></li>
          <li>${data.choice}<span>${data.score}</span></li>
          <li>${data.choice}<span>${data.score}</span></li>
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
