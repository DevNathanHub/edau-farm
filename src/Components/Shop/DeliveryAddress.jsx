import React, { useState } from 'react';
import { useDeliveryAddress } from '../../Context/deliveryAddressContext';
import { Card, CardBody, CardFooter, Button, Heading, Text, Input, InputGroup, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function DeliveryAddress() {
    const { deliveryAddress, updateDeliveryAddress } = useDeliveryAddress();
    const navigate = useNavigate();
    const [address, setAddress] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        country: '',
        county: '',
        city: '',
        comment: ''
    });
    const [editMode, setEditMode] = useState(!deliveryAddress); // Determine if in edit mode or view mode

    // Update the address
    const handleSubmit = () => {
        updateDeliveryAddress(address);
        setEditMode(false); // Exit edit mode after update
    };

    // Toggle between edit mode and view mode
    const toggleEditMode = () => {
        setEditMode(!editMode);
        if (!editMode) {
            if(deliveryAddress){
                 setAddress(deliveryAddress);
            } else {
                 navigate('/shop');
            }
        } 
    };

    return (
        <div>   
            { deliveryAddress && !editMode ? ( // View mode
                <Card>
                    <Stack>
                        <Text>First Name: {deliveryAddress.firstName}</Text>
                        <Text>Last Name: {deliveryAddress.lastName}</Text>
                        <Text>Phone Number: {deliveryAddress.phoneNumber}</Text>
                        <Text>Country: {deliveryAddress.country}</Text>
                        <Text>County: {deliveryAddress.county}</Text>
                        <Text>City/Town: {deliveryAddress.city}</Text>
                        <Text>Comment: {deliveryAddress.comment}</Text>
                    </Stack>
                    <CardFooter>
                        <Button onClick={toggleEditMode}>Edit</Button>
                    </CardFooter>
                </Card>
            ) : ( // Edit mode
                <Card>
                    <Heading>Update Delivery Address</Heading>
                    <CardBody>
                        <InputGroup>
                            <Input 
                                value={address.firstName} 
                                onChange={(e) => setAddress({ ...address, firstName: e.target.value })}
                                placeholder="First Name"
                            />
                            <Input 
                                value={address.lastName} 
                                onChange={(e) => setAddress({ ...address, lastName: e.target.value })}
                                placeholder="Last Name"
                            />
                            <Input 
                                value={address.phoneNumber} 
                                onChange={(e) => setAddress({ ...address, phoneNumber: e.target.value })}
                                placeholder="Phone Number"
                            />
                            <Input 
                                value={address.country} 
                                onChange={(e) => setAddress({ ...address, country: e.target.value })}
                                placeholder="Country"
                            />
                            <Input 
                                value={address.county} 
                                onChange={(e) => setAddress({ ...address, county: e.target.value })}
                                placeholder="County"
                            />
                            <Input 
                                value={address.city} 
                                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                placeholder="City/Town"
                            />
                            <Input 
                                value={address.comment} 
                                onChange={(e) => setAddress({ ...address, comment: e.target.value })}
                                placeholder="Comment"
                            />
                        </InputGroup>
                    </CardBody>
                    <CardFooter>
                        <Button onClick={handleSubmit}>Update</Button>
                        <Button onClick={toggleEditMode}>Cancel</Button>
                    </CardFooter>
                </Card>
            )}
        </div>
    )
}

export default DeliveryAddress;
