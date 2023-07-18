import {
  Card,
  CardBody,
  Text,
  Image,
  Stack,
  StackDivider,
  Heading,
  Badge,
  Box,
  HStack,
  SkeletonCircle,
} from '@chakra-ui/react';
import LocationInfoType, { BusinessType } from '../types/locationType';

export default function DateCard({
  item,
  index,
}: {
  item: BusinessType;
  index: number;
}) {
  return (
    <Card h="100%" key={item.id}>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <HStack spacing="20px">
            <Image
              borderRadius="full"
              boxSize="150px"
              objectFit="cover"
              src={item.image_url}
              fallback={<SkeletonCircle h="150px" w="150px" />}
            />
            <Heading size="md">
              {index + 1}. {item.name}{' '}
              <Box>
                <Badge colorScheme="green">Sightseeing</Badge>
              </Box>
            </Heading>
          </HStack>
          <Text>Take a stroll around {item.name}.</Text>
          <Heading size="xs" textTransform="uppercase">
            Extra Info
          </Heading>
          <Box>
            {item.location.display_address.map((item, i) => (
              <Text key={i}>{item}</Text>
            ))}
            <Text>{item.display_phone}</Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}
