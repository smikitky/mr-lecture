import { FC } from 'react';
import styled from 'styled-components';
import _Slide from '../Slide';
import Wave1dFig from '../figures/Wave1d';

const Wave1D: FC = props => {
  return (
    <Slide title="ウェーブ">
      <ul>
        <li>
          水素原子を普通に励起すると同じ位相・周波数で一斉に電波を返します。
          しかし水素原子には、磁場が高いと
          <strong>頑張る（少し速くなる）</strong>性質があります。
        </li>
      </ul>
      <div className="fig">
        <Wave1dFig />
      </div>
    </Slide>
  );
};

const Slide = styled(_Slide)`
  .fig {
    height: calc(var(--fontSize) * 15);
    width: 100%;
  }
`;

export default Wave1D;
