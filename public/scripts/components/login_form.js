$(() => {

  const $logInForm = $(`
  <form id="login-form" class="login-form">
      <p>Login</p>
      <div class="login-form__field-wrapper">
        <input type="email" name="email" placeholder="Email">
      </div>

      <div class="login-form__field-wrapper">
          <input type="password" name="password" placeholder="Password">
        </div>

      <div class="login-form__field-wrapper">
          <button>Login</button>
          <a id="login-form__cancel" href="#">Cancel</a>
      </div>
    </form>
  `);

  window.$logInForm = $logInForm;

  $logInForm.on('submit', function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    logIn(data)
      .then(json => {
        if(json) {
          header.update(json[0]);
          views_manager.show('myPolls');
        } else {
          console.log(json[0])
          views_manager.show('signUp');
        }
      })
      .catch(e => console.log(e));
  });

  // $('body').on('click', '#login-form__cancel', function() {
  //   views_manager.show('listings');
  //   return false;
  // });

});
