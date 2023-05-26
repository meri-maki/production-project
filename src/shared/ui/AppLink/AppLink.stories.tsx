import { ComponentMeta, ComponentStory } from "@storybook/react"
import { Theme } from "app/providers/ThemeProvider"
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator"
import { AppLink, AppLinkTheme } from "./AppLink"

export default {
    title: "widget/AppLink",
    component: AppLink,

    argTypes: {
        backgroundColor: { control: "color" }
    },
    args: {
        to: "/"
    }
} as ComponentMeta<typeof AppLink>

const Template: ComponentStory<typeof AppLink> = (args) => <AppLink {...args} />

/* -------------------------------------------------------------------------- */
/*                                LIGHT THEMED                                */
/* -------------------------------------------------------------------------- */

export const Primary = Template.bind({})
Primary.args = {
    children: "AppLink",
    theme: AppLinkTheme.PRIMARY
}

export const Secondary = Template.bind({})
Secondary.args = {
    children: "AppLink",
    theme: AppLinkTheme.SECONDARY
}

/* -------------------------------------------------------------------------- */
/*                                DARK THEMED                                */
/* -------------------------------------------------------------------------- */

export const PrimaryDark = Template.bind({})
PrimaryDark.args = {
    children: "AppLink",
    theme: AppLinkTheme.PRIMARY
}
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)]

export const SecondaryDark = Template.bind({})
SecondaryDark.args = {
    children: "AppLink",
    theme: AppLinkTheme.SECONDARY
}
SecondaryDark.decorators = [ThemeDecorator(Theme.DARK)]
