import React, { useState, useEffect } from 'react';
import '../components/App.css';

function CustomizeBouquet() {
  const [flowers, setFlowers] = useState([]);
  const [color, setColor] = useState('');
  const [type, setType] = useState('');

  // Fetch flowers based on the selected color/type
//   useEffect(() => {
//     const fetchFlowers = async () => {
//       const response = await fetch(`/api/flowers?color=${color}&type=${type}`);
//       const data = await response.json();
//       setFlowers(data);
//     };

//     fetchFlowers();
//   }, [color, type]);

  return (
    <div className="customize-bouquet">
      <h1>Customize Your Bouquet</h1>

      <div className="filters">
        <label>
          Flower Color:
          <select onChange={(e) => setColor(e.target.value)}>
            <option value="">Any Color</option>
            <option value="Red">Red</option>
            <option value="Yellow">Yellow</option>
            <option value="White">White</option>
          </select>
        </label>

        <label>
          Flower Type:
          <select onChange={(e) => setType(e.target.value)}>
            <option value="">Any Type</option>
            <option value="Flower">Flower</option>
            <option value="Rose">Rose</option>
            <option value="Tulip">Tulip</option>
          </select>
        </label>
      </div>

      <div className="flower-results">
        {flowers.map((flower) => (
          <div key={flower.id} className="flower-card">
            <img src={flower.image_url} alt={flower.name} />
            <p>{flower.name}</p>
            <p>{flower.color}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomizeBouquet;
