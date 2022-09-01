import { FC } from 'react';
import _Slide from '../Slide';
import styled from 'styled-components';

const Title: FC = () => {
  return (
    <Slide className="black">
      <img src="/images/title.png" alt="MRI画像のなりたち" />
      <div>東京大学医学部附属病院 放射線科 三木聡一郎</div>
    </Slide>
  );
};

const Slide = styled(_Slide)`
  img {
    width: calc(var(--fontSize) * 25);
    aspect-ratio: 1024/440;
  }
`;

export default Title;
