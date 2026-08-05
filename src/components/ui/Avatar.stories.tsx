import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import Avatar from './Avatar'

export default {
  title: 'UI/Avatar',
  component: Avatar,
} as Meta

const Template: StoryFn<typeof Avatar> = (args) => <Avatar {...args} />

export const WithInitials = Template.bind({})
WithInitials.args = { name: 'Mario Rossi', size: 48 }

export const WithImage = Template.bind({})
WithImage.args = { src: 'https://placehold.co/48', name: 'Image', size: 48 }
