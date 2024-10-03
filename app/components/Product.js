export default function Product({ product }) {
  const getEmissionColor = (co2) => {
    if (co2 < 1) return "text-green-500";
    if (co2 >= 1 && co2 <= 5) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div
      key={product.id}
      className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
    >
      <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
      <p className="text-sm text-gray-500 mb-2">{product.category}</p>
      <p
        className={`text-sm font-medium ${getEmissionColor(
          product.estimatedCO2
        )}`}
      >
        CO2: <span>{product.estimatedCO2} kg</span>
      </p>
      <p className={`mt-2 text-sm font-medium `}>
        {product.inStock ? "In Stock" : "Out of Stock"}
      </p>
    </div>
  );
}
