import type { Meta, StoryObj } from "@storybook/svelte"
import { Quiz } from "$widgets/quiz/src/components";

const meta: Meta<typeof Quiz> = {
	title: "Widgets/Quiz",
	component: Quiz
};
export default meta;
type Story = StoryObj<typeof Quiz>;

export const Component: Story = {};

