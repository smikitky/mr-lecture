import { FC } from 'react';
import styled from 'styled-components';
import _Slide from '../Slide';

const WeightScale: FC = props => {
  return (
    <Slide title="これだけだと体重計もどきでしかない">
      <ul>
        <li>
          <strong className="coil">静磁場コイル</strong> (1.5T)
          は単なる巨大磁石なので、全身に同時に均一な磁場を浴びせることしかできない。
        </li>

        <li>
          <strong className="coil">RF コイル</strong>
          は単なるアンテナ (?)
          なので、被験者にいっぺんに電波を浴びせたり、全身から返ってくる電波をいっぺんに受信することしかできない。
        </li>
        <li>
          このままでは水素原子の総量に比例した強さの電波を受信することしかできない。
        </li>
      </ul>
      <div className="fig">
        <video src="/images/slime1.mp4" autoPlay muted loop />
        <div className="alert">
          画像を得るためには
          <br />
          <strong>
            「どこにどの程度
            <br />
            水素原子があるのか」
          </strong>
          <br />
          の情報が必要
        </div>
      </div>
    </Slide>
  );
};

const Slide = styled(_Slide)`
  .fig {
    display: flex;
    align-items: center;
    video {
      width: calc(var(--fontSize) * 13);
    }
  }
`;

export default WeightScale;
