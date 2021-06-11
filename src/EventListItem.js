import './EventListItem.css';

function EventListItem({title, description, imageUrl, id, location}) {
  const venue = location ? location.venue : '';
  return (
    <div className="event-list-item" data-testid="event-list-item">
      <img src={imageUrl} alt={title}/>
      <div className="content">
        <h3>{title}</h3>
        <div>{description}</div>
        {venue && <div><span className="heading">Venue: </span>{venue}</div>}
        {location && location.address_lines && location.address_lines[0] !== "" &&
          <div>
            <div className="heading">Address:</div>
            {location.address_lines &&
              location.address_lines.map(line => (
                <div>{line}</div>
              ))
            }
            {location.locality && <span>{`${location.locality}, `}</span>}
            {location.region && <span>{location.region}</span>}
          </div>
        }
      </div>
    </div>
  );
}

export default EventListItem;
