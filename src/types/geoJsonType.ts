type pathArrayType = number[];

type GeoJsonType = {
  routes: [
    {
      duration: number;
      distance: number;
      geometry: {
        coordinates: pathArrayType[];
      };
    }
  ];
};

export default GeoJsonType;
