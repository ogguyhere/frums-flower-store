import React from 'react';
import Header from './components/Header';
import FeaturedProduct from './components/FeaturedProduct';
import InSeasonCollection from './components/InSeasonCollection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-darkGreen min-h-screen text-white">
      <Header />
      <main className="p-4">
        <FeaturedProduct />
        <InSeasonCollection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
