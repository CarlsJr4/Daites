import { Heading } from '@chakra-ui/react';

import axios from 'axios';
import { useState } from 'react';
import LocationInfoType from './types/locationType';
import BaseContainer from './components/BaseContainer';
import ZipForm from './components/ZipForm';
import Reccomendations from './components/Reccomendations';
import pickRandomArrayItems from './helpers/pickRandomArrayItems';

// Your goal: Create an MVP
//  Input a ZIP code
//  Output data from the Yelp API
// 1 activity, 1 dinner, 1 dessert
// Output data from google maps
// A link that can be sent to your phone

// The workflow:
// Send API endpoints to your backend
// Receive the Yelp data on your frontend
// You can safely store the Yelp API key on render.com on a simple Express app when you need to

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
        <Heading>You: What do you want to do tonight?</Heading>
        <Heading>Your SO: Hmmmmm, IDK. You choose.</Heading>
        <Heading>You:</Heading>
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
