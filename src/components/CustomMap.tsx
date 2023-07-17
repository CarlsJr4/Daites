import Map, { Marker, NavigationControl, Layer, Source } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// To draw a path between 2 points, you will need to make a request to MapBox
// Start coords, end coords
// You will get back a location array with a path between the points and some info about how long it takes etc...
export default function CustomMap() {
  const pathData = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: [
        [-122.483696, 37.833818],
        [-122.483482, 37.833174],
        [-122.483396, 37.8327],
        [-122.483568, 37.832056],
        [-122.48404, 37.831141],
        [-122.48404, 37.830497],
        [-122.483482, 37.82992],
        [-122.483568, 37.829548],
        [-122.48507, 37.829446],
        [-122.4861, 37.828802],
        [-122.486958, 37.82931],
        [-122.487001, 37.830802],
        [-122.487516, 37.831683],
        [-122.488031, 37.832158],
        [-122.488889, 37.832971],
        [-122.489876, 37.832632],
        [-122.490434, 37.832937],
        [-122.49125, 37.832429],
        [-122.491636, 37.832564],
        [-122.492237, 37.833378],
        [-122.493782, 37.833683],
      ],
    },
  };

  return (
    <Map
      reuseMaps
      mapboxAccessToken={import.meta.env.VITE_MAPBOX as string}
      initialViewState={{
        longitude: -122.483696,
        latitude: 37.830348,
        zoom: 14,
      }}
      style={{ width: 600, height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <NavigationControl />
      <Source id="my-data" type="geojson" data={pathData}>
        <Layer
          id="polylinelayer"
          type="line"
          source="my-data"
          layout={{
            'line-join': 'round',
            'line-cap': 'round',
          }}
          paint={{
            'line-color': 'rgba(3, 170, 238, 0.5)',
            'line-width': 5,
          }}
        />
      </Source>
      <Marker longitude={-122.483696} latitude={37.833818} anchor="bottom" />
      <Marker longitude={-122.493782} latitude={37.833683} anchor="bottom" />
    </Map>
  );
}
