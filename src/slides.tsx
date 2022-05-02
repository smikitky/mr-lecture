import { FC } from 'react';
import Intro from './slides/Intro';
import Title from './slides/Title';
import ThreeCoils from './slides/ThreeCoils';
import BasicOfBasic from './slides/BasicOfBasic';
import BasicOfBasicMovie from './slides/BasicOfBasicMovie';
import Larmor from './slides/Larmor';
import WeightScale from './slides/WeightScale';
import GradientCoilIntro from './slides/GradientCoilIntro';
import FourierCalc from './slides/FourierCalc';

const slides: FC[] = [
  Title,
  Intro,
  ThreeCoils,
  BasicOfBasic,
  BasicOfBasicMovie,
  Larmor,
  WeightScale,
  GradientCoilIntro,
  FourierCalc
];

export default slides;
