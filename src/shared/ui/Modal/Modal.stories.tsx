import { ComponentMeta, ComponentStory } from "@storybook/react"
import { Theme } from "app/providers/ThemeProvider"
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator"
import { Modal } from "./Modal"

export default {
    title: "shared/Modal",
    component: Modal,

    argTypes: {
        backgroundColor: { control: "color" }
    }
} as ComponentMeta<typeof Modal>

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />

export const Primary = Template.bind({}) //
Primary.args = {
    isOpen: true,
    children:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut voluptate commodi et sunt officia error ad? Asperiores, animi vel deserunt, id doloremque molestiae veniam repellat ullam fugiat et dolore enim."
}

export const Dark = Template.bind({})
Dark.args = {
    isOpen: true,

    children:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut voluptate commodi et sunt officia error ad? Asperiores, animi vel deserunt, id doloremque molestiae veniam repellat ullam fugiat et dolore enim."
}
Dark.decorators = [ThemeDecorator(Theme.DARK)]

export const Light = Template.bind({})
Light.args = {
    isOpen: true,
    children:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut voluptate commodi et sunt officia error ad? Asperiores, animi vel deserunt, id doloremque molestiae veniam repellat ullam fugiat et dolore enim."
}
