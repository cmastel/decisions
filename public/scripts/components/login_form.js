$(() => {

  const $logInForm = $(`
  <form id="login-form" class="signup-form">
      <p>Login</p>
      <div class="form-floating-label">
        <input type="email" class="signup-form-input" name="email">
        <label for="email">Email</label>
      </div>

      <div class="form-floating-label">
        <input type="password" class="signup-form-input" name="password">
        <label for="password">Password</label>
      </div>

      <div class="signup-form-buttons">
        <button class="signup-form-buttons-btn type="Submit"">Login</button>
        <button  class="signup-form-buttons-btn cancel-btn" type="button" >Cancel</button>
      </div>
    </form>
  `);

  window.$logInForm = $logInForm;

  $logInForm.on('submit', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    logIn(data)
      .then(json => {
        if(!!json[0]) {
          header.update(json[0]);
          views_manager.show('myPolls');
        } else {
          views_manager.show('signUp');
        }
      })
      .catch(e => console.log(e));
  });

  $logInForm.find('.cancel-btn').on('click', () => views_manager.show('mainPage'));

});
