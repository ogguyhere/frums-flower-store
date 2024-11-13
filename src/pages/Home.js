// src/pages/Home.js
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ProductCard from '../components/ProductCard';
import bouquet from '../components/2.png';
import anotherImage from '../components/5.jpeg';

import welcomeBackground from '../components/o.jpg'; // Make sure to add the correct path to your background image

function Home() {
  return (
    <>
      {/* Welcome/Introduction Section with Background Image */}
      <section
        className="relative bg-cover bg-center bg-no-repeat text-white py-20 px-8 text-center"
        style={{ backgroundImage: `url(${welcomeBackground})` }}
      >
        {/* Overlay 
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-pink-500 to-purple-500 opacity-75"></div>*/}

        {/* Content */}
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Frums Flower Store</h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto">
            Discover the finest blooms, curated with care and arranged to perfection. At Frums Flower Store, we bring you not just flowers but moments of joy and connection with nature’s beauty.
          </p>
          <p className="text-md md:text-lg max-w-xl mx-auto mt-4 italic">
            "Our mission is to craft sustainable, exquisite floral designs that enhance your special moments and fill them with timeless elegance."
          </p>

          {/* Shop Now Button */}
          <a
            href="/shop"
            className="inline-block bg-white text-purple-600 font-bold py-3 px-6 rounded-full mt-8 transition-transform transform hover:scale-105 shadow-lg"
          >
            Shop Now
          </a>
        </div>
      </section>

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

      {/* Seasonal Promotions or Upcoming Events Section */}
      <section className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 py-16 px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-8">Seasonal Promotions & Upcoming Events</h2>

        {/* Promotional Offers or Event Cards */}
        <div className="flex flex-wrap justify-center gap-8">
          {/* Promotion Card 1 */}
          <div className="w-full sm:w-1/3 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-purple-600 mb-4">Spring Sale: 20% Off</h3>
            <p className="text-lg text-gray-700 mb-4">
              Enjoy 20% off on all flower arrangements for the spring season! Offer valid until the end of the month.
            </p>
            <a
              href="/shop"
              className="inline-block bg-purple-600 text-white py-2 px-4 rounded-full mt-4 transition-transform transform hover:scale-105"
            >
              Shop Now
            </a>
          </div>

          {/* Promotion Card 2 */}
          <div className="w-full sm:w-1/3 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-purple-600 mb-4">Mother's Day Event</h3>
            <p className="text-lg text-gray-700 mb-4">
              Celebrate Mother's Day with our exclusive flower arrangements and gifts. Join us for a special workshop on creating your own bouquets.
            </p>
            <a
              href="/events"
              className="inline-block bg-purple-600 text-white py-2 px-4 rounded-full mt-4 transition-transform transform hover:scale-105"
            >
              Learn More
            </a>
          </div>

          {/* Promotion Card 3 */}
          <div className="w-full sm:w-1/3 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-purple-600 mb-4">Fall Collection Launch</h3>
            <p className="text-lg text-gray-700 mb-4">
              Discover our new fall collection with rich colors and seasonal flowers. Available now in-store and online.
            </p>
            <a
              href="/shop"
              className="inline-block bg-purple-600 text-white py-2 px-4 rounded-full mt-4 transition-transform transform hover:scale-105"
            >
              Shop Fall Collection
            </a>
          </div>
        </div>
      </section>

      {/* New Section with Two Cards */}
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
                src={anotherImage}
                alt="Description of Image"
                className="w-full h-full object-cover rounded-lg animate-fade-in-out"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Swiper for Product Cards */}
      <section className="bg-gradient h-[90vh] flex items-center justify-center p-0">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20} // space between slides
          slidesPerView={1} // Adjust to show more slides if needed
          navigation
          pagination={{ clickable: true }}
        >
          <SwiperSlide>
            {/* Two product cards in one SwiperSlide with space between them */}
            <div className="flex justify-between space-x-4">
              <ProductCard
                image={bouquet}
                title="Card Title 1"
                description="This is a description for card 1."
              />
              <ProductCard
                image={anotherImage}
                title="Card Title 2"
                description="This is a description for card 2."
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-between space-x-4">
              <ProductCard
                image={bouquet}
                title="Card Title 3"
                description="This is a description for card 3."
              />
              <ProductCard
                image={anotherImage}
                title="Card Title 4"
                description="This is a description for card 4."
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-between space-x-4">
              <ProductCard
                image={bouquet}
                title="Card Title 5"
                description="This is a description for card 5."
              />
              <ProductCard
                image={anotherImage}
                title="Card Title 6"
                description="This is a description for card 6."
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
    </>
  );
}

export default Home;
