import { FC } from 'react';
import styled from 'styled-components';
import _Slide from '../Slide';
import Wave1dFig from '../figures/Wave1d';

const Wave1D: FC = props => {
  return (
    <Slide title="ウェーブ" interactive>
      <ul>
        <li>
          水素原子を励起した瞬間はすべての水素原子は同じ位相・周波数で一斉に電波を返します。
          しかし水素原子には、磁場をラーモア周波数よりわずかに高くすると
          <strong>つられて少し速くなる</strong>性質があります。
        </li>
        <li>
          なので傾斜磁場をかけている間、水素原子の位相がずれていき「波」が生まれます。
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
    height: calc(var(--fontSize) * 10);
    width: 100%;
  }
`;

export default Wave1D;
