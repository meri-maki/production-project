import { ComponentStory, ComponentMeta } from '@storybook/react'
import '../../../app/styles/index.scss'
import '../../../app/styles/variables/global.scss'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { Button, ButtonTheme } from './Button'

export default {
    title: 'shared/Button',
    component: Button,

    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

/* -------------------------------------------------------------------------- */
/*                                LIGHT THEMED                                */
/* -------------------------------------------------------------------------- */

export const Primary = Template.bind({})
Primary.args = {
    children: 'Button',
    theme: ButtonTheme.PRIMARY
}

export const Secondary = Template.bind({})
Secondary.args = {
    children: 'Button',
    theme: ButtonTheme.SECONDARY
}

export const Outlined = Template.bind({})
Outlined.args = {
    children: 'Button',
    theme: ButtonTheme.OUTLINED
}

export const Icon = Template.bind({})
Icon.args = {
    children: 'a',
    theme: ButtonTheme.ICON
}

/* -------------------------------------------------------------------------- */
/*                                DARK THEMED                                */
/* -------------------------------------------------------------------------- */

export const PrimaryDark = Template.bind({})
PrimaryDark.args = {
    children: 'Button',
    theme: ButtonTheme.PRIMARY
}
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)]

export const SecondaryDark = Template.bind({})
SecondaryDark.args = {
    children: 'Button',
    theme: ButtonTheme.SECONDARY
}
SecondaryDark.decorators = [ThemeDecorator(Theme.DARK)]

export const OutlinedDark = Template.bind({})
OutlinedDark.args = {
    children: 'Button',
    theme: ButtonTheme.OUTLINED
}
OutlinedDark.decorators = [ThemeDecorator(Theme.DARK)]

export const IconDark = Template.bind({})
IconDark.args = {
    children: 'a',
    theme: ButtonTheme.ICON
}
IconDark.decorators = [ThemeDecorator(Theme.DARK)]
