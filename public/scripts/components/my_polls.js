$(() => {

  const $myPolls = $(`
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
      <tbody>
        <tr>
          <td>id</td>
          <td>Title name</td>
          <td>Created at this time </td>
          <td>
            <form>
            <button type="submit"
                    class="btn btn-outline-danger"> Delete </button>
            </form>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
    <p>Loading...</p>
  </section>
  `);
  window.$myPolls = $myPolls;

  window.myPolls = {};

  $('#create_new_poll').on('click', (event) => {
    event.preventDefault();
    views_manager.show('newPoll');
  });

  // function addListing(listing) {
  //   $propertyListings.append(listing);
  // }
  // function clearListings() {
  //   $propertyListings.empty();
  // }
  // window.propertyListings.clearListings = clearListings;

  // function addProperties(properties, isReservation = false) {
  //   clearListings();
  //   for (const propertyId in properties) {
  //     const property = properties[propertyId];
  //     const listing = propertyListing.createListing(property, isReservation);
  //     addListing(listing);
  //   }
  // }
  // window.propertyListings.addProperties = addProperties;

});
