import './App.css';
import { useState, useEffect } from 'react';
import EventListItem from './EventListItem';
import Map from './Map';

function App() {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [morePages, setMorePages] = useState(true);
  const [mapView, setMapView] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://api.mobilize.us/v1/events?page=${page}`);
        const json = await res.json();
        if (!json.next) setMorePages(false);
        const newEvents = json.data.map(datum => ({
          title: datum.title,
          imageUrl: datum.featured_image_url,
          id: datum.id,
          location: datum.location,
          description: datum.description,
        }));
        setEvents(events => [...events, ...newEvents]);
        setLoading(false);
      }
      catch(err) {
        setLoading(false);
        console.log(err);
      }
    }
    fetchEvents();
  }, [page]);

  return (
    <div className="App">
      <button
        data-testid="map-view-button"
        className="map-view-button"
        onClick={() => setMapView(!mapView)}
      >
        {mapView ? 'List View' : 'Map View'}
      </button>
      <h1>All Events</h1>
      {mapView ?
        <Map className="map" events={events}/>
      :
        <>
          {events.map(event => (
            <EventListItem
              {...event}
              key={event.id}
            />
          ))}
          {morePages &&
            <button
              className="load-more"
              onClick={() => setPage(page + 1)}
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          }
        </>
      }
    </div>
  );
}

export default App;
