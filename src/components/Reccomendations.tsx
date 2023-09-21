import { Heading, SimpleGrid } from '@chakra-ui/react';
import BusinessType from '../types/BusinessType';
import DateCard from './DateCard';
import RollButton from './RollButton';

type recommendationsProps = {
  isLoading: boolean;
  recommendations: BusinessType[];
  dateIdeas: BusinessType[];
  setFilteredDateIdeas: (value: React.SetStateAction<BusinessType[]>) => void;
};

export default function Reccomendations({
  dateIdeas,
  recommendations,
  setFilteredDateIdeas,
}: recommendationsProps) {
  return (
    <>
      <Heading>Your date:</Heading>
      {/* <Text>
        This is a medium effort date that will last around{' '}
        {recommendations.length} hours (excluding driving).
      </Text> */}
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
      <SimpleGrid columns={[1, 1, 3]} spacing={5}>
        {recommendations.map((item, i) => (
          <DateCard key={item.id} index={i} item={item} />
        ))}
      </SimpleGrid>
    </>
  );
}
