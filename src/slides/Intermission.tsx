import { FC } from 'react';
import styled from 'styled-components';
import _Slide from '../Slide';

const Intermission: FC = props => {
  return (
    <Slide className="black" title="前半戦終了">
      <p className="alert">
        <div className="bang">！</div>ここから難しくなります
      </p>
      <p>
        いま励起したスライス<strong>内</strong>で <strong>2 次元的に</strong>
        水素原子がどんな分布をしているのか、どうやって測定するのでしょう?
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
