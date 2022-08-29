import { FC } from 'react';
import styled from 'styled-components';
import _Slide from '../Slide';

const Gradient2: FC = props => {
  return (
    <Slide title="スライス選択磁場">
      <ul>
        <li>
          「傾斜磁場コイル」を使うと、MRI装置内の特定の平面上だけを 1.5 T
          に残し、他の部位をちょっと違う磁場強度（例えば 1.502
          T）に変えてしまえます。
        </li>

        <li>
          こうすれば 63.9
          MHz（ラーモア周波数）の電波を浴びせた場合に励起される水素原子を、
          <strong>特定の平面</strong>に限定できます。
        </li>
      </ul>
      <div>
        <video src="/images/slime3.mp4" autoPlay muted loop />
      </div>
      <p>
        <small>※実際には浴びせる電波の周波数側も少し工夫しています</small>
      </p>
    </Slide>
  );
};

const Slide = styled(_Slide)`
  video {
    width: calc(var(--fontSize) * 12);
  }
`;

export default Gradient2;
