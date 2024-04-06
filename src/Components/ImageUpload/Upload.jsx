import React, { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";
import { Button, Image, Input, Stack } from "@chakra-ui/react";
import axios from "axios"; // Import axios for making HTTP requests
import baseUrl from "../../baseUrl";
import { useToast } from "@chakra-ui/react";

function Upload() {
  const [imageUploads, setImageUploads] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const toast = useToast();
  const imagesListRef = ref(storage, "images/");

  const handleFileChange = (event) => {
    setImageUploads([...imageUploads, ...event.target.files]);
  };

  const uploadImages = () => {
    imageUploads.forEach((imageUpload, index) => {
      if (imageUpload == null) return;
      const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageUrls((prev) => [...prev, url]);
          toast({
            title: 'Success',
            description: `Image ${index + 1} uploaded successfully`,
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        });
      });
    });
    // Clear the upload list after uploading
    setImageUploads([]);
  };

  const submitProduct = async () => {
    try {
      // Prepare data for submission
      const productData = {
        name: "Product Name",
        description: ["Description 1", "Description 2"],
        price: 10.99,
        inStock: true,
        deliveryFee: 2.99,
        variations: [
          { size: "Small", quantity: 10 },
          { size: "Large", quantity: 20 }
        ],
        imageUrl: imageUrls // Assuming imageUrls contains uploaded image URLs
      };

      // Send product data to backend
      const response = await axios.post(`${baseUrl}/api/products`, productData);
      
      console.log('Product uploaded successfully:', response.data);
      toast({
        title: 'Success',
        description: 'Product uploaded successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error uploading product:', error);
      // Handle error here
    }
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
          console.log(imageUrls);
        });
      });
    });
  }, []);

  return (
    <div className="component">
      <Input
        type="file"
        multiple
        onChange={handleFileChange}
      />
      <Button onClick={uploadImages}> Upload Images</Button>
      <Button onClick={submitProduct}> Submit Product</Button>
      <Stack>
        {imageUrls.map((url, index) => (
          <Image key={index} src={url} alt={`Image ${index + 1}`} width='200px'/>
        ))}
      </Stack> 
    </div>
  );
}

export default Upload;
