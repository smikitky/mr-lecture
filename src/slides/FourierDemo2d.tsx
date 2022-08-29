import { FC } from 'react';
import styled from 'styled-components';
import _Slide from '../Slide';
import FourierImage from '../figures/FourierImage';

const FourierDemo2d: FC = props => {
  return (
    <Slide title="いろんな2次元フーリエ変換">
      <FourierImage />
    </Slide>
  );
};

const Slide = styled(_Slide)`
  // Slide-specific styles go here
`;

export default FourierDemo2d;
