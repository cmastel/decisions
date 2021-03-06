$(() => {
  window.header = {};

  const $pageHeader = $('#page-header');
  function updateHeader(user) {
    currentUser = user;
    $pageHeader.find("#page-header__user-links").remove();
    let userLinks;

    if (!user) {
      userLinks = `
      <nav class="nav" id="page-header__user-links">
        <div class="nav-title">
          <a href="/">
            <img class="nav-title-logo" src="./static/images/Logo.png" />
          </a>
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
      <nav class="nav" id="page-header__user-links">
      <div class="nav-title">
        <a href="/">
          <img class="nav-title-logo" src="./static/images/Logo.png" />
        </a>
      </div>
      <div class="nav-body">
          <ul class="nav-body-list">
            <li class="nav-body-list-name">${user.first_name}</li>
            <li class="nav-body-list-name">${user.last_name}</li>
            <li class="nav-body-list-pollList" id="myPolls">My Polls</li>
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
    .then(function (json) {
      updateHeader(json.user);
    })

  $("header").on('click', '#login', () => {
    views_manager.show('logIn');
  });

  $("header").on('click', '#register', () => {
    views_manager.show('signUp');
  });

  $("header").on('click', '#logout', (e) => {
    logOut().then(() => {
      updateHeader(null);
      e.preventDefault();
      getMyDetails()
        .then(res => {
          $('.container').remove();
          $('#guest-header').remove();
          views_manager.show('logIn');
        })
        .catch(e => console.log(e));
  });
});

$("header").on('click', '#myPolls', (e) => {
  e.preventDefault();
  getMyDetails()
    .then(res => {
      if (!res) {
        views_manager.show('logIn');
      } else {
        $('.container').remove();
        $('#guest-header').remove();
        views_manager.show('pageHeader');
        views_manager.show('myPolls');
      }
    })
    .catch(e => console.log(e));
  });
});
