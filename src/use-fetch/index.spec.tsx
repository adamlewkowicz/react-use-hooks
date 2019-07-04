import * as React from "react";
import { useFetch } from ".";
import { render } from "@testing-library/react";
import { mockAbortController, cleanAbortControllerMock } from "../../__tests__/util";

const domain = "http://domain.com/products/";

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

beforeEach(mockAbortController);
afterEach(cleanAbortControllerMock);

test('fetch calls are handled properly', async () => {
  const loadingText = "Loading...";
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
      async json(): Promise<Product> {
        return firstProduct;
      }
    })
    .mockResolvedValueOnce({
      ok: true,
      async json(): Promise<Product> {
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

  const [{ signal }] = (global as any)._AbortControllerInstances;

  expect(fetch).toHaveBeenCalledTimes(2);
  expect(fetch).toHaveBeenNthCalledWith(1, `${domain}${firstProduct.id}`, { signal });
  expect(fetch).toHaveBeenNthCalledWith(2, `${domain}${secondProduct.id}`, { signal });
  expect(signal.aborted).toEqual(true);
});

test('requests are aborted after component unmounts', () => {

  jest
    .spyOn(global, 'fetch' as any)
    .mockImplementationOnce(async () => {
      await new Promise(r => setTimeout(r, 1000));
      return {
        ok: true,
        async json(): Promise<Product> {
          return {
            id: 1,
            name: ''
          }
        }
      }
    });

  render(
    <Component
      domain={domain}
      productId={1}
    />
  );

  const [controller] = (global as any)._AbortControllerInstances;

  expect(AbortController).toHaveBeenCalledTimes(1);
  expect(controller.abort).toHaveBeenCalledTimes(1);
  expect(controller.signal.aborted).toEqual(true);
});

interface Product {
  id: number;
  name: string;
}