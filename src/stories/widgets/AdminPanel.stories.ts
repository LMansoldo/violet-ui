import type { Meta, StoryObj } from "@storybook/svelte"
import { AdminPanel } from "$widgets/admin-panel/src/components";

const meta: Meta<typeof AdminPanel> = {
	title: "Widgets/AdminPanel",
	component: AdminPanel
};
export default meta;
type Story = StoryObj<typeof AdminPanel>;

export const Component: Story = {};

