import type { Meta, StoryObj } from "@storybook/svelte"
import { Header } from "$lib/components/header";

const meta: Meta<typeof Header> = {
	title: "Library/Layout/Header",
	component: Header
};
export default meta;
type Story = StoryObj<typeof Header>;

export const Page: Story = {};

