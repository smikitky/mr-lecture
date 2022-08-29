import { FC } from 'react';
import styled from 'styled-components';
import _Slide from '../Slide';

const Wave: FC = props => {
  return (
    <Slide title="ウェーブ">
      <video src="/images/wave.mp4" autoPlay muted loop />
    </Slide>
  );
};

const Slide = styled(_Slide)`
  video {
    width: calc(var(--fontSize) * 27);
  }
`;

export default Wave;
