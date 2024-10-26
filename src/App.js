import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import bouquet from './components/2.png'; // Example image
import anotherImage from './components/5.jpeg'; // Your new image
import Header from './components/Header';
import './components/App.css';

function App() {
  return (
    <div>
      <Header />

      {/* Full-page background section */}
      <section className="bg-2 h-screen flex items-center justify-center p-4">
        <div className="flex items-center justify-start w-[90%] h-[80vh] bg-gradient shadow-lg rounded-lg p-4">
          <img
            src={bouquet}
            alt="Bouquet"
            className="shadow-lg rounded-lg h-[70%] w-auto sm:h-[80%] md:h-[90%] lg:h-[100%] object-cover ml-6"
          />
          
          {/* Text Container */}
          <div className="ml-6 flex flex-col justify-start">
            <h1 className="text-3xl font-bold text-white">Your Title Here</h1>
            <p className="text-lg text-gray-300">This is a description or additional text next to the image. You can add more information here.</p>
          </div>
        </div>
      </section>

      {/* New Section with Two Card Components */}
      <section className="bg-gradient h-[90vh] flex items-center justify-center p-0">
        <div className="flex w-full h-full">
          {/* Left Card (Text Container) */}
          <div className="w-1/2 flex items-center justify-center p-4">
            <div className="bg-1 rounded-lg shadow-md w-full h-full flex flex-col justify-center p-6">
              <h2 className="text-2xl font-bold text-white">New Section Title</h2>
              <p className="text-lg text-blue-700">This is a description for the new section. You can add any relevant information here, and it will be aligned to the left side.</p>
            </div>
          </div>

          {/* Right Card (Image Container) */}
          <div className="w-1/2 flex items-center justify-center p-4">
            <div className="bg-5 rounded-lg shadow-md w-full h-full overflow-hidden">
              <img
                src={anotherImage} // Your new image
                alt="Description of Image"
                className="w-full h-full object-cover rounded-lg animate-fade-in-out" // Apply the fade-in-out animation
              />
            </div>
          </div>
        </div>
      </section>

      {/* New Section for Additional Cards */}
      <section className="bg-gradient h-[90vh] flex items-center justify-center p-0">
        <div className="flex w-full h-full">
          {/* New Card 1 */}
          <div className="w-1/2 flex items-center justify-center p-4">
            <Card sx={{ maxWidth: 345, backgroundColor: '#1c1c1c' }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="./components/cardImage1.png" // Replace with your image
                  alt="Description of Card Image 1"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" color="white">
                    Card Title 1
                  </Typography>
                  <Typography variant="body2" color="gray">
                    This is a description for card 1. You can add any relevant information here.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>

          {/* New Card 2 */}
          <div className="w-1/2 flex items-center justify-center p-4">
            <Card sx={{ maxWidth: 345, backgroundColor: '#1c1c1c' }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="./components/2.png" // Replace with your image
                  alt="Description of Card Image 2"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" color="white">
                    Card Title 2
                  </Typography>
                  <Typography variant="body2" color="gray">
                    This is a description for card 2. You can add any relevant information here.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        </div>
      </section>

    </div>
  );
}

export default App;
