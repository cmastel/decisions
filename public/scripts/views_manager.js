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

      }, 2000);
      break;
    }
    }
  }

});
