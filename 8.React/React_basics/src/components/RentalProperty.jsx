// One card for a single rental property.
// The whole property OBJECT comes in as one prop (634 refresher!),
// and the child calls the parent's remove function by id.
export default function RentalProperty(props) {
  const { property, removeProperty } = props; // destructuring, like StyledBox

  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: 8,
        padding: 10,
        margin: '10px 0',
      }}
    >
      <h3>
        {property.img} {property.name}
      </h3>
      <p>{property.description}</p>
      <p>
        💰 ${property.price} · 🛏️ {property.bedrooms} beds
      </p>

      {/* 635: conditional text based on the object's data */}
      {property.forRent ? (
        <p style={{ color: 'green' }}>✅ Available for rent</p>
      ) : (
        <p style={{ color: 'red' }}>❌ Sold / not available</p>
      )}

      <button onClick={() => removeProperty(property.id)}>Remove</button>
    </div>
  );
}
