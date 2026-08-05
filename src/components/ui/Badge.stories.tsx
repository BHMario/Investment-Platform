import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import Badge from './Badge'

export default {
  title: 'UI/Badge',
  component: Badge,
} as Meta

const Template: StoryFn<typeof Badge> = (args) => <Badge {...args} />

export const Neutral = Template.bind({})
Neutral.args = { children: 'Neutral' }

export const Success = Template.bind({})
Success.args = { children: 'Up', tone: 'success' }

export const Danger = Template.bind({})
Danger.args = { children: 'Down', tone: 'danger' }
