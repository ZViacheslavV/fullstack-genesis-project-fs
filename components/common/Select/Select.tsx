'use client';

import Select, { SingleValue } from 'react-select';
import {
  genderOptions,
  GenderOption,
  genderSelectStyles,
} from '../../profile/OnboardingForm/OnboardingContent';

type Props = {
  value: 'boy' | 'girl' | 'unknown' | null;
  onChange: (value: 'boy' | 'girl' | 'unknown' | null) => void;
};

function GenderSelect({ value, onChange }: Props) {
  const selectedOption = genderOptions.find((o) => o.value === value) ?? null;

  const handleChange = (option: SingleValue<GenderOption>) => {
    onChange(option ? option.value : null);
  };

  return (
    <Select
      options={genderOptions}
      placeholder="Оберіть стать дитини"
      isSearchable={false}
      styles={genderSelectStyles}
      value={selectedOption} 
      onChange={handleChange}
    />
  );
}

export default GenderSelect;

