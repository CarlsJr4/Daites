import { Heading, SimpleGrid, Text } from '@chakra-ui/react';
import LocationInfoType from '../types/locationType';
import DateCard from './DateCard';
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
  dateIdeas,
  recommendations,
  setFilteredDateIdeas,
}: recommendationsProps) {
  return (
    <>
      <Heading>Your date:</Heading>
      <Text>
        This is a medium effort date that will last approximately 3 hours.
      </Text>
      {recommendations.length > 0 ? (
        <>
          <RollButton
            setFilteredDateIdeas={setFilteredDateIdeas}
            dateIdeas={dateIdeas}
          />
        </>
      ) : (
        ''
      )}
      <SimpleGrid columns={3} spacing={5}>
        {recommendations.map((item, i) => (
          <DateCard key={item.id} index={i} item={item} />
        ))}
      </SimpleGrid>
    </>
  );
}
