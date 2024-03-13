import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  
} from '@chakra-ui/react';
import { toast } from 'react-toastify';
import './contact.css';

function Contact() {
  

  const initialValues = {
    name: '',
    email: '',
    message: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    message: Yup.string().required('Message is required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log('Form Data:', values);
    toast.success('Message sent successfully!');
    resetForm();
  };

  return (
    <div className='contact-component' style={{margin: '10px', padding: '20px', borderRadius: '20px'}}>
      <h1>Contact Us</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className='contact-section'>
            <VStack spacing={4} align="stretch" >
              <Field name="name">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.name && form.touched.name}>
                    <FormLabel>Name *</FormLabel>
                    <Input
                      {...field}
                      id="name"
                      placeholder="Enter your name"
                      variant='filled'
                      borderRadius='30px'
                    />
                  </FormControl>
                )}
              </Field>
              <Field name="email">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.email && form.touched.email}>
                    <FormLabel>Email *</FormLabel>
                    <Input
                      {...field}
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      variant='filled'
                      borderRadius='30px'
                    />
                  </FormControl>
                )}
              </Field>
              <Field name="message">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.message && form.touched.message}>
                    <FormLabel>Message *</FormLabel>
                    <Input
                      {...field}
                      as="textarea"
                      id="message"
                      rows={4}
                      placeholder="Enter your message"
                      variant='filled'
                      borderRadius='10px'
                      minHeight='70px'
                    />
                  </FormControl>
                )}
              </Field>
              <span><em>All Fields are required!</em></span>

              <Button
                type="submit"
                colorScheme="blue"
                borderRadius='30px'
                isLoading={isSubmitting}
              >
                Submit
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Contact;
