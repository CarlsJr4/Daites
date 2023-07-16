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
import RollButton from './RollButton';

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
        <RollButton
          setFilteredDateIdeas={setFilteredDateIdeas}
          dateIdeas={dateIdeas}
        />
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
