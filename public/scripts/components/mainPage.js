$(() => {

  const $mainPage = $(`
  <div class="main-page">
    <div class="main-page-title">
     Create a poll which helps you make decisions
    </div>
    <button id="get-started" class="main-page-button">Get started</button>
  </div>
  `);
  window.$mainPage = $mainPage;

  $mainPage.on('click', "#get-started", (e) => {
    e.preventDefault();
    getMyDetails()
    .then(res => {
      if (!res) {
        views_manager.show('logIn');
      } else {
        views_manager.show('myPolls');
      }
    })
    .catch(e => console.log(e));
  });


});
