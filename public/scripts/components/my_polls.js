$(() => {
  const $myPolls = $('#div-content');

  function updatePolls() {
    console.log('updatePolls is running');
    // $myPolls.find("#my_polls").remove();
    const pollInfo = `
    <section class="my_polls" id="my_polls">
      <button id="create_new_poll">CREATE</button>
      <div>
      <h2 class="my_polls">My Polls</h2>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Title</th>
            <th scope="col">Created</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody id="table-body>
          <tr>
            <td>id</td>
            <td>Title name</td>
            <td>Created at this time </td>
            <td>
              <form>
              <button data-pollID="53" type="submit"
                      class="btn btn-outline-danger">  </button>
              </form>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
      <p>Loading...</p>
    </section>
    `
    $myPolls.append(pollInfo);
  }

  const addTableRow = function(data) {
    const nextRow = `
      <tr>
        <td>${data.id}</td>
        <td>${data.title}</td>
        <td>${data.created_on.slice(0, 10)}</td>
        <td>
          <form>
          <button type="submit"
                  class="btn btn-outline-danger"> Delete </button>
          </form>
        </td>
      </tr>
    `
    return nextRow;
  }

  window.$myPolls = $myPolls;

  updatePolls();

  getPollsById()
  .then(function( json ) {
    for (let el of json) {
      $myPolls.find('tbody').prepend(addTableRow(el));
    }
  })

  $myPolls.on('click', '#create_new_poll', (event) => {
    event.preventDefault();
    views_manager.show('newPoll');
  });

  $myPolls.on('submit', (event) => {
    event.preventDefault();
    // const data = {...()};
    console.log('delete pressed');
    console.log('data', data);
    deletePoll(data)
    .then(json => {
      views_manager.show('myPolls');
    })
  });


});


