import type { Meta, StoryObj } from "@storybook/svelte"
import { Tabs } from "$violet/components/tabs";

const meta: Meta<typeof Tabs> = {
	title: "Library/Common/Tabs",
	component: Tabs
};
export default meta;
type Story = StoryObj<typeof Tabs>;

export const Page: Story = {};

