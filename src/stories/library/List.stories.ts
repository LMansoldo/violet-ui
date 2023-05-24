import type { Meta, StoryObj } from "@storybook/svelte"
import { List } from "$violet/components/list";

const meta: Meta<typeof List> = {
	title: "Library/Common/List",
	component: List
};
export default meta;
type Story = StoryObj<typeof List>;

export const Page: Story = {};

