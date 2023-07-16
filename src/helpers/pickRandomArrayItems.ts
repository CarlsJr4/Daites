// I want this function to accept type T, but T can only be an array
function pickRandomArrayItems<T>(
  originalArray: T[],
  numberOfItemsReturned: number
): T[] {
  const allDates = [...originalArray];
  const shuffledDates = allDates.sort((a, b) => 0.5 - Math.random());

  return shuffledDates.slice(0, numberOfItemsReturned);
}

export default pickRandomArrayItems;
