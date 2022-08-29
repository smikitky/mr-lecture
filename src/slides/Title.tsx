import { FC } from 'react';
import _Slide from '../Slide';
import styled from 'styled-components';

const Title: FC = props => {
  return (
    <Slide className="black">
      <div>レジデントセミナー</div>
      <img src="/images/title.png" alt="MRI画像のなりたち" />
      <div>放射線科 三木聡一郎</div>
    </Slide>
  );
};

const Slide = styled(_Slide)`
  img {
    width: calc(var(--fontSize) * 25);
  }
`;

export default Title;
