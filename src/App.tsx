import { HStack, Heading, Skeleton, Text } from '@chakra-ui/react';

import axios from 'axios';
import { useState } from 'react';
import LocationInfoType from './types/locationType';
import BusinessType from './types/BusinessType';
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

    const storedZip = JSON.parse(
      localStorage.getItem('cachedZip') as string
    ) as string | null;

    // Cache Yelp data with local storage to prevent excessive API call use and improve load times.
    if (!storedZip || zip !== storedZip) {
      axios
        .get<LocationInfoType>(
          `https://outing-planner-api.onrender.com/recommendations/${zip}`
        )
        .then(res => {
          setDateIdeas(res.data.businesses);
          localStorage.setItem(
            'cachedRecommendations',
            JSON.stringify(res.data.businesses)
          );
          localStorage.setItem('cachedZip', JSON.stringify(zip));
          setFilteredDateIdeas(
            pickRandomArrayItems<BusinessType>(res.data.businesses, 3)
          );
        })
        .catch(err => console.log(err))
        .finally(() => {
          setLoading(false);
          setZip('');
        });
    } else {
      const cachedRecommendations = JSON.parse(
        localStorage.getItem('cachedRecommendations') as string
      ) as BusinessType[];
      setDateIdeas(cachedRecommendations);
      setFilteredDateIdeas(
        pickRandomArrayItems<BusinessType>(cachedRecommendations, 3)
      );
      setLoading(false);
      setZip('');
    }
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
