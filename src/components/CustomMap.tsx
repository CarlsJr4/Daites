import Map, {
  Marker,
  NavigationControl,
  Layer,
  Source,
  Popup,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Heading, Text } from '@chakra-ui/react';
import MapType from '../types/mapType';
import { Offset } from 'mapbox-gl';

type CustomMapProps = {
  pathData: MapType;
};

// To draw a path between 2 points, you will need to make a request to MapBox
// Start coords, end coords
// You will get back a location array with a path between the points and some info about how long it takes etc...
export default function CustomMap({ pathData }: CustomMapProps) {
  const pathDataCustom = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: pathData.pathArray,
    },
  };

  return (
    <>
      <Heading>Routing Info:</Heading>
      <Text>Total drive time: {Math.ceil(pathData.duration / 60)} minutes</Text>
      <Text>
        Total distance: {Math.ceil(pathData.distance * 0.00062137)} mi.
      </Text>
      <Map
        reuseMaps
        mapboxAccessToken={import.meta.env.VITE_MAPBOX as string}
        initialViewState={{
          longitude: pathData.startingLong,
          latitude: pathData.startingLat,
          zoom: 10,
        }}
        style={{ width: 600, height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <NavigationControl />
        <Source id="my-data" type="geojson" data={pathDataCustom}>
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
        <Popup
          className="customPopup"
          longitude={pathData.endingLong}
          latitude={pathData.endingLat}
          anchor="left"
          offset={[15, -35] as Offset}
          closeButton={false}
          closeOnClick={false}
        >
          Location 2
        </Popup>
        <Popup
          className="customPopup"
          longitude={pathData.startingLong}
          latitude={pathData.startingLat}
          anchor="left"
          offset={[15, -35] as Offset}
          closeButton={false}
          closeOnClick={false}
        >
          Location 1
        </Popup>
        <Marker
          longitude={pathData.startingLong}
          latitude={pathData.startingLat}
          anchor="bottom"
        />
        <Marker
          longitude={pathData.endingLong}
          latitude={pathData.endingLat}
          anchor="bottom"
        />
      </Map>
    </>
  );
}
