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
              <li><a href="#">About</a></li>
            </ul>
        </div>
        <div class="nav-buttons">
          <button id ="register" type="button" class="nav-buttons-style">
            <span class="nav-buttons-style-font">Register</span>
          </button>
          <button type="button" class="nav-buttons-style">
            <span class="nav-buttons-style-font">Login</span>
          </button>
        </div>
      </nav>


      `
    } else {
      userLinks = `
      <nav id="page-header__user-links" class="page-header__user-links">
        <ul>
          <li class="home">🏠</li>
          <li>${user.first_name}</li>
          <li class="my_polls_button">My Listings</li>
          <li class="logout_button">Log Out</li>
        </ul>
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

  $("header").on('click', '#register', () => {
    views_manager.show('signUp');
  });

});
