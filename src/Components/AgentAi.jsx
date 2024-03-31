import React, { useState } from 'react';
import { IconButton, useColorMode, Box } from '@chakra-ui/react';
import { ChatIcon, CloseIcon } from '@chakra-ui/icons';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

function ChatToggleButton() {
  const [showChat, setShowChat] = useState(false);
  const [loading, setLoading] = useState(false);
  const { colorMode } = useColorMode();

  const toggleChat = () => {
    if (!showChat) {
      setLoading(true); // Set loading to true when opening the chat
    } else {
      setLoading(false); // Set loading to false when closing the chat
    }
    setShowChat(!showChat); // Toggle the showChat state
  };
  

  // Function to handle iframe load event
  const handleLoad = () => {
    setLoading(false); // Set loading to false when iframe has loaded
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '999' }}>
      <IconButton
        icon={loading ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /> : (showChat ? <CloseIcon /> : <ChatIcon />)}
        onClick={toggleChat}
        aria-label="Toggle Chat"
        size="lg"
        colorScheme="blue"
        mt='20px'
        borderRadius='50%'
      />
      {showChat && (
        <Box
          as="iframe"
          src="https://embed.fixie.ai/agents/09b975a3-b172-40a5-8591-8b412465a66d?debug=1"
          allow="clipboard-write"
          width="400px"
          height="500px"
          border="none"
          position="fixed"
          bottom="70px"
          right="20px"
          zIndex="999"
          borderRadius="lg"
          boxShadow={colorMode === 'dark' ? 'dark-lg' : 'lg'}
          onLoad={handleLoad} // Handle iframe load event
          marginBottom='10px'
        />
      )}
    </div>
  );
}

export default ChatToggleButton;
