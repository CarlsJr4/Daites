import Map, {
  Marker,
  NavigationControl,
  Layer,
  Source,
  Popup,
  MapRef,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Box, Heading, Text } from '@chakra-ui/react';
import MapType from '../types/mapType';
import { Offset } from 'mapbox-gl';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import GeoJsonType from '../types/geoJsonType';
import BusinessType from '../types/BusinessType';

export default function CustomMap({
  locations,
}: {
  locations: BusinessType[];
}) {
  const [pathLine, setPathLine] = useState<MapType>({} as MapType);
  const [viewState, setViewState] = useState({
    longitude: -117.918976,
    latitude: 33.812511,
    zoom: 10,
  });

  const mapRef = useRef<MapRef>(null);

  // We can only run the mapbox API once we get the coordinates of the Yelp data. So we use an effect hook.
  useEffect(() => {
    if (locations.length > 0) {
      const mapboxMarkerCoords: Array<number[]> = [];
      let mapboxLinePathData = '';
      locations.forEach((date, i) => {
        const latitude = date.coordinates.latitude;
        const longitude = date.coordinates.longitude;

        mapboxMarkerCoords.push([longitude, latitude]);
        mapboxLinePathData += `${longitude},${latitude}`;
        if (i + 1 < locations.length) mapboxLinePathData += ';';
      });

      mapRef.current?.flyTo({
        center: [
          locations[0].coordinates.longitude,
          locations[0].coordinates.latitude,
        ],
        duration: 2000,
      });

      const mapboxEndpoint = `https://outing-planner-api.onrender.com/coordinates/${mapboxLinePathData}`;
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
      {locations.length > 0 && <Heading>Location breakdown</Heading>}
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
        ref={mapRef}
        onMove={e => setViewState(e.viewState)}
        mapboxAccessToken="pk.eyJ1IjoiY2FybHNqMyIsImEiOiJjbGs2NzZjcjQxNGEzM2Ztcm14b3VncG82In0.nwGJ5nwSrsWqwjm7IsGawA"
        initialViewState={{
          longitude: -117.918976,
          latitude: 33.812511,
          zoom: 13,
        }}
        longitude={viewState.longitude}
        latitude={viewState.latitude}
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
            <Box key={location.id}>
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
            </Box>
          );
        })}
      </Map>
    </>
  );
}
