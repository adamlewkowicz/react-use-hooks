import * as React from "react";
import { useClickOutside } from ".";
import { useState } from "react";
import { render, fireEvent } from "@testing-library/react";

describe("useClickOutside", () => {

  test('triggers function when user has clicked outside of element', async () => {
    function Component() {
      const [outside, setOutside] = useState(false);
      const ref = useClickOutside(() => setOutside(true));
      return (
        <div>
          <h1>Main header</h1>
          <main ref={ref}>
            User {outside ? "has" : "hasn't"} clicked outside of the main
            <button>Trigger</button>
          </main>
        </div>
      );
    }

    const { getByText } = render(<Component />);

    const header = getByText("Main header");
    const button = getByText("Trigger");

    await fireEvent.click(button);

    getByText("User hasn't clicked outside of the main");

    await fireEvent.click(header);

    getByText("User has clicked outside of the main");
  });

});
