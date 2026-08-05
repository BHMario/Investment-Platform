import '../src/styles/globals.css'
import type { Preview } from '@storybook/react'
import React from 'react'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: { expanded: true }
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' }
        ]
      }
    }
  }
}

const withTheme = (Story: any, context: any) => {
  const theme = context.globals.theme || 'light'
  const className = theme === 'dark' ? 'theme-dark' : ''
  return React.createElement('div', { className, style: { padding: 20 } }, React.createElement(Story, null))
}

export const decorators = [withTheme]

export default preview
