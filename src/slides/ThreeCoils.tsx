import { FC } from 'react';
import _Slide from '../Slide';
import styled from 'styled-components';

const ThreeCoils: FC = props => {
  return (
    <Slide title="MRIの主要構成部品3つ">
      <table className="table border">
        <tbody>
          <tr>
            <th>
              <strong className="coil">静磁場コイル</strong>
              <br />
              <small>（大きい電磁石）</small>
            </th>
            <td>
              <ul>
                <li>1.5 ～ 3 テスラくらい</li>
                <li>強くて均一な静磁場をひたすら維持する超伝導の電磁石</li>
              </ul>
            </td>
            <td>
              <img src="/images/static-coil.jpg" alt="" />
            </td>
          </tr>
          <tr>
            <th>
              <strong className="coil">傾斜磁場コイル</strong>
              <br />
              <small>（小さい電磁石）</small>
            </th>
            <td>
              <ul>
                <li>0.001 テスラくらい</li>
                <li>静磁場をちょっとだけ不均一にする</li>
                <li>本日の主役ですがちょっと後で説明します</li>
              </ul>
            </td>
            <td>
              <img src="/images/gradient-coil.jpg" alt="" />
            </td>
          </tr>
          <tr>
            <th>
              <strong className="coil">RFコイル</strong>
              <br />
              <small>（アンテナもどき）</small>
            </th>
            <td>
              <ul>
                <li>0.000001 テスラくらい</li>
                <li>体に密接させて電磁波を送受信する（アンテナ役）</li>
              </ul>
            </td>
            <td>
              <img src="/images/rf-coil.jpg" alt="" />
            </td>
          </tr>
        </tbody>
      </table>
      <div>※結局全部「コイル」</div>
    </Slide>
  );
};

const Slide = styled(_Slide)`
  th {
    width: calc(var(--fontSize) * 10);
    &:first-line {
      color: var(--primary);
    }
  }
  td:nth-child(2) {
    font-size: 80%;
  }
  td:nth-child(3) {
    img {
      width: calc(var(--fontSize) * 5);
      height: calc(var(--fontSize) * 5);
    }
  }
`;

export default ThreeCoils;
