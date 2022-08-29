import { FC } from 'react';
import styled from 'styled-components';
import _Slide from '../Slide';

const Summary2: FC = props => {
  return (
    <Slide title="これで全部説明しました">
      <ul className="items">
        <div className="item">
          <img src="/images/summary-1.png" alt="" />
          <div className="desc">傾斜磁場で特定スライスのみを励起する</div>
        </div>
        <span>→</span>
        <div className="item">
          <img src="/images/summary-2.png" alt="" />
          <div className="desc">
            傾斜磁場でスライス内の波を作り k 空間を埋めていく
          </div>
        </div>
        <span>→</span>
        <div className="item">
          <img src="/images/summary-3.png" alt="" />
          <div className="desc">フーリエ逆変換で元画像を得る</div>
        </div>
      </ul>
    </Slide>
  );
};

const Slide = styled(_Slide)`
  .items {
    padding: 0;
    display: flex;
    flex-flow: row;
    height: 100%;
    justify-content: center;
    align-items: center;
    gap: calc(var(--fontSize) * 0.2);
    .item {
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: center;
      gap: var(--fontSize);
      img {
        width: calc(var(--fontSize) * 8);
        height: calc(var(--fontSize) * 8);
      }
      .desc {
        text-align: center;
        margin: calc(var(--fontSize) * 0.5);
        font-weight: bolder;
        font-size: 120%;
      }
      width: calc(var(--fontSize) * 9.5);
      height: 100%;
      background: silver;
      border-radius: calc(var(--fontSize) * 0.5);
    }
  }
`;

export default Summary2;
