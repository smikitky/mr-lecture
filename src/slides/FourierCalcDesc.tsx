import { FC } from 'react';
import styled from 'styled-components';
import _Slide from '../Slide';
import Katex from '../utils/Katex';
import { fft, fk, Fk, ifft } from './FourierCalc';

const FourierCalcDesc: FC = props => {
  return (
    <Slide title="それの何が嬉しいの？">
      <div className="h-flex">
        <div className="alert small-math">
          <Katex>{fft}</Katex>
        </div>
        <span>&ensp;↔️&ensp;</span>
        <div className="alert small-math">
          <Katex>{ifft}</Katex>
        </div>
      </div>
      <img src="/images/fft.png" alt="fft" />
      <ul>
        <li>
          <Katex>{fk}</Katex> から「フーリエ変換」して得られた{' '}
          <Katex>{Fk}</Katex> には、「
          <strong>もとの数列に含まれているいろいろなサインカーブの強さ</strong>
          」が含まれています。
          <br />
          <small>
            数式の形が <Katex>{fk}</Katex>{' '}
            と「いろいろなサインカーブ」の積なので、なんとなく納得できる
          </small>
        </li>
      </ul>
    </Slide>
  );
};

const Slide = styled(_Slide)`
  .alert {
    padding: 0.1em;
  }
  .small-math {
    padding: 1em;
    font-size: 65%;
  }
`;

export default FourierCalcDesc;
