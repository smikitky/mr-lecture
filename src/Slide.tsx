import classNames from 'classnames';
import { ReactNode, useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import SetSizeContext from './utils/SetSizeContext';

const Slide: React.FC<{
  className?: string;
  title?: ReactNode;
  children: ReactNode;
}> = props => {
  const { children, title, className = '' } = props;
  const divRef = useRef<HTMLDivElement>(null);
  const setSlideSize = useContext(SetSizeContext);

  useEffect(() => {
    const cb: ResizeObserverCallback = entries => {
      setSlideSize(entries[0].contentRect.width + 'px');
    };
    const observer = new ResizeObserver(cb);
    observer.observe(divRef.current!);
    return () => observer.disconnect();
  }, [setSlideSize]);

  return (
    <StyledDiv className={classNames(className)} ref={divRef}>
      {title && <h1>{title}</h1>}
      <div className="slide-content">{children}</div>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  aspect-ratio: 640/480;
  @media (min-aspect-ratio: 4/3) {
    height: 100vh;
  }
  @media (max-aspect-ratio: 4/3) {
    width: 100vw;
  }

  --fontSize: calc(var(--w) * 0.03);
  --primary: #b13f9a;

  font-size: var(--fontSize);
  background: white;
  overflow: hidden;
  position: relative;

  h1 {
    color: var(--primary);
    padding: calc(var(--fontSize) * 0.4) calc(var(--fontSize) * 2);
    background: #eeeeee;
    font-size: 130%;
    margin: 0;
  }

  ul,
  ol {
    margin: 0;
  }

  strong {
    color: var(--primary);
    &.coil {
      color: #ff7500;
      text-shadow: 2px 2px white;
    }
  }

  small {
    font-size: 80%;
  }

  .alert {
    background: #88888844;
    padding: calc(var(--fontSize) * 0.5);
    border-radius: calc(var(--fontSize) * 0.5);
  }

  .text-center {
    text-align: center;
  }

  img {
    object-fit: contain;
  }

  .table {
    border-collapse: collapse;
    td,
    th {
      padding: 0 var(--fontSize);
    }
    th {
      background: var(--primary);
      color: white;
    }
    &.border {
      td, th {
        border: 1px solid violet;
      }
    }
  }

  }

  &.black {
    background-color: black;
    color: white;
  }

  input[type="number"]  {
    height:var(--fontSize);
    font-size: calc(var(--fontSize) * 0.7);
    width: calc(var(--fontSize) * 3);
  }

  input[type='range'] {
    &::-webkit-slider-runnable-track {
      background: silver;
      border-radius: var(--fontSize);
    }
  }

  input[type='checkbox'] {
    width: calc(var(--fontSize) * 0.8);
    height: calc(var(--fontSize) * 0.8);
  }

  label {
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--fontSize);
    gap: calc(var(--fontSize) * 0.2);
    font-size: calc(var(--fontSize) * 0.7);
    user-select: none;
    border: 1px solid gray;
    padding: 0 calc(var(--fontSize) * 0.2);
  }

  button {
    display: block;
    font-size: calc(var(--fontSize) * 0.7);
    height: var(--fontSize);
    background: white;
    &:hover {
      background: #eeeeee;
    }
    border: 1px solid gray;
  }

  .original {
    color: red;
  }

  .transformed {
    color: blue;
  }

  display: flex;
  flex-flow: column;

  .slide-content {
    flex: 1 1 auto;
    padding: calc(var(--fontSize) * 1);
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }

  .h-flex {
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export default Slide;
