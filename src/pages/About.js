import React from 'react';
import { Typography, Box, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';

// Styled components
const Section = styled(Paper)(({ theme }) => ({
  padding: '2rem',
  margin: '1rem 0',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
}));

const TeamMember = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '1rem',
}));

const TeamImage = styled('img')({
  borderRadius: '50%',
  width: '80px',
  height: '80px',
  marginRight: '1rem',
});

function AboutPage() {
  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h3" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to our online store! We strive to provide the best products and services for our customers.
      </Typography>

      <Section>
        <Typography variant="h4" gutterBottom>
          Our Mission
        </Typography>
        <Typography variant="body1" paragraph>
          Our mission is to deliver high-quality products at competitive prices.
        </Typography>
      </Section>

      <Section>
        <Typography variant="h4" gutterBottom>
          Our Team
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TeamMember>
              <TeamImage src="team_member_photo.jpg" alt="Team Member" />
              <Box>
                <Typography variant="h6">John Doe</Typography>
                <Typography variant="body2">CEO & Founder</Typography>
              </Box>
            </TeamMember>
          </Grid>
          {/* Add more team members here */}
        </Grid>
      </Section>
    </Box>
  );
}

export default AboutPage;
