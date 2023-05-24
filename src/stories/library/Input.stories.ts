import type { Meta, StoryObj } from "@storybook/svelte"
import { Input } from "$violet/components";

const meta: Meta<typeof Input> = {
	title: "Library/Common/Input",
	component: Input
};
export default meta;
type Story = StoryObj<typeof Input>;


export const Component: Story = {
	args: {
		label: 'Test',
		type: 'text',
		required: false,
		disabled: false
	}
};

