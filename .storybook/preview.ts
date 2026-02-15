import '../src/styles/globals.css';

import type { Preview } from '@storybook/nextjs-vite';
import type { Decorator } from '@storybook/react';
import { createElement } from 'react';

const withTheme: Decorator = (Story) =>
  createElement(
    'div',
    {
      className: 'min-h-screen bg-g-700 text-g-0 p-6',
    },
    createElement(Story),
  );

const preview: Preview = {
  decorators: [withTheme],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;
