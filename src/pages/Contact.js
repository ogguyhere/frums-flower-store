import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';

// Styled components
const FormContainer = styled(Paper)(({ theme }) => ({
  padding: '2rem',
  backgroundColor: '#f5f5f5',
  borderRadius: '8px',
}));

const FormField = styled(TextField)(({ theme }) => ({
  marginBottom: '1rem',
  width: '100%',
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  width: '100%',
  backgroundColor: '#3f51b5',
  color: '#fff',
}));

const SuccessMessage = styled(Typography)(({ theme }) => ({
  marginTop: '1rem',
  color: 'green',
  textAlign: 'center',
}));

function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API submission
    setSubmitStatus('Form submitted successfully!');
    setFormData({ name: '', email: '', message: '' }); // Clear form
  };

  return (
    <Container>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12} sm={8} md={6}>
          <FormContainer>
            <Typography variant="h4" gutterBottom>
              Contact Us
            </Typography>
            <form onSubmit={handleSubmit}>
              <FormField
                label="Name"
                variant="outlined"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <FormField
                label="Email"
                variant="outlined"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <FormField
                label="Message"
                variant="outlined"
                multiline
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
              <SubmitButton type="submit" variant="contained">
                Submit
              </SubmitButton>
            </form>
            {submitStatus && <SuccessMessage>{submitStatus}</SuccessMessage>}
          </FormContainer>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ContactPage;
