// 643/644. Rental Property Exercise + STARTER DATA

import { useState } from 'react';
import RentalProperty from './RentalProperty.jsx';

// 644: the starter data — an array of objects (634 refresher!)
const starterProperties = [
  {
    id: 1,
    name: 'Sunny Loft',
    img: '🏙️',
    price: 2000,
    bedrooms: 2,
    forRent: true,
    description: 'Bright loft with a great view of the city.',
  },
  {
    id: 2,
    name: 'Cozy Cottage',
    img: '🏡',
    price: 1500,
    bedrooms: 1,
    forRent: false,
    description: 'Charming cottage on a quiet street.',
  },
  {
    id: 3,
    name: 'Beach Bungalow',
    img: '🏖️',
    price: 3000,
    bedrooms: 3,
    forRent: true,
    description: 'Steps from the sand, perfect for a vacation.',
  },
];

export default function RentalProperties() {
  // state holds the list — filtering it makes the page re-render
  const [properties, setProperties] = useState(starterProperties);
  const [showAll, setShowAll] = useState(true);

  // 635 conditionals: show everything, or only available rentals
  function toggleFilters() {
    setShowAll((current) => {
      if (current) {
        return starterProperties.filter((p) => p.forRent);
      }
      return starterProperties;
    });
  }

  function removeProperty(id) {
    setProperties(properties.filter((p) => p.id !== id));
  }

  return (
    <div>
      <h2>🏠 Rental Properties ({showAll ? 'all' : 'for rent only'})</h2>
      <button onClick={toggleFilters}>
        {showAll ? 'Show only for rent' : 'Show all'}
      </button>

      {properties.map((property) => (
        // 641: here we use the property's OWN unique `id` as the key —
        // better than index when items can be removed/reordered
        <RentalProperty
          key={property.id}
          property={property}
          removeProperty={removeProperty}
        />
      ))}
    </div>
  );
}
