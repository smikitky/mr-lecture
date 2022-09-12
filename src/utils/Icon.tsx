import { FC } from 'react';
import classNames from 'classnames';
import styled from 'styled-components';

const Icon: FC<{ icon: string; className?: string }> = props => {
  const { icon, className } = props;
  return (
    <StyledSpan className={classNames('material-symbols-rounded', className)}>
      {icon}
    </StyledSpan>
  );
};

const StyledSpan = styled.span`
  font-size: 100%;
  vertical-align: middle;
`;

export default Icon;
