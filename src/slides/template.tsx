import { FC } from 'react';
import styled from 'styled-components';
import _Slide from '../Slide';

const Page: FC = props => {
  return <Slide title="タイトル">内容</Slide>;
};

const Slide = styled(_Slide)`
  // Slide-specific styles go here
`;

export default Page;
