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
      <nav id="page-header__user-links" class="page-header__user-links">
        <ul>
          <li class="home">🏠</li>
          <li class="search_button">Search</li>
          <li class="login_button">Log In</li>
          <li class="sign-up_button">Sign Up</li>
        </ul>
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

  $("header").on('click', '.sign-up_button', () => {
    views_manager.show('signUp');
  });

});
