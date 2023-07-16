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
      <Flex gap={12}>
        {recommendations.map((item, i) => (
          <Box key={item.id}>
            <Image boxSize="250px" src={item.image_url} />
            <Text mt={5}>Take a stroll around {item.name}</Text>
            {i + 1 < recommendations.length ? <Text>then...</Text> : ''}
          </Box>
        ))}
      </Flex>
    </>
  );
}
