import type { Story } from "@ladle/react";
import { CopyButton } from "./CopyButton";

const onCopy = () => console.log("copy");

export const Default: Story = () => <CopyButton onCopy={onCopy} />;
