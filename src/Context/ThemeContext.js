import React from 'react';
import { useColorMode, IconButton } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

function ThemeContext() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div>
      <IconButton
        aria-label={colorMode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
        onClick={toggleColorMode}
        size="lg"
        colorScheme="teal"
        variant="ghost"
      />
    </div>
  );
}

export default ThemeContext;
