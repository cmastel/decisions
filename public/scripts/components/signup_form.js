$(() => {

  const $signUpForm = $(`
  <form id="sign-up-form" class="signup-form">
        <p>Sign Up</p>

        <div class="form-floating-label">
          <input id="first-name" class="signup-form-input" type="text" name="first_name">
          <label for="first_name">First name</label>
        </div>

        <div class="form-floating-label">
          <input type="text" class="signup-form-input" name="last_name">
          <label for="last_name">Last name</label>
        </div>

        <div class="form-floating-label">
          <input type="email" class="signup-form-input" name="email">
          <label for="email">Email</label>
        </div>

        <div class="form-floating-label">
            <input type="password" class="signup-form-input" name="password">
            <label for="password">Password</label>
          </div>

        <div class="signup-form-buttons">
            <button class="signup-form-buttons-btn" type="Submit">Sign Up</button>
            <button class="signup-form-buttons-btn cancel-btn" type="button" >Cancel</button>
        </div>
      </form>
  `);
  window.$signUpForm = $signUpForm;

  $signUpForm.on('submit', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    signUp(data)
    .then(json => {
      header.update(json[0]);
      views_manager.show('myPolls');
   })
  });

  $signUpForm.find('.cancel-btn').on('click', () => views_manager.show('mainPage'));

});
