import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import Layout from './Layout'

const meta: Meta<typeof Layout> = {
  title: 'Layout/Main',
  component: Layout,
}

export default meta

const Template: StoryFn<typeof Layout> = (args) => (
  <Layout {...(args as any)}>
    <div style={{ padding: 20 }}>Contenido de prueba en el layout</div>
  </Layout>
)

export const Default = Template.bind({})
Default.args = {}
