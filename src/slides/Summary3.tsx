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
          このスライド（フーリエ変換の実演も含む）は以下の URL
          で見ることができます。
          <a
            className="alert text-center"
            href="https://mri-smikitky.netlify.app/"
            target="_blank"
            rel="noreferrer"
            style={{ fontWeight: 'bold' }}
          >
            https://mri-smikitky.netlify.app/
          </a>
        </li>
        <li>
          短時間でまとめるためにかなりいい加減な議論をしているところもあるので、気になったら真面目な
          MRI の原理の本を読んでください。
        </li>
      </ul>
    </Slide>
  );
};

const Slide = styled(_Slide)`
  li {
    margin: var(--fontSize) 0;
  }
`;

export default Summary3;
