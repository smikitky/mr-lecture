import { FC } from 'react';
import styled from 'styled-components';
import _Slide from '../Slide';

const Summary3: FC = props => {
  return (
    <Slide title="終わりに">
      <ul>
        <li>
          コイルの組み合わせだけで人間の体内が見える仕組みについて、大ざっぱに説明しました。
        </li>
        <li>
          フーリエ変換は以下の URL で試せます
          <br />
          <a
            href="https://mri-smikitky.netlify.app/"
            target="_blank"
            rel="noreferrer"
          >
            https://mri-smikitky.netlify.app/
          </a>
        </li>
        <li>
          短時間でまとめるためにかなりいい加減な議論をしているので、気になったら
          MRI の原理の本を読みましょう。
        </li>
      </ul>
    </Slide>
  );
};

const Slide = styled(_Slide)`
  // Slide-specific styles go here
`;

export default Summary3;
