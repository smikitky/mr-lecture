import katex from 'katex';
import { FC, useMemo } from 'react';

const Katex: FC<{ children: string; displayMode?: boolean }> = props => {
  const { children, displayMode = false } = props;

  const html = useMemo(() => {
    return katex.renderToString(children, { displayMode });
  }, [children, displayMode]);

  return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Katex;
