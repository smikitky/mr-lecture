import { FC } from 'react';
import styled from 'styled-components';
import _Slide from '../Slide';

const Gradient3: FC = props => {
  return (
    <Slide title="「スライス別水素量計測器」が完成">
      <ul>
        <li>
          特定のスライスだけを励起してから返ってくる信号の強さを受信することで、「そのスライス内の水素原子の総量」を測定することができます。
          <br />
          <small>体重計よりはマシになりました…</small>
        </li>
      </ul>
      <div>
        <video src="/images/slime4.mp4" autoPlay muted loop />
      </div>
      <p>
        <small>※イメージ画像です。実際の商品とは異なります。</small>
      </p>
    </Slide>
  );
};

const Slide = styled(_Slide)`
  video {
    width: calc(var(--fontSize) * 15);
  }
`;

export default Gradient3;
