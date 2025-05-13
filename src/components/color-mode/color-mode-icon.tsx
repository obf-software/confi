import React from 'react';
import { LuMoon, LuSun } from 'react-icons/lu';

import { useColorMode } from './hooks';

export const ColorModeIcon: React.FC = () => {
  const { colorMode } = useColorMode();
  return colorMode === 'dark' ? <LuMoon /> : <LuSun />;
};
