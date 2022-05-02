import { FC } from 'react';
import styled from 'styled-components';
import _Slide from '../Slide';
import Katex from '../utils/Katex';

const Larmor: FC = props => {
  return (
    <Slide title="ちょうどいい周波数 = ラーモア周波数">
      <ul>
        <li>
          水素原子が静磁場 (<Katex>B_0</Katex>)
          内で電波を受けて励起されるための、ちょうどいい周波数のことを「
          <strong>ラーモア周波数</strong> (<Katex>\omega_0</Katex>
          )」と呼びます。
        </li>
        <li>
          単に静磁場の強さに比例している、決まり切った数です。
          <div className="alert text-center">
            <Katex>\omega_0 = \gamma B_0</Katex>
          </div>
        </li>
        <li>
          この周波数から少しでもずれたら、水素原子は<strong>共鳴しない</strong>
          ので励起されません。（あとの説明で重要）
        </li>
        <li>FMラジオの周波数に近いのでこの電波を「ラジオ波」とも呼びます。</li>
      </ul>
      <table>
        <tbody>
          <tr>
            <td>
              静磁場 (<Katex>B_0</Katex>)
            </td>
            <td>1.5T</td>
            <td>3.0T</td>
          </tr>
          <tr>
            <td>
              ラーモア周波数 (<Katex>\omega_0</Katex>)
            </td>
            <td>63.9 MHz</td>
            <td>127.8 MHz</td>
          </tr>
        </tbody>
      </table>
    </Slide>
  );
};

const Slide = styled(_Slide)`
  td {
    padding: 0 var(--fontSize);
    background: var(--highlight);
    &:nth-child(1) {
      background: var(--primary);
      color: white;
    }
  }
`;

export default Larmor;
