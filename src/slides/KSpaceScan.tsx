import { FC } from 'react';
import styled from 'styled-components';
import _Slide from '../Slide';
import Wave2dFig from '../figures/Wave2d';

const KSpaceScan: FC = props => {
  return (
    <Slide title="さらに">
      <ul>
        <li>
          傾斜磁場を細かく調整しながらいろいろな（空間上の）波を作り、信号強度を取得していきます。
        </li>
        <li>1回の励起で数百回～数十万回（目的による）の信号取得を行います。</li>
      </ul>
      <div className="fig">
        <Wave2dFig />
      </div>
    </Slide>
  );
};

const Slide = styled(_Slide)`
  .fig {
    width: 100%;
    --gridSize: calc(var(--fontSize) * 0.7);
  }
`;

export default KSpaceScan;
