import { FC } from 'react';
import styled from 'styled-components';
import _Slide from '../Slide';

const Part2Intro: FC = props => {
  return (
    <Slide title="後半戦">
      <p>
        ここから先は、「スライス選択傾斜磁場」を使って、被験者の 1
        スライスの水素原子だけが励起できた状態から考えます。
      </p>
      <div className="h-flex">
        <img src="/images/t2wi.jpg" alt="" />
        <span className="arrow">→</span>
        <img src="/images/t2wi-proton.jpg" alt="" />
      </div>
      <p>このスライス以外から信号は返ってこないので考えなくて構いません。</p>
    </Slide>
  );
};

const Slide = styled(_Slide)`
  img {
    width: calc(var(--fontSize) * 10);
  }
  .arrow {
    color: var(--primary);
    font-size: calc(var(--fontSize) * 3);
    margin: 0 var(--fontSize);
  }
`;

export default Part2Intro;
