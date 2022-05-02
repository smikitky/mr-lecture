import { FC } from "react";
import styled from "styled-components";
import _Slide from "../Slide";

const BasicOfBasic: FC = (props) => {
  return (
    <Slide title="MRIの原理の基礎の基礎の基礎">
      <ol>
        <li>
          <strong className="coil">静磁場コイル</strong>が作る
          <strong>「強い磁場」</strong>
          の中で、 <strong className="coil">RFコイル</strong>を使い水素原子に
          <strong>「ちょうどいい周波数」</strong>
          の電波を当てると、水素原子が共鳴し、エネルギーを吸収して励起状態となります。
        </li>
        <li>
          この水素原子は、<strong>「しばらくの間」</strong>
          同じ周波数の電波を放出しながら、徐々に元に戻ります。
        </li>
        <li>
          この戻ってくる電波の強さを、<strong className="coil">RFコイル</strong>
          で測定します。
        </li>
        <li>
          このときの電波の強さは元の水素原子の量に比例するので、電波の強さから水素原子の量が測定できます。
        </li>
      </ol>
    </Slide>
  );
};

const Slide = styled(_Slide)`
  // Slide-specific styles go here
`;

export default BasicOfBasic;
