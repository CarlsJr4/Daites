import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import React from 'react';

type ZipFormProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  zip: string;
  isLoading: boolean;
};

export default function ZipForm({
  handleSubmit,
  handleChange,
  zip,
  isLoading,
}: ZipFormProps) {
  return (
    <form onSubmit={e => handleSubmit(e)}>
      <FormControl isRequired>
        <FormLabel>Enter your ZIP code</FormLabel>
        <Input value={zip} onChange={e => handleChange(e)} />
        <Button type="submit" mt={3} colorScheme="teal" isLoading={isLoading}>
          Plan my date for me
        </Button>
      </FormControl>
    </form>
  );
}
