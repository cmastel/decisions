$(() => {
  const $myPolls = $('#div-content');

  function updatePolls() {
    console.log('updatePolls is running');
    // $myPolls.find("#my_polls").remove();
    const pollInfo = `
    <section class="mypolls" id="my_polls">
      <button class="mypolls-btn" id="create_new_poll">CREATE</button>
      <div class="mypolls-container">
        <h2 class="mypolls-container-title">My Polls</h2>
        <div class="mypolls-container-row">
          <div class="mypolls-container-row-data">
            <div class="mypolls-container-row-data-title-static">Title</div>
            <div class="mypolls-container-row-data-title-static">Created</div>
            <div class="mypolls-container-row-data-title-static">Delete</div>
          </div>
        </div>
        <div id="table-body" class="mypolls-container-row">

        </div>
      </div>
    </section>
    `
    $myPolls.append(pollInfo);
  }

  const addTableRow = function(data) {
    const nextRow = `
    <div class="mypolls-container-row-data">
      <div id="mypolls-title" class="mypolls-container-row-data-title">
        ${data.title}
        <div>${data[0]}</div>
        <div>${data[1]}</div>
        <div>${data[2]}</div>
        <div>${data[3]}</div>
      </div>
      <div>${data.created_on}</div>
      <div>
      <form>
        <button id="mypoll-delete" data-pollID="${data.id}" type="submit" class="delete-btn mypolls-btn">
          Delete
        </button>
      </form>
      </div>
    </div>
    `
    return nextRow;
  }

  window.$myPolls = $myPolls;

  updatePolls();

  getPollsById()
  .then(function( data ) {
   let  arr = [];
    let obj = {};
    for (let i = 0; i < data.length; i++) {
      arr.push(data[i].choice)
     if ((i + 1) % 4 === 0) {
      obj ={...obj, ...{ [i]: arr}}
      arr = [];
     }
    }


    for (let i = 0; i < data.length; i = i + 4) {
      let result = {...data[i], ...obj[(i+3)]}
      // console.log(result);
      $myPolls.find('#table-body').prepend(addTableRow(result));

    }
  });

  getPollsById();

  $myPolls.on('click', '#create_new_poll', (event) => {
    event.preventDefault();
    views_manager.show('newPoll');
  });

  $myPolls.on('submit', (event) => {
    event.preventDefault();
    // const data = {...()};
    console.log('delete pressed');
    const polls = document.getElementById('mypoll-delete')
    console.log('polls', polls)
    const pollID = polls.getAttribute('data-pollID');
    console.log('pollID', pollID);
    deletePoll({ 'pollID': pollID })
    .then(() => {
      console.log('should be going to new page')
      views_manager.show('myPolls');
    })
  });


});


