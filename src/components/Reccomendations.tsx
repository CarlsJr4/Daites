import { Heading, HStack, Skeleton, SimpleGrid } from '@chakra-ui/react';
import LocationInfoType from '../types/locationType';
import DateCard from './DateCard';

type recommendationsProps = {
  isLoading: boolean;
  recommendations: LocationInfoType[];
};

export default function Reccomendations({
  isLoading,
  recommendations,
}: recommendationsProps) {
  return (
    <>
      <Heading>Your date:</Heading>
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
