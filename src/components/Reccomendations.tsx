import {
  Heading,
  HStack,
  Skeleton,
  SimpleGrid,
  Button,
} from '@chakra-ui/react';
import LocationInfoType from '../types/locationType';
import DateCard from './DateCard';
import { BsFillDice6Fill } from 'react-icons/bs';
import pickRandomArrayItems from '../helpers/pickRandomArrayItems';

type recommendationsProps = {
  isLoading: boolean;
  recommendations: LocationInfoType[];
  dateIdeas: LocationInfoType[];
  setFilteredDateIdeas: (
    value: React.SetStateAction<LocationInfoType[]>
  ) => void;
};

export default function Reccomendations({
  isLoading,
  dateIdeas,
  recommendations,
  setFilteredDateIdeas,
}: recommendationsProps) {
  return (
    <>
      <Heading>Your date:</Heading>
      {recommendations.length > 0 ? (
        <Button
          onClick={() =>
            setFilteredDateIdeas(
              pickRandomArrayItems<LocationInfoType>(dateIdeas, 2)
            )
          }
          alignSelf="baseline"
          leftIcon={<BsFillDice6Fill />}
        >
          Re-roll
        </Button> // Click this button to re-render the date ideas. Since we aren't querying a real API, just use your helper function to re-render the state.
      ) : (
        ''
      )}
      {isLoading && (
        <HStack>
          <Skeleton height="500px" width="100%" />
          <Skeleton height="500px" width="100%" />
          <Skeleton height="500px" width="100%" />
        </HStack>
      )}
      <SimpleGrid columns={3} spacing={5}>
        {recommendations.map((item, i) => (
          <DateCard key={item.id} index={i} item={item} />
        ))}
      </SimpleGrid>
    </>
  );
}
