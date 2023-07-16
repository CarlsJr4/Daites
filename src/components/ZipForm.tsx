import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
} from '@chakra-ui/react';
import React from 'react';

type ZipFormProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  zip: string;
  isLoading: boolean;
  isZipInvalid: boolean;
};

export default function ZipForm({
  handleSubmit,
  handleChange,
  zip,
  isLoading,
  isZipInvalid,
}: ZipFormProps) {
  return (
    <form onSubmit={e => handleSubmit(e)}>
      <FormControl isRequired isInvalid={isZipInvalid}>
        <FormLabel>Enter your ZIP code</FormLabel>
        <Input value={zip} onChange={e => handleChange(e)} />
        <FormErrorMessage>
          Please enter a valid, 5-digit ZIP code.
        </FormErrorMessage>
        <Button type="submit" mt={3} colorScheme="teal" isLoading={isLoading}>
          Plan my date for me
        </Button>
      </FormControl>
    </form>
  );
}
