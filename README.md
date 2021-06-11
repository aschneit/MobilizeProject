To run the app:

`yarn start` or `npm run start`


My intent with this project was create a clear way to view the events with their most essential details, toggle easily between list view and map view, and to allow the user to load more data to the current page instead of switching to another page.

I decided the most essential information to convey for each event was the title, description, and location.

Instead of integrating the map view into the list view screen, for the purposes of this project and clarity of the ui, it seemed more ideal to allow the user to toggle between map and list views using a button.

The "Load More" button was a fairly frictionless way (short of infinite scroll) to allow the user to load more data without switching pages, and to indicate with "Loading..." that new data is being loaded.
