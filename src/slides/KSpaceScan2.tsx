import { FC } from 'react';
import styled from 'styled-components';
import _Slide from '../Slide';

const KSpaceScan2: FC = props => {
  return (
    <Slide title="これで何がわかるか">
      <ul>
        <li>
          「サインカーブと水素密度の積（合成波）」の強さを、いろんな波を作りながら測定してプロットしました。絵にするとこんな感じ。
          <br />
          <img src="/images/kspace.png" alt="" />
        </li>
        <li>
          これが、とりもなおさず、
          <strong>「画像そのものを得た」ことに他なりません</strong>
          。「フーリエ逆変換」という操作を行うと元の画像が作れます。なぜそうなるのかを今から説明します。
        </li>
      </ul>
    </Slide>
  );
};

const Slide = styled(_Slide)`
  img {
    width: calc(var(--fontSize) * 30);
  }
`;

export default KSpaceScan2;
