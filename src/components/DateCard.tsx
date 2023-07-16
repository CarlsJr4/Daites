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
} from '@chakra-ui/react';
import LocationInfoType from '../types/locationType';

export default function DateCard({
  item,
  index,
}: {
  item: LocationInfoType;
  index: number;
}) {
  return (
    <Card h="100%">
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Heading size="md">
            {index + 1}. {item.name}{' '}
            <Box>
              <Badge colorScheme="green">Sightseeing</Badge>
            </Box>
          </Heading>
          <Text>Take a stroll around {item.name}.</Text>
          <Image boxSize="350px" objectFit="cover" src={item.image_url} />
          <Heading size="xs" textTransform="uppercase">
            Extra Info
          </Heading>
          <Box>
            {item.location.display_address.map(item => (
              <Text>{item}</Text>
            ))}
            <Text>{item.display_phone}</Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}
