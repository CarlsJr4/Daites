import { HStack, Heading, Skeleton, Text } from '@chakra-ui/react';

import axios from 'axios';
import { useState } from 'react';
import LocationInfoType, { BusinessType } from './types/locationType';
import BaseContainer from './components/BaseContainer';
import ZipForm from './components/ZipForm';
import Reccomendations from './components/Reccomendations';
import pickRandomArrayItems from './helpers/pickRandomArrayItems';
import CustomMap from './components/CustomMap';
import './main.css';

function App() {
  const [zip, setZip] = useState('');
  const [zipError, setZipError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [dateIdeas, setDateIdeas] = useState([] as BusinessType[]);
  const [filteredDateIdeas, setFilteredDateIdeas] = useState(
    [] as BusinessType[]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setZipError(false);
    setFilteredDateIdeas([]);
    if (zip.length !== 5 || isNaN(Number(zip))) {
      setZipError(true);
      return;
    }
    setLoading(true);

    axios
      .get<LocationInfoType>(
        `https://outing-planner-api.onrender.com/recommendations/${zip}`
      )
      .then(res => {
        setDateIdeas(res.data.businesses);
        // res.data comes in this form:
        // {
        // 	businesses: array with location type shape,
        // 	region: {...}
        // 	total: ...
        // }
        setFilteredDateIdeas(
          pickRandomArrayItems<BusinessType>(res.data.businesses, 3)
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
          isZipInvalid={zipError}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          zip={zip}
          isLoading={isLoading}
        />
      </BaseContainer>
      {filteredDateIdeas.length ? (
        <BaseContainer>
          <Reccomendations
            isLoading={isLoading}
            recommendations={filteredDateIdeas}
            dateIdeas={dateIdeas}
            setFilteredDateIdeas={setFilteredDateIdeas}
          />
        </BaseContainer>
      ) : (
        <BaseContainer>
          <Heading>Almost there!</Heading>
          <Text>
            A recommended itinerary will be generated for you after gathering
            some information.
          </Text>
          {isLoading && (
            <HStack>
              <Skeleton height="350px" width="100%" />
              <Skeleton height="350px" width="100%" />
              <Skeleton height="350px" width="100%" />
            </HStack>
          )}
        </BaseContainer>
      )}
      <BaseContainer>
        <CustomMap locations={filteredDateIdeas} />
      </BaseContainer>
    </>
  );
}

export default App;
