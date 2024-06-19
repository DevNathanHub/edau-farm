import React, { useState } from 'react';
import { Button, FormControl, FormLabel, Input, VStack, Box, Image, useToast } from "@chakra-ui/react";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';
import axios from 'axios';
import baseUrl from '../../baseUrl';

const AddUser = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [uid, setUid] = useState('');
  const [role, setRole] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let uploadedPhotoURL = photoURL;
      if (avatar) {
        const storageRef = ref(storage, avatar.name);
        await uploadBytes(storageRef, avatar);
        uploadedPhotoURL = await getDownloadURL(storageRef);
      }
      
      const formData = {
        displayName,
        email,
        uid,
        role,
        photoURL: uploadedPhotoURL,
        addresses: [],
        favoriteCategories: [],
        orders: [],
        paymentMethods: [],
        favoriteProducts: [],
        reviews: []
      };

      console.log("form data", formData);
      await axios.post(`${baseUrl}/api/user/add`, formData);

      toast({
        title: "User added.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Clear form values after successful submission
      setDisplayName('');
      setEmail('');
      setUid('');
      setRole('');
      setPhotoURL('');
      setAvatar(null);

    } catch (error) {
      toast({
        title: "Error adding user.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack spacing={4}>
      <FormControl>
        <FormLabel>Display Name</FormLabel>
        <Input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>UID</FormLabel>
        <Input type="text" value={uid} onChange={(e) => setUid(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Role</FormLabel>
        <Input type="text" value={role} onChange={(e) => setRole(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Photo URL</FormLabel>
        <Input type="text" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Upload Avatar</FormLabel>
        <Input type="file" onChange={handleAvatarChange} />
      </FormControl>
      <Button onClick={handleSubmit} disabled={loading}>{loading ? "Loading..." : "Submit"}</Button>
      {avatar && (
        <Box>
          <Image src={URL.createObjectURL(avatar)} alt="Avatar Preview" />
        </Box>
      )}
    </VStack>
  );
};

export default AddUser;
