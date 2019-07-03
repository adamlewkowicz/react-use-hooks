import * as React from "react";
import { useFetch } from ".";
import { render } from "@testing-library/react"; 

interface Product {
  id: number
  name: string
}

test('', async () => {
  function Component({ productId }) {
    const { data: product, isFetching } = useFetch<Product>(
      `/products/${productId}`,
      null,
      { deps: [productId] }
    );

    if (isFetching) {
      return <div>Loading...</div>
    }
    
    return (
      <div>
        <p>Product {product.name}</p>
        This is product with id of {product.id}
        <button
          data-testid="next-product-btn"
          onClick={() => {}}
        >
          Show next product
        </button>
      </div>
    );
  }

  let productId = 1;
  const firstProductName = 'Apple';
  const secondProductName = 'Croissant';

  const { findByText, rerender, getByText } = render(
    <Component productId={productId} />
  );
  const loading = 'Loading...';

  getByText(loading);
  await findByText(`Product ${firstProductName}`);

  productId++;
  
  rerender(<Component productId={productId} />);

  getByText(loading);
  await findByText(`Product ${secondProductName}`);
  
  expect(fetch).toHaveBeenCalledTimes(2);
  expect(fetch).toHaveBeenLastCalledWith(`/products/${productId}`)

  // await findByTestId('next-product-btn');
});