import type { Preview } from "@storybook/svelte";
import '../src/app.scss';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: [
          'Wiki',
          ['Getting Started', 'Payments'],
          'Usecases',
          ['Approvals', 'BankAccounts', 'Counterparties', 'Transactions', 'Wallets']
        ],
      },
    },
  },
};

export default preview;
