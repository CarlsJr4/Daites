import {
  HStack,
  Heading,
  Skeleton,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  FormHelperText,
  FormErrorMessage,
  Checkbox,
  Stack,
} from "@chakra-ui/react";

import axios from "axios";
import { useState } from "react";
import LocationInfoType from "./types/locationType";
import BusinessType from "./types/BusinessType";
import BaseContainer from "./components/BaseContainer";
import ZipForm from "./components/ZipForm";
import Reccomendations from "./components/Reccomendations";
import pickRandomArrayItems from "./helpers/pickRandomArrayItems";
import CustomMap from "./components/CustomMap";
import "./main.css";

function App() {
  // Next MVP: Steps that lead the user into ChatGPT
  // Don't even worry about creating a multi-step form
  // Break things as much as you want, this is a new branch
  // Solve the conflicts another day
  // Focus on MVP right now: Input preferences -> chatGPT returns stuff -> user inputs more stuff -> into Yelp API -> output to app
  // Just have all the form stuff be on one single page
  // Test

  return (
    <>
      <BaseContainer>
        <Heading>Daites</Heading>
        <Text>AI-powered date-planning assistant</Text>
        <form>
          <FormControl isRequired>
            <FormLabel>Enter your ZIP code</FormLabel>
            <Input />
          </FormControl>
          <FormControl isRequired mt={3}>
            <FormLabel>Describe your situation</FormLabel>
            <Textarea placeholder="i.e. My one-month anniversary with my partner is coming up" />
          </FormControl>
          <FormControl mt={3}>
            <FormLabel>
              What are some of you or your partner's interests? (optional)
            </FormLabel>
            <Input placeholder="i.e. anime, skydiving, staying indoors" />
          </FormControl>
          <Button mt={3} colorScheme="teal">
            Next
          </Button>
        </form>
      </BaseContainer>
      <BaseContainer>
        <Text>
          Do any of these ideas sound appealing to you? (select all that apply)
        </Text>
        <Stack spacing={5} direction="row">
          <Checkbox>Eating dinner at a unique restaurant</Checkbox>
          <Checkbox>Grabbing drinks at the bar</Checkbox>
        </Stack>
        <Button mt={3} colorScheme="teal">
          Suggest a date for me
        </Button>
      </BaseContainer>
    </>
  );
}

export default App;
