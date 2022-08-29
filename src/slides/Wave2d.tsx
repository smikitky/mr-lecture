import { FC } from 'react';
import styled from 'styled-components';
import _Slide from '../Slide';
import Wave2dFig from '../figures/Wave2d';

const Wave2D: FC = props => {
  return (
    <Slide title="2次元のウェーブ">
      <div className="fig">
        <Wave2dFig />
      </div>
    </Slide>
  );
};

const Slide = styled(_Slide)`
  .fig {
    width: 100%;
    --gridSize: var(--fontSize);
  }
`;

export default Wave2D;
