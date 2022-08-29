import { FC } from 'react';
import styled from 'styled-components';
import _Slide from '../Slide';
import Katex from '../utils/Katex';

const Wave2dDesc: FC = props => {
  return (
    <Slide title="今見たのは何か">
      <ul>
        <li>励起直後、水素原子は同じ位相で 69.3MHz で回転しています。</li>
        <li>
          ここで<strong>スライスに垂直な方向</strong>
          の傾斜磁場をかけてみました。
        </li>
        <li>
          水素原子は励起されている間、自分が浴びる磁場強度が少しだけ変化すると（1.5T
          ± 0.1%くらい）、磁場強度に比例して少しだけ
          <strong>回転速度が変化</strong>します。69.3MHz ± 0.1%くらい。
        </li>
        <li>
          その結果、同時に（同じ位相で）電波を発していた水素原子に、空間上の「波」（サインカーブ）が出現します。
        </li>
        <li>
          すると RF
          コイルは、水素の総量ではなく、互いに位相の違う水素原子から発せられた電波の
          <strong>合成分</strong>を受け取ることになります。位相が 180
          度ずれた水素原子からの信号は打ち消しあいます。
        </li>
        <div className="alert text-center">
          得られる信号強度 = <Katex>\sum</Katex>
          <sub>位置</sub> プロトン密度 × サインカーブ
        </div>
      </ul>
    </Slide>
  );
};

const Slide = styled(_Slide)`
  // Slide-specific styles go here
`;

export default Wave2dDesc;
