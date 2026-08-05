import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import Button from './Button'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
}

export default meta

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  children: 'Primary Button',
  variant: 'primary',
}

export const Secondary = Template.bind({})
Secondary.args = {
  children: 'Secondary Button',
  variant: 'secondary',
}

export const Loading = Template.bind({})
Loading.args = {
  children: 'Processing',
  variant: 'primary',
  loading: true,
}

export const Danger = Template.bind({})
Danger.args = {
  children: 'Delete',
  variant: 'danger',
}
