import { Flex } from '@chakra-ui/react';
import React from 'react';

// Component that wraps things in a rounded flexbox with border
export default function BaseContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex
      flexDirection="column"
      borderWidth="2px"
      borderRadius="lg"
      m={12}
      p={5}
      gap={5}
    >
      {children}
    </Flex>
  );
}
