import { Heading } from '@chakra-ui/react';

import axios from 'axios';
import { useState } from 'react';
import LocationInfoType from './types/locationType';
import BaseContainer from './components/BaseContainer';
import ZipForm from './components/ZipForm';
import Reccomendations from './components/Reccomendations';

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

// It should involve minimal backend

// Once you get this MVP going, refactor the code to be more maintainable

function App() {
  const [zip, setZip] = useState('');
  const [dateIdeas, setDateIdeas] = useState([] as LocationInfoType[]);
  const [recommendations, setReccomendations] = useState(
    [] as LocationInfoType[]
  );
  const [isLoading, setLoading] = useState(false);

  const pickRandomDates = (
    dates: LocationInfoType[],
    numberOfLocations: number
  ) => {
    const allDates = [...dates];
    const shuffledDates = allDates.sort((a, b) => 0.5 - Math.random());

    return shuffledDates.slice(0, numberOfLocations);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setDateIdeas([]);
    setReccomendations([]);
    axios
      .get<LocationInfoType[]>('http://localhost:3030/businesses')
      .then(res => {
        setDateIdeas(res.data);
        setReccomendations(pickRandomDates(res.data, 3)); // Pick 3 random date ideas
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
    setZip('');
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
          recommendations={recommendations}
        />
      </BaseContainer>
    </>
  );
}

export default App;
