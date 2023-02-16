import { Meta, Story } from '@storybook/react'

import { Button, ButtonProps } from './Button'

const meta: Meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    controls: { expanded: true },
  },
}

export default meta

const Template: Story<ButtonProps> = (props: ButtonProps) => <Button {...props} />

export const Primary = Template.bind({})
Primary.args = {
  children: 'Primary Button',
}

export const PrimaryLoading = Template.bind({})
PrimaryLoading.args = {
  children: 'Primary Button',
  isLoading: true,
}
