import React from 'react';
import { LuMoon, LuSun } from 'react-icons/lu';

import { useTheme } from '../../contexts/theme';

export const ColorModeIcon: React.FC = () => {
  const { colorMode } = useTheme();
  return colorMode === 'dark' ? <LuMoon /> : <LuSun />;
};
