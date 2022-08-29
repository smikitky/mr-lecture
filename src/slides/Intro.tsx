import { FC } from 'react';
import _Slide from '../Slide';
import styled from 'styled-components';

const Intro: FC = props => {
  return (
    <Slide title="はじめに">
      <ul>
        <li>
          できるだけ直感的に「どうして MRI では磁石の中に入ったら絵ができるの?」
          <strong>だけ</strong>、わかった気になりましょう。
          <br />
          <small>MRI の原理をまったく覚えなかった人向け。</small>
        </li>
        <li>
          「スピン」「90 度パルス」「T1/T2
          緩和時間」とかの非常に重要な概念は時間がないので
          <strong>話しません</strong>。
          <br />
          <small>読影するだけなら緩和時間の知識の方が重要です。</small>
        </li>

        <li>大学レベルの物理学の知識は出ません（自分ができません）。</li>
      </ul>
    </Slide>
  );
};

const Slide = styled(_Slide)`
  li {
    padding: var(--fontSize) 0;
  }
`;

export default Intro;
