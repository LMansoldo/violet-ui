import type { Meta, StoryObj } from "@storybook/svelte"
import { Textfield } from "$violet/components/textfield";

const meta: Meta<typeof Textfield> = {
	title: "Library/Common/Textfield",
	component: Textfield
};
export default meta;
type Story = StoryObj<typeof Textfield>;

export const Page: Story = {};

