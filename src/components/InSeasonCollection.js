import React from 'react';

function InSeasonCollection() {
  const products = [
    { name: 'Structure Airy', price: '$55' },
    { name: 'Gilly Style', price: '$60' },
    { name: 'Lush Color', price: '$65' },
    // Add more products as needed
  ];

  return (
    <section className="p-8 bg-darkGreen">
      <h2 className="text-3xl text-white font-bold mb-4">In Season</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <div key={index} className="bg-purple p-4 rounded text-white">
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default InSeasonCollection;
