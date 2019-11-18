$(() => {

  const $signUpForm = $(`
  <form id="sign-up-form" class="sign-up-form">
        <p>Sign Up</p>

        <div class="sign-up-form__field-wrapper">
          <input type="text" name="first_name" placeholder="First Name">
        </div>

        <div class="sign-up-form__field-wrapper">
          <input type="text" name="last_name" placeholder="Last Name">
        </div>

        <div class="sign-up-form__field-wrapper">
          <input type="email" name="email" placeholder="Email">
        </div>

        <div class="sign-up-form__field-wrapper">
            <input type="password" name="password" placeholder="Password">
          </div>

        <div class="sign-up-form__field-wrapper">
            <button>Sign Up</button>
            <a id="sign-up-form__cancel" href="#">Cancel</a>
        </div>
      </form>
  `);
  window.$signUpForm = $signUpForm;

  $signUpForm.on('submit', function(event) {
    event.preventDefault();
    console.log('submit pressed');
    const data = $(this).serialize();
    signUp(data)
    .then(json => {
      console.log(json)
      header.update(json[0]);
   })
  });

  $('body').on('click', '#sign-up-form__cancel', function() {
    views_manager.show('listings');
    return false;
  });

});
