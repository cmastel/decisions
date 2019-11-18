$(() => {

  const $main = $('#main-content');

  window.views_manager = {};

  window.views_manager.show = function(item) {
    // $newPropertyForm.detach();
    $signUpForm.detach();


    switch (item) {

    case 'signUp':
      $signUpForm.appendTo($main);
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
  }

});