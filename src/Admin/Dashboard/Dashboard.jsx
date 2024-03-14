import React, {  useEffect } from 'react';
import io from 'socket.io-client';
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';

//import ProductManagement from '../Products/ProductManagement';
import OrderManagement from '../Orders/OrderManagement';
import Notifications from '../Updates/Notifications';
import ProductsTable from '../Products/ProductsTable';
import UsersTable from '../Users/UsersTable';

function Dashboard() {

  useEffect(() => {
    const socket = io();

    socket.on('userSignedUp', (data) => {
      console.log('New user signed up:', data.newUser);
      alert('New User Created');
    });

    return () => {
      socket.disconnect();
    };
  }, []);


  return (
    <div className="component">
      Dashboard
      <Tabs  >
        <TabList>
          <Tab>Products</Tab>
          <Tab>Users</Tab>
          <Tab>Orders</Tab>
          <Tab>Updates</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <ProductsTable/>
          </TabPanel>
          <TabPanel>
            <UsersTable/>
          </TabPanel>
          <TabPanel>
            <OrderManagement/>
          </TabPanel>
          <TabPanel>
            <Notifications/>
          </TabPanel>
        </TabPanels>
      </Tabs>

    </div>
  );
}

export default Dashboard;
