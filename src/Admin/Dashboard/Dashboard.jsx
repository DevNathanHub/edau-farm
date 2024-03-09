import { Button, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react'; // Import useEffect for socket connection
import io from 'socket.io-client'; // Import io from socket.io-client

function Dashboard() {
  const [newUser, setNewUser] = useState(null);

  useEffect(() => {
    const socket = io(); // Connect to socket.io server

    // Listen for 'userSignedUp' event
    socket.on('userSignedUp', (data) => {
      console.log('New user signed up:', data.newUser);
      // Perform actions based on the new user data, such as updating the UI
      // Example: Add the new user's information to a list of users
      alert("New User Created");
      setNewUser(data.newUser);
      // Update the UI to display the new user's information
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <div className='component'>
      Dashboard {newUser ? <><Button>View Users</Button></> : null}
      <Tabs>
      <TabList>
        <Tab>Products</Tab>
        <Tab>Users</Tab>
        <Tab>Updates</Tab>
        <Tab>Settings</Tab>

      </TabList>

      <TabPanels>
        <TabPanel>
          <p>Products</p>
        </TabPanel>
        <TabPanel>
          <p>Users</p>
        </TabPanel>
        <TabPanel>
          <p>Updates</p>
        </TabPanel>
        <TabPanel>
          <p>Settings</p>
        </TabPanel>

      </TabPanels>
    </Tabs>
    </div>
  );
}

export default Dashboard;
