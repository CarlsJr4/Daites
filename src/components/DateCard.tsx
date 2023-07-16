import {
  Card,
  CardBody,
  Text,
  Image,
  Stack,
  StackDivider,
} from '@chakra-ui/react';
import LocationInfoType from '../types/locationType';

export default function DateCard({ item }: { item: LocationInfoType }) {
  return (
    <Card>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Image boxSize="350px" objectFit="cover" src={item.image_url} />
          <Text>Take a stroll around {item.name}</Text>
        </Stack>
      </CardBody>
    </Card>
  );
}
