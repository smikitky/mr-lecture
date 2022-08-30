import React, { useState, WheelEventHandler, CSSProperties } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import slides from './slides';
import SetSizeContext from './utils/SetSizeContext';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate
} from 'react-router-dom';

const Switch: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [slideSize, setSlideSize] = useState('12px');

  const next = () => {
    const currentSlideIndex = Number(location.pathname.slice(1)) || 1;
    if (currentSlideIndex < slides.length) {
      navigate(`/${currentSlideIndex + 1}`);
    }
  };

  const prev = () => {
    const currentSlideIndex = Number(location.pathname.slice(1));
    if (currentSlideIndex > 1) {
      navigate(`/${currentSlideIndex - 1}`);
    }
  };

  const handleWheel: WheelEventHandler = ev => {
    if (ev.deltaY > 0) next();
    if (ev.deltaY < 0) prev();
  };

  const Title = slides[0];

  return (
    <SetSizeContext.Provider value={setSlideSize}>
      <SlideContainer
        onWheel={handleWheel}
        style={{ '--w': slideSize } as CSSProperties}
      >
        <Routes>
          <Route index element={<Title />} />
          {slides.map((Slide, i) => {
            return <Route key={i} path={String(i + 1)} element={<Slide />} />;
          })}
        </Routes>
      </SlideContainer>
    </SetSizeContext.Provider>
  );
};

const App: React.FC = props => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Switch />
    </BrowserRouter>
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
