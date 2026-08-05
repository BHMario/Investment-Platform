import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import Card from './Card'

export default {
  title: 'UI/Card',
  component: Card,
} as Meta

const Template: StoryFn<typeof Card> = (args) => <Card {...args} />

export const Default = Template.bind({})
Default.args = {
  children: <div style={{ minHeight: 80 }}>Contenido de la tarjeta</div>,
}
