import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Box,
  Text,
  Image,
  Skeleton,
  HStack,
} from '@chakra-ui/react';

import axios from 'axios';
import { useState } from 'react';

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

type LocationInfoType = {
  id: string;
  name: string;
  location: {
    display_address: string[];
  };
  url: string;
  is_closed: boolean;
  image_url: string;
};

function App() {
  const [zip, setZip] = useState('');
  const [dateIdeas, setDateIdeas] = useState([] as LocationInfoType[]);
  const [recommendations, setReccomendations] = useState(
    [] as LocationInfoType[]
  );
  const [isLoading, setLoading] = useState(false);

  // MVP task 1: Input ZIP code - 3 places to walk around from the fake JSON

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

    // Pick 3 random locations from the ideas ideas array
    // Render them on screen

    return;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZip(e.target.value);
  };

  return (
    <>
      <Flex
        flexDirection="column"
        borderWidth="2px"
        borderRadius="lg"
        m={12}
        p={5}
        gap={5}
      >
        <Heading>You: What do you want to do tonight?</Heading>
        <Heading>Your SO: Hmmmmm, IDK. You choose.</Heading>
        <Heading>You:</Heading>
        <form onSubmit={e => handleSubmit(e)}>
          <FormControl isRequired>
            <FormLabel>Enter your ZIP code</FormLabel>
            <Input value={zip} onChange={e => handleChange(e)} />
            <Button
              type="submit"
              mt={3}
              colorScheme="teal"
              isLoading={isLoading}
            >
              Plan my date for me
            </Button>
          </FormControl>
        </form>
      </Flex>
      <Flex
        flexDirection="column"
        borderWidth="2px"
        borderRadius="lg"
        m={12}
        p={5}
        gap={5}
      >
        <Heading>Your date:</Heading>
        {isLoading && (
          <HStack>
            <Skeleton height="200px" width="100%" />
            <Skeleton height="200px" width="100%" />
            <Skeleton height="200px" width="100%" />
          </HStack>
        )}
        <Flex gap={12}>
          {recommendations.map((item, i) => (
            <Box key={item.id}>
              <Image boxSize="250px" src={item.image_url} />
              <Text mt={5}>Take a stroll around {item.name}</Text>
              {i + 1 < recommendations.length ? <Text>then...</Text> : ''}
            </Box>
          ))}
        </Flex>
      </Flex>
    </>
  );
}

export default App;
