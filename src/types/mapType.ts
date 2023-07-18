type pathArrayType = number[];

type MapType = {
  startingLat: number;
  startingLong: number;
  endingLat: number;
  endingLong: number;
  pathArray: pathArrayType[];
  duration: number;
  distance: number;
};

export default MapType;
