import React, {
  useState,
  WheelEventHandler,
  CSSProperties,
  useRef
} from 'react';
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
import {
  createPreloadManager,
  PreloadManager,
  PreloadManagerContext,
  usePreloadManager
} from './utils/PreloadManager';

const Switch: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const preloadManager = usePreloadManager();
  const [slideSize, setSlideSize] = useState('12px');

  const parseCurrentSlideIndex = () => Number(location.pathname.slice(1)) || 1;

  const startPreload = (index: number) => {
    const str = slides[index]?.toString() ?? '';
    const matches = Array.from(
      str.matchAll(/\/images\/(.+?)\.(png|jpg|mp4)/g)
    ).map(s => s[0]);
    if (matches.length > 0) preloadManager.preload(matches);
  };

  const next = () => {
    const currentSlideIndex = parseCurrentSlideIndex();
    if (currentSlideIndex < slides.length) {
      navigate(`/${currentSlideIndex + 1}`);
      startPreload(currentSlideIndex + 1);
    }
  };

  const prev = () => {
    const currentSlideIndex = parseCurrentSlideIndex();
    if (currentSlideIndex > 1) navigate(`/${currentSlideIndex - 1}`);
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
  const preloadManager = useRef<PreloadManager | null>(null);
  if (preloadManager.current === null) {
    preloadManager.current = createPreloadManager();
  }

  return (
    <PreloadManagerContext.Provider value={preloadManager.current}>
      <GlobalStyle />
      <BrowserRouter>
        <Switch />
      </BrowserRouter>
    </PreloadManagerContext.Provider>
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
