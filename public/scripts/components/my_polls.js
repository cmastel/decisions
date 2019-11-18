$(() => {

  const $myPolls = $(`
  <section class="my_polls" id="my_polls">
    <button id="create_new_poll">CREATE</button>
    <h2 class="my_polls">My Polls</h2>
    <p>Loading...</p>
  </section>
  `);
  window.$myPolls = $myPolls;

  window.myPolls = {};

  $myPolls.on('click', function(event) {
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
