import {
  Heading,
  HStack,
  Skeleton,
  Flex,
  Box,
  Image,
  Text,
} from '@chakra-ui/react';
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
          <Skeleton height="200px" width="100%" />
          <Skeleton height="200px" width="100%" />
          <Skeleton height="200px" width="100%" />
        </HStack>
      )}
      <Flex gap={5}>
        {recommendations.map(item => (
          <Box key={item.id}>
            <DateCard item={item} />
          </Box>
        ))}
      </Flex>
    </>
  );
}
