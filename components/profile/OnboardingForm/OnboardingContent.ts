export  const  selectStyles = {
  control: (base: any) => ({
    ...base,
    fontSize: '16px',
    fontFamily: 'inherit',
    background: 'var(--opacity-neutral-darkest-5)',
    border: '2px solid var(--opacity-transparent)',
    borderRadius: '12px',
    padding: '0 12px',
    width: '100%',
    minHeight: '37px',
    height: '37px',

    boxShadow: 'none',
    transition: 'border-color 0.3s',
  }),

  valueContainer: (base: any) => ({
    ...base,
    padding: 0,
  }),

  placeholder: (base: any) => ({
    ...base,
    color: '#333',
  }),

  singleValue: (base: any) => ({
    ...base,
    color: '#333',
  }),

  indicatorSeparator: () => ({
    display: 'none',
  }),

  dropdownIndicator: (base: any) => ({
    ...base,
    padding: 0,
  }),

  menu: (base: any) => ({
    ...base,
    width: '100%',
    borderRadius: '12px',
    marginTop: 0,
    overflow: 'hidden',
    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
  }),

  option: (base: any, state: any) => ({
    ...base,
    padding: '12px 16px',
    cursor: 'pointer',
    transition: 'background 0.15s',
    color: '#333',
    backgroundColor: state.isSelected
      ? '#e6e6e6'
      : state.isFocused
        ? '#f2f2f2'
        : '#fff',
  }),
};


export const genderOptions = [
  { value: 'boy', label: 'Хлопчик' },
  { value: 'girl', label: 'Дівчинка' },
  { value: 'unknown', label: 'Ще не знаю' },
];
