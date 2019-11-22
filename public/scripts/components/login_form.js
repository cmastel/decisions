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

  ///////////
  //Copy and pasted from my_polls.js to make things work
  //We are looking for ways to clean it up
  const addTableRow = function(data) {
    const nextRow = `
    <div class = "mypolls-accordeon">
    <div class = "list">
      <div class="mypolls-container-row-data">
        <div id="mypolls-title" class="mypolls-container-row-data-title">
          ${data.title}
        </div>
        <div class="mypolls-date">${data.created_on.slice(0, 10)}</div>
      <div  class="mypolls-container-row-data-btn">
        <a href="http://localhost:8080/api/urls/admin/${
          data["admin_url"]
        }" class="mypolls-btn-custom mypolls-btn" id="view-poll" data-pollUrl="${
      data["admin_url"]
    }"><span>View</span></a>
      </div>
      <div class="mypolls-container-row-data-btn">
      <form>
        <button id="mypoll-delete" data-pollID="${
          data.id
        }" type="submit" class="mypolls-btn-custom mypolls-btn">
          Delete
        </button>
      </form>
      </div>
      </div>
      <div class="mypolls-accordeon-data">
        <div class="mypolls-accordeon-data-question">${data.question}</div>
        <div class="mypolls-accordeon-data-item">${data[0]}</div>
        <div class="mypolls-accordeon-data-item">${data[1]}</div>
        <div class="mypolls-accordeon-data-item">${data[2]}</div>
        <div class="mypolls-accordeon-data-item">${data[3]}</div>
      </div>
    </div>
    `;
    return nextRow;
  };
  //////////

  $logInForm.on("submit", function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    logIn(data)
      .then(json => {
        if (!!json[0]) {
          header.update(json[0]);
          // Loads the My Polls table with Poll title and Choices
          getPollsById().then(function(data) {
            let arr = [];
            let obj = {};
            for (let i = 0; i < data.length; i++) {
              arr.push(data[i].choice);
              if ((i + 1) % 4 === 0) {
                obj = { ...obj, ...{ [i]: arr } };
                arr = [];
              }
            }
            for (let i = 0; i < data.length; i = i + 4) {
              let result = { ...data[i], ...obj[i + 3] };
              $myPolls.find("#table-body").prepend(addTableRow(result));
            }

            // Gives accordian functionality so that Choices drop from a poll Title
            $myPolls
              .find(".mypolls-accordeon .mypolls-container-row-data-title")
              .click(function(j) {
                const dropDown = $(this)
                  .closest(".list")
                  .find(".mypolls-accordeon-data");
                $(this)
                  .closest(".mypolls-accordeon")
                  .find(".mypolls-accordeon-data")
                  .not(dropDown)
                  .slideUp();
                if ($(this).hasClass("active")) {
                  $(this).removeClass("active");
                } else {
                  $(this)
                    .closest(".mypolls-accordeon")
                    .find(".mypolls-container-row-data-title.active")
                    .removeClass("active");
                  $(this).addClass("active");
                }

                dropDown.stop(false, true).slideToggle();

                j.preventDefault();
              });
          });
          views_manager.show("myPolls");
        } else {
          views_manager.show("signUp");
        }
      })
      .catch(e => console.log(e));
  });

  $logInForm
    .find(".cancel-btn")
    .on("click", () => views_manager.show("mainPage"));
});
