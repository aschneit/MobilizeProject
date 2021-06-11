import { useState, useCallback, memo } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '650px',
  height: '650px'
};

const center = {
  lat: 37.0902,
  lng: -95.7129
};

function Map({ events, className }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCp3WWVh1JpWp3lpzEf66Go-iDS6JKzKkk"
  })

  const [map, setMap] = useState(null)

  const onLoad = useCallback((map) => {
    setMap(map)
  }, [])

  const onUnmount = useCallback((map) => {
    setMap(null)
  }, [])

  const markers = events.reduce((acc, el) => {
    if (el.location && el.location.location && el.location.location.latitude && el.location.location.longitude) {
      return acc.concat({
        position: {
          lat: el.location.location.latitude,
          lng: el.location.location.longitude
        },
        title: el.title
      })
    } else {
      return acc.concat([])
    }
  }, []);

  return isLoaded ? (
      <GoogleMap
        data-testid="map"
        mapContainerStyle={containerStyle}
        mapContainerClassName={className}
        center={center}
        zoom={4}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {markers.map((marker, index) => (
          <Marker
            position={marker.position}
            key={index}
            title={marker.title}
          />
        ))}
      </GoogleMap>
  ) : <></>
}

export default memo(Map);
