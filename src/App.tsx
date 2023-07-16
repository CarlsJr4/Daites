import { Heading } from '@chakra-ui/react';

import axios from 'axios';
import { useState } from 'react';
import LocationInfoType from './types/locationType';
import BaseContainer from './components/BaseContainer';
import ZipForm from './components/ZipForm';
import Reccomendations from './components/Reccomendations';
import pickRandomArrayItems from './helpers/pickRandomArrayItems';

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
      .get<LocationInfoType[]>('http://localhost:3000/businesses')
      .then(res => {
        setFilteredDateIdeas(
          pickRandomArrayItems<LocationInfoType>(res.data, 2)
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
