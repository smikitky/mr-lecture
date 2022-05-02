import { FC } from 'react';
import styled from 'styled-components';
import _Slide from '../Slide';

const BasicOfBasicMovie: FC = props => {
  return (
    <Slide title="もう一度絵で確認">
      <video src="/images/slime1.mp4" autoPlay muted loop />
    </Slide>
  );
};

const Slide = styled(_Slide)`
  video {
    width: 80%;
  }
`;

export default BasicOfBasicMovie;
