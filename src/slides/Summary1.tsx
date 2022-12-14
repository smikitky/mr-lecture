import { FC } from 'react';
import styled from 'styled-components';
import _Slide from '../Slide';
import Katex from '../utils/Katex';

const orig = String.raw`\color{red} \{f_{x,y}\}`;
const freq = String.raw`\color{blue} \{F_{x,y}\}`;

const Summary1: FC = props => {
  return (
    <Slide title="まとめ">
      <ul>
        <li>
          MRIで直接的にスライス内の特定の位置の水素原子量 <Katex>{orig}</Katex>{' '}
          を求めることはできません。
        </li>
        <li>
          <big>
            代わりに、傾斜磁場を使って空間内に波を作ってから、その瞬間の電波の強さを計測することで、
            <strong>
              スライスの中にどんな 2
              次元上の周波数成分（縞模様）が含まれているか
            </strong>{' '}
            <Katex>{freq}</Katex> を、直接測定できます。
          </big>
        </li>
        <li>
          ここから<strong>フーリエ逆変換</strong>で元の画像{' '}
          <Katex>{orig}</Katex> を計算できます。
        </li>
      </ul>
    </Slide>
  );
};

const Slide = styled(_Slide)`
  li {
    margin: 1em 0;
  }
`;

export default Summary1;
