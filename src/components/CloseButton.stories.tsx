import type { Story } from "@ladle/react";
import { CloseButton } from "./CloseButton";

const onClose = () => console.log("close");

export const Default: Story = () => <CloseButton onClose={onClose} />;
