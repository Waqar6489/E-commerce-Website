import {useState, useEffect} from 'react';

function App() {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/products/')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.json();
      })
      .then(data => setProduct(data)) // Assuming you want to display the first product
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  return (
    <div className=" w-full h-screen flex flex-col items-center justify-start p-4 bg-gray-100">
       <h1 className="text-2xl font-bold mb-4">Product list</h1>
      <div className="w-full flex flex-row flex-wrap gap-8 justify-center p-4">
       
      {product && product.map((prod) => (
        <div className="mb-4 w-full flex flex-col max-w-md p-4 bg-white rounded shadow" key={prod.id} > 
          <img src={prod.image} className="w-full h-auto object-cover" />
          <h2 className="text-xl font-bold mb-2">{prod.name}</h2>
          <p className="text-gray-600">{prod.description}</p>
          <p className="text-sm font-bold">${prod.price}</p>
        </div>
      )) || (
        <p>Loading...</p>
      )}
      </div>
    </div>
  );
}

export default App;