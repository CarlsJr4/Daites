// I want this function to accept type T, but T can only be an array
function pickRandomArrayItems<T>(
  originalArray: T[],
  numberOfItemsReturned: number
): T[] {
  const allDates = [...originalArray];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const shuffledDates = allDates.sort((_a, _b) => 0.5 - Math.random());

  return shuffledDates.slice(0, numberOfItemsReturned);
}

export default pickRandomArrayItems;
