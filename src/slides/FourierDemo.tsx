import { FC } from 'react';
import styled from 'styled-components';
import _Slide from '../Slide';
import FourierGraph from '../figures/FourierGraph';

const FourierDemo: FC = props => {
  return (
    <Slide title="本当にそうなっています">
      <FourierGraph />
    </Slide>
  );
};

const Slide = styled(_Slide)`
  // Slide-specific styles go here
`;

export default FourierDemo;
