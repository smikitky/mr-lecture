import { FC } from 'react';
import styled from 'styled-components';
import _Slide from '../Slide';

const Intermission: FC = props => {
  return (
    <Slide className="black" title="前半戦終了">
      <div className="alert">
        <div className="bang">！</div>
        <big>ここから難しくなります</big>
      </div>
      <p>
        いま励起したスライス<strong>内</strong>で、
        <br />
        <strong>2 次元的に</strong>
        水素原子がどんな分布をしているのか、
        <br />
        どうやって測定するのでしょう?
      </p>
    </Slide>
  );
};

const Slide = styled(_Slide)`
  .bang {
    width: calc(var(--fontSize) * 4);
    height: calc(var(--fontSize) * 4);
    margin: 0 auto;
    text-align: center;
    background: red;
    border-radius: 50%;
    font-size: calc(var(--fontSize) * 3);
  }
`;

export default Intermission;
