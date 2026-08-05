import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import Input from './Input'

export default {
  title: 'UI/Input',
  component: Input,
} as Meta

const Template: StoryFn<typeof Input> = (args) => <Input {...args} />

export const Default = Template.bind({})
Default.args = {
  placeholder: 'Enter value',
  label: 'Label',
}

export const Error = Template.bind({})
Error.args = {
  placeholder: 'Enter value',
  label: 'Label',
  error: 'Required field',
}
