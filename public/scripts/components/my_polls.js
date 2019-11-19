$(() => {
  window.myPolls = {};

  const $myPolls = $('#main-content');

  function updatePolls() {
    $myPolls.find("#my_polls").remove();
    const pollInfo = `
    <section class="my_polls" id="my_polls">
      <p>TEST</p>
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
              <button type="submit"
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
      <td>${data.created_on}</td>
      <td>
        <form>
        <button type="submit"
                class="btn btn-outline-danger"> Delete </button>
        </form>
      </td>
    </tr>
  `
  // $("#table-body").append(nextRow)
  return nextRow;
}

window.myPolls.update = updatePolls;

updatePolls();

getPollsById()
.then(function( json ) {
  for (let el of json) {
    $myPolls.find('tbody').append(addTableRow(el));
  }
})





  $myPolls.on('click', '#create_new_poll', (event) => {
    event.preventDefault();
    views_manager.show('newPoll');
  });



});
