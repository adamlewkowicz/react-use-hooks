import * as React from "react";
import { useFetch } from ".";
import { render } from "@testing-library/react";

interface Product {
  id: number;
  name: string;
}

function Component({ domain, productId }) {
  const { data: product, isLoading } = useFetch<Product>(
    `${domain}${productId}`,
    null,
    { deps: [productId] }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (product === null) {
    return <div>No product was found for the given id</div>;
  }

  return (
    <div>
      <p>Product: {product.name}</p>
      This is product with id of {product.id}
      <button data-testid="next-product-btn" onClick={() => {}}>
        Show next product
      </button>
    </div>
  );
}

test('fetch calls are handled properly', async () => {
  const domain = "http://domain.com/products/";
  const loadingText = "Loading...";
  const { signal } = new AbortController();
  const [firstProduct, secondProduct] = [
    {
      id: 1,
      name: 'Apple'
    },
    {
      id: 2,
      name: 'Croissant'
    }
  ]

  jest
    .spyOn(global, 'fetch' as any)
    .mockResolvedValueOnce({
      ok: true,
      async json() {
        return firstProduct;
      }
    })
    .mockResolvedValueOnce({
      ok: true,
      async json() {
        return secondProduct;
      }
    });

  const { findByText, rerender, getByText } = render(
    <Component
      domain={domain}
      productId={firstProduct.id}
    />
  );

  getByText(loadingText);
  await findByText(`Product: ${firstProduct.name}`);

  rerender(
    <Component
      domain={domain}
      productId={secondProduct.id}
    />
  );

  getByText(loadingText);
  await findByText(`Product: ${secondProduct.name}`);

  expect(fetch).toHaveBeenCalledTimes(2);
  expect(fetch).toHaveBeenNthCalledWith(1, `${domain}${firstProduct.id}`, { signal });
  expect(fetch).toHaveBeenNthCalledWith(2, `${domain}${secondProduct.id}`, { signal });
});
