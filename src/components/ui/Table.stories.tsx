import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import Table from './Table'

export default {
  title: 'UI/Table',
  component: Table,
} as Meta

const columns = [
  { key: 'ticker', label: 'Ticker' },
  { key: 'name', label: 'Name' },
  { key: 'price', label: 'Price' },
]

const data = [
  { ticker: 'AAPL', name: 'Apple Inc.', price: '$176.20' },
  { ticker: 'MSFT', name: 'Microsoft', price: '$330.12' },
]

const Template: StoryFn<any> = () => <Table columns={columns} data={data} />

export const Default = Template.bind({})
Default.args = {}
