$(() => {
  const $myPolls = $("#div-content");
  const DOMAIN = 'http://lhldescions.herokuapp.com/';

  function updatePolls() {
    $("#my_polls").remove();
    const pollInfo = `
    <section class="mypolls" id="my_polls">
      <button class="mypolls-btn" id="create_new_poll">CREATE</button>
      <div class="mypolls-container">
        <h2 class="mypolls-container-title">My Polls</h2>
        <div class="mypolls-container-row">
          <div class="mypolls-container-row-data">
            <div class="mypolls-container-row-data-title-static">TITLE</div>
            <div class="mypolls-container-row-data-title-static">CREATED</div>
          </div>
        </div>
        <div id="table-body" class="mypolls-container-row">
        </div>
      </div>
    </section>
    `;
    $myPolls.append(pollInfo);
  }

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
        <a href="${DOMAIN}api/urls/admin/${
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

  window.$myPolls = $myPolls;

  updatePolls();

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

  // Create New Poll Button
  $myPolls.on("click", "#create_new_poll", event => {
    event.preventDefault();
    views_manager.show("newPoll");
  });

  // Delete Poll
  $myPolls.on("submit", event => {
    const pollID = Number(Object.values(event.target[0].dataset));
    event.preventDefault();
    deletePoll({ pollID: pollID })
      .then(() => updatePolls())
      .then(() => {
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
      });
  });
});
