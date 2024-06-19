import React, { useState } from 'react';
import { useDeliveryAddress } from '../../Context/deliveryAddressContext';
import { 
    Card, 
    CardBody, 
    CardFooter, 
    Button, 
    Heading, 
    Text, 
    Input, 
    InputGroup, 
    Stack, 
    HStack, 
    VStack, 
    Grid 
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { 
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    ModalCloseButton, 
    useDisclosure 
} from '@chakra-ui/react';

function DeliveryAddress() {
    // Access delivery address context
    const { deliveryAddress, updateDeliveryAddress } = useDeliveryAddress();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    // State for address details
    const [address, setAddress] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        country: '',
        county: '',
        city: '',
        comment: ''
    });
    
    // State to toggle edit mode
    const [editMode, setEditMode] = useState(!deliveryAddress);

    // Update the address
    const handleSubmit = () => {
        updateDeliveryAddress(address);
        setEditMode(false);
    };

    // Toggle between edit mode and view mode
    const toggleEditMode = () => {
        setEditMode(!editMode);
        if (!editMode) {
            if (deliveryAddress) {
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
                    <CardBody>
                        <Stack spacing={4}>
                            <Text>First Name: {deliveryAddress.firstName}</Text>
                            <Text>Last Name: {deliveryAddress.lastName}</Text>
                            <Text>Phone Number: {deliveryAddress.phoneNumber}</Text>
                            <Text>Country: {deliveryAddress.country}</Text>
                            <Text>County: {deliveryAddress.county}</Text>
                            <Text>City/Town: {deliveryAddress.city}</Text>
                            <Text>Comment: {deliveryAddress.comment}</Text>
                        </Stack>
                    </CardBody>
                    <CardFooter>
                        <Button colorScheme="teal" onClick={toggleEditMode}>Edit</Button>
                    </CardFooter>
                </Card>
            ) : ( // Edit mode
            <>
                <Button colorScheme="teal" onClick={onOpen}>Update Delivery Address</Button>

                <Modal isOpen={isOpen} onClose={onClose} size="lg">
                    <ModalOverlay />
                    <ModalContent m={4}>
                        <ModalHeader>Update Delivery Address</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Grid gap={6}>
                                <Input 
                                    value={address.firstName} 
                                    onChange={(e) => setAddress({ ...address, firstName: e.target.value })}
                                    placeholder="First Name"
                                    isRequired
                                />
                                <Input 
                                    value={address.lastName} 
                                    onChange={(e) => setAddress({ ...address, lastName: e.target.value })}
                                    placeholder="Last Name"
                                    isRequired
                                />
                                <Input 
                                    value={address.phoneNumber} 
                                    onChange={(e) => setAddress({ ...address, phoneNumber: e.target.value })}
                                    placeholder="Phone Number"
                                    isRequired
                                />
                                <Input 
                                    value={address.country} 
                                    onChange={(e) => setAddress({ ...address, country: e.target.value })}
                                    placeholder="Country"
                                    isRequired
                                />
                                <Input 
                                    value={address.county} 
                                    onChange={(e) => setAddress({ ...address, county: e.target.value })}
                                    placeholder="County"
                                    isRequired
                                />
                                <Input 
                                    value={address.city} 
                                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                    placeholder="City/Town"
                                    isRequired
                                />
                                <Input 
                                    value={address.comment} 
                                    onChange={(e) => setAddress({ ...address, comment: e.target.value })}
                                    placeholder="Comment"
                                />
                            </Grid>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="teal" mr={3} onClick={() => { handleSubmit(); onClose(); }}>
                                Update
                            </Button>
                            <Button variant="ghost" onClick={() => { toggleEditMode(); onClose(); }}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
            )}
        </div>
    );
}

export default DeliveryAddress;
