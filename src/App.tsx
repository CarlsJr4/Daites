import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react';

// Your goal: Create an MVP
//  Input a ZIP code
//  Output data from the Yelp API
// 1 activity, 1 dinner, 1 dessert
// Output data from google maps
// A link that can be sent to your phone

function App() {
  return (
    <Flex
      flexDirection="column"
      borderWidth="2px"
      borderRadius="lg"
      m={12}
      p={5}
      gap={5}
    >
      <Heading>You: What do you want to do tonight?</Heading>
      <Heading>Your GF: Hmmmmm, IDK. You choose.</Heading>
      <Heading>You:</Heading>
      <form
        onSubmit={e => {
          e.preventDefault();
          console.log('foo');
        }}
      >
        <FormControl>
          <FormLabel>Enter your ZIP code</FormLabel>
          <Input />
          <Button type="submit" mt={3} colorScheme="teal">
            Plan my date for me
          </Button>
        </FormControl>
      </form>
    </Flex>
  );
}

export default App;
