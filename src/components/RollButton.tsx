import { Button } from '@chakra-ui/react';
import { BsFillDice6Fill } from 'react-icons/bs';
import pickRandomArrayItems from '../helpers/pickRandomArrayItems';
import BusinessType from '../types/BusinessType';

type rollButtonProps = {
  setFilteredDateIdeas: (value: React.SetStateAction<BusinessType[]>) => void;
  dateIdeas: BusinessType[];
};

export default function RollButton({
  setFilteredDateIdeas,
  dateIdeas,
}: rollButtonProps) {
  return (
    <Button
      onClick={() =>
        setFilteredDateIdeas(pickRandomArrayItems<BusinessType>(dateIdeas, 3))
      }
      alignSelf="baseline"
      leftIcon={<BsFillDice6Fill />}
    >
      Re-roll
    </Button> // Click this button to re-render the date ideas. Since we aren't querying a real API, just use your helper function to re-render the state.
  );
}
