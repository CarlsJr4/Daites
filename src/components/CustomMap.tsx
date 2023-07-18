import Map, {
  Marker,
  NavigationControl,
  Layer,
  Source,
  Popup,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Box, Heading, Text } from '@chakra-ui/react';
import MapType from '../types/mapType';
import { Offset } from 'mapbox-gl';
import axios from 'axios';
import { useState, useEffect } from 'react';
import GeoJsonType from '../types/geoJsonType';
import LocationInfoType from '../types/locationType';

export default function CustomMap({
  locations,
}: {
  locations: LocationInfoType[];
}) {
  const [markerCoords, setMarkerCoords] = useState<Array<number[]>>([
    [-117.918976, 33.812511],
  ]);
  const [pathLine, setPathLine] = useState<MapType>({} as MapType);

  // We can only run the mapbox API once we get the coordinates of the Yelp data. So we use an effect hook.
  useEffect(() => {
    if (locations.length > 0) {
      const mapboxToken = import.meta.env.VITE_MAPBOX as string;
      const mapboxMarkerCoords: Array<number[]> = [];
      let mapboxLinePathData = '';
      locations.forEach((date, i) => {
        const latitude = date.coordinates.latitude;
        const longitude = date.coordinates.longitude;

        mapboxMarkerCoords.push([longitude, latitude]);
        mapboxLinePathData += `${longitude},${latitude}`;
        if (i + 1 < locations.length) mapboxLinePathData += ';';
      });

      setMarkerCoords(mapboxMarkerCoords);

      const mapboxEndpoint = `https://api.mapbox.com/directions/v5/mapbox/driving/${mapboxLinePathData}?geometries=geojson&access_token=${mapboxToken}`;
      axios
        .get<GeoJsonType>(mapboxEndpoint)
        .then(res => {
          const data = res.data.routes[0];
          setPathLine({
            pathArray: data.geometry.coordinates,
            duration: data.duration,
            distance: data.distance,
          });
        })
        .catch(err => console.log(err));
    }
  }, [locations]);

  const pathDataCustom = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: pathLine.pathArray,
    },
  };

  return (
    <>
      <Heading>Routing Info:</Heading>
      {Object.keys(pathLine).length > 0 ? (
        <Box>
          <Text>
            Total drive time: {Math.ceil(pathLine.duration / 60)} minutes
          </Text>
          <Text>
            Total distance: {Math.ceil(pathLine.distance * 0.00062137)} mi.
          </Text>
        </Box>
      ) : (
        ''
      )}

      <Map
        reuseMaps
        mapboxAccessToken={import.meta.env.VITE_MAPBOX as string}
        initialViewState={{
          longitude: -117.918976,
          latitude: 33.812511,
          zoom: 10,
        }}
        longitude={markerCoords[0][0]} // [0][0] is the longitude of the first location
        latitude={markerCoords[0][1]} // [0][1] is the latitude of the first location
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
        {locations.map((location, i) => {
          const { longitude, latitude } = location.coordinates;
          return (
            <>
              <Popup
                className="customPopup"
                longitude={longitude}
                latitude={latitude}
                anchor="left"
                offset={[15, -35] as Offset}
                closeButton={false}
                closeOnClick={false}
              >
                {i + 1}. {location.name}
              </Popup>
              <Marker
                longitude={longitude}
                latitude={latitude}
                anchor="bottom"
              />
            </>
          );
        })}
      </Map>
    </>
  );
}
