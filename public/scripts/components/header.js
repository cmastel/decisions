$(() => {
  window.header = {};

  const $pageHeader = $('#page-header');
  let currentUser = null;
  function updateHeader(user) {
    currentUser = user;
    $pageHeader.find("#page-header__user-links").remove();
    let userLinks;

    if (!user) {
      userLinks = `
      <nav class="nav">
        <div class="nav-title">
            <img class="nav-title-logo" src="./styles/images/Logo.png" />
        </div>
        <div class="nav-body">
            <ul class="nav-body-list">
              <li><a href="#">Home</a></li>
            </ul>
        </div>
        <div class="nav-buttons">
          <button id ="register" type="button" class="nav-buttons-style">
            <span class="nav-buttons-style-font">Register</span>
          </button>
          <button id="login" type="button" class="nav-buttons-style">
            <span class="nav-buttons-style-font">Login</span>
          </button>
        </div>
      </nav>


      `
    } else {
      userLinks = `
      <nav class="nav">
      <div class="nav-title">
          <img class="nav-title-logo" src="./styles/images/Logo.png" />
      </div>
      <div class="nav-body">
          <ul class="nav-body-list">
             <li><a href="#">Home</a></li>
             <li>${user.first_name}</li>
             <li>${user.last_name}</li>
          </ul>
      </div>
      <div class="nav-buttons">
        <button id="logout" type="button" class="nav-buttons-style">
          <span class="nav-buttons-style-font">Log out</span>
        </button>
      </div>
    </nav>
      `
    }

    $pageHeader.append(userLinks);
  }

  window.header.update = updateHeader;

  getMyDetails()
    .then(function( json ) {
      console.log('header json', json)
      updateHeader(json.user);
    })

  // updateHeader();

  $("header").on('click', '#login', () => {
    views_manager.show('logIn');
  });

  $("header").on('click', '#register', () => {
    views_manager.show('signUp');
  });

});
