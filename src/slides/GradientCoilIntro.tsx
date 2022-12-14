import { FC } from 'react';
import styled from 'styled-components';
import _Slide from '../Slide';

const GradientCoilIntro: FC = props => {
  return (
    <Slide title="そこで第3の部品が登場">
      <ul>
        <li>
          <strong className="coil">傾斜磁場コイル</strong>
          ：静磁場にちょっとだけ空間方向の<strong>傾斜</strong>
          （強さの勾配） をかける装置。
        </li>
        <li>
          その正体は3方向に組み合わさった電磁石。
          <ul>
            <li>
              体軸方向、前後方向、左右方向、いずれの方向にも傾斜をかけられる
            </li>
            <li>ということは斜め方向にも任意の強さの傾斜をかけられる</li>
          </ul>
        </li>
      </ul>
      <img
        src="/images/gradient-coil-structure.png"
        alt=""
        style={{ width: '80%' }}
      />
    </Slide>
  );
};

const Slide = styled(_Slide)`
  // Slide-specific styles go here
`;

export default GradientCoilIntro;
