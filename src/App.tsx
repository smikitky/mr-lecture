import React, { useState, WheelEventHandler, CSSProperties } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import slides from './slides';
import SetSizeContext from './utils/SetSizeContext';

const App: React.FC = props => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [slideSize, setSlideSize] = useState('12px');

  const ActiveSlide = slides[slideIndex];
  const name = ActiveSlide.name;

  const next = () => {
    if (slideIndex < slides.length - 1) setSlideIndex(slideIndex + 1);
  };

  const prev = () => {
    if (slideIndex > 0) setSlideIndex(slideIndex - 1);
  };

  const handleWheel: WheelEventHandler = ev => {
    if (ev.deltaY > 0) next();
    if (ev.deltaY < 0) prev();
  };

  return (
    <>
      <GlobalStyle />
      <SetSizeContext.Provider value={setSlideSize}>
        <SlideContainer
          onWheel={handleWheel}
          style={{ '--w': slideSize } as CSSProperties}
        >
          <ActiveSlide />
          <div className="name">{name}</div>
        </SlideContainer>
      </SetSizeContext.Provider>
    </>
  );
};

const SlideContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  background: #222222;

  > .name {
    color: #b13f9a;
    position: absolute;
    right: 0;
    bottom: 0;
  }
`;

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
  }
`;

export default App;
