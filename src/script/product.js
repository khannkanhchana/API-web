// module.exports = {
//   theme: {
//     extend: {},
//   },
//   plugins: [
//     require('@tailwindcss/line-clamp'),
//   ],
// }

let productContainer = document.getElementById('product-container');
let card = "";

const getProducts = async () => {
  const BASE_URL = 'https://fakestoreapi.com/products';
  const res = await fetch(BASE_URL);  
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  const products = await res.json();
  return products;
};

getProducts()
  .then((products) => {
    products.map((product) => {
      card = `
      <div class="relative m-10 flex w-[60px] h-[60px] flex-col overflow-hidden rounded-lg border border-gray-100 bg-gray-600 shadow-md">
        <a class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="./detailCard.html?id=${product.id}">
          <img class="object-cover" 
          crossorigin="anonymous"
          onerror = "this.src='https://via.placeholder.com/150'"
          src=${product.image} 
          alt=${product.title}/>
          <span class="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span>
        </a>
        <div class="mt-4 px-5 pb-5">
          <a href="./sign-in.html?id=${product.id}">
            <h5 class="text-xl tracking-tight 
            text-slate-900 line-clamp-1">${product.title}</h5>
          </a>
          <div class="mt-2 mb-5 flex items-center justify-between">
            <p>
              <span class="text-3xl font-bold text-slate-900">$${product.price}</span>
            </p>
          </div>
          <a href="./detailCard.html?id=${product.id}" class="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700">
            Add to cart
          </a>
        </div>
      </div>
      `;
      productContainer.innerHTML += card;
    });
  })
  .catch((error) => {
    console.error("Error fetching products : ", error);
  });
