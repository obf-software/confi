import { Box, BoxProps } from '@chakra-ui/react';
import React from 'react';

import { useIntersectionAnimation } from '../hooks/use-scroll-animations';

export interface AnimatedSectionProps extends BoxProps {
  animation?: 'slideInUp' | 'slideInLeft' | 'slideInRight' | 'scaleIn' | 'fadeInUp';
  delay?: number;
  threshold?: number;
  children: React.ReactNode;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  animation = 'slideInUp',
  delay = 0,
  threshold = 0.1,
  children,
  ...boxProps
}) => {
  const { ref, isVisible } = useIntersectionAnimation({
    threshold,
    triggerOnce: true,
  });

  const animationName = delay > 0 ? `${animation}Delay${Math.min(delay, 3)}` : animation;

  return (
    <Box
      ref={ref}
      opacity={isVisible ? 1 : 0}
      transform={
        !isVisible
          ? animation === 'slideInUp'
            ? 'translateY(40px)'
            : animation === 'slideInLeft'
            ? 'translateX(-40px)'
            : animation === 'slideInRight'
            ? 'translateX(40px)'
            : animation === 'scaleIn'
            ? 'scale(0.8)'
            : 'translateY(30px)'
          : 'none'
      }
      animation={isVisible ? animationName : undefined}
      transition='opacity 0.6s ease-out, transform 0.6s ease-out'
      {...boxProps}
    >
      {children}
    </Box>
  );
};

export interface GlassCardProps extends BoxProps {
  children: React.ReactNode;
  intensity?: 'low' | 'medium' | 'high';
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  intensity = 'medium',
  ...boxProps
}) => {
  const getOpacity = () => {
    switch (intensity) {
      case 'low': return '0.05';
      case 'high': return '0.15';
      default: return '0.1';
    }
  };

  return (
    <Box
      bg='glass.bg'
      backdropFilter='blur(16px)'
      borderWidth='1px'
      borderColor='glass.border'
      borderRadius='xl'
      boxShadow='glass.shadow'
      p='6'
      position='relative'
      overflow='hidden'
      _before={{
        content: '""',
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        height: '1px',
        bg: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
      }}
      {...boxProps}
    >
      {children}
    </Box>
  );
};

export interface ParallaxBoxProps extends BoxProps {
  speed?: number;
  children: React.ReactNode;
}

export const ParallaxBox: React.FC<ParallaxBoxProps> = ({
  speed = 0.5,
  children,
  ...boxProps
}) => {
  const [offsetY, setOffsetY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <Box
      transform={`translateY(${offsetY}px)`}
      transition='transform 0.1s ease-out'
      {...boxProps}
    >
      {children}
    </Box>
  );
};