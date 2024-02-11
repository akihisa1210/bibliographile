import type { Story } from "@ladle/react";
import { App } from "./App";

export const Position: Story = () => (
  <App position={{ x: "100px", y: "100px" }}>Hello</App>
);
