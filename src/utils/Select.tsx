import React from 'react';

const Select: React.FC<{
  value: string;
  options: string[];
  onChange: (value: string) => void;
}> = props => {
  const { value, options, onChange } = props;
  return (
    <select value={value} onChange={ev => onChange(ev.target.value)}>
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
