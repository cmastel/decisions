$(() => {

  const $main = $('#main-content');

  window.views_manager = {};

  window.views_manager.show = function(item) {
    $logInForm.detach();
    $signUpForm.detach();
    $myPolls.detach();
    $mainPage.detach();
    $newPoll.detach();
    $guestURL.detach();


    switch (item) {

    case 'myPolls':
      $myPolls.appendTo($main);
      break;
    case 'newPoll':
      $newPoll.appendTo($main);
      break;
    case 'mainPage':
      $mainPage.appendTo($main);
      break;
    case 'signUp':
      $signUpForm.appendTo($main);
      break;
    case 'logIn':
      $logInForm.appendTo($main);
      break;
    case 'guest':
      $guestURL.appendTo($main);
      break;
    case 'error': {
      const $error = $(`<p>${arguments[1]}</p>`);
      $error.appendTo('body');
      setTimeout(() => {
        $error.remove();
        views_manager.show('listings');
      }, 2000);
      break;
    }
    }

    $('.form-floating-label input, .form-floating-label textarea').focusin(function(){
      $(this).parent().addClass('has-value');
      $(this).addClass('border-blue');
    });

    $('.form-floating-label input, .form-floating-label textarea').blur(function(){
      if(!$(this).val().length > 0) {
        $(this).parent().removeClass('has-value');
        $(this).removeClass('border-blue');
      }
    });

  }

});
