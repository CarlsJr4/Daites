import { Heading } from '@chakra-ui/react';

import axios from 'axios';
import { useState } from 'react';
import LocationInfoType from './types/locationType';
import BaseContainer from './components/BaseContainer';
import ZipForm from './components/ZipForm';
import Reccomendations from './components/Reccomendations';
import pickRandomArrayItems from './helpers/pickRandomArrayItems';

// To-do list
// Create a simple express app to store your Yelp API key
// Actually get data from Yelp API (desserts, dinners, activities, scenic viewpoints)
// Create waypoints on Google Maps API
// Send Google Maps link to phone
// Style the app
// Toggle additional options (Alter # of locations, select types of locations you want, food preferences)
// Re-roll entire date
// Re-roll individual activities
// Add more info about the dates
// Add "closes in X hours" feature
// Data validation

function App() {
  const [zip, setZip] = useState('');
  // const [dateIdeas, setDateIdeas] = useState([] as LocationInfoType[]);
  const [filteredDateIdeas, setFilteredDateIdeas] = useState(
    [] as LocationInfoType[]
  );
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setFilteredDateIdeas([]);
    axios
      .get<LocationInfoType[]>('http://localhost:3030/businesses')
      .then(res => {
        setFilteredDateIdeas(
          pickRandomArrayItems<LocationInfoType>(res.data, 3)
        );
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(false);
        setZip('');
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZip(e.target.value);
  };

  return (
    <>
      <BaseContainer>
        <Heading>Where to?</Heading>
        <ZipForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          zip={zip}
          isLoading={isLoading}
        />
      </BaseContainer>
      <BaseContainer>
        <Reccomendations
          isLoading={isLoading}
          recommendations={filteredDateIdeas}
        />
      </BaseContainer>
    </>
  );
}

export default App;
