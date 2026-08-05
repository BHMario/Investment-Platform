import React, { useState } from 'react'
import { Meta, StoryFn } from '@storybook/react'
import Modal from './Modal'

export default {
  title: 'UI/Modal',
  component: Modal,
} as Meta

const Template: StoryFn<any> = () => {
  const [open, setOpen] = useState(true)
  return (
    <div>
      <button onClick={() => setOpen(true)} className="px-3 py-2 bg-primary-500 text-white rounded">Open</button>
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Modal title">
        <p>Contenido del modal</p>
      </Modal>
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {}
