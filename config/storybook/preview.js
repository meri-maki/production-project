import { addDecorator } from "@storybook/react"
import { StyleDecorator } from "../../src/shared/config/storybook/StyleDecorator/StyleDecorator"
import { ThemeDecorator } from "../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator"
import { Theme } from "../../src/app/providers/ThemeProvider"
import { RouterDecorator } from "../../src/shared/config/storybook/RouterDecorator/RouterDecorator"

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
}

addDecorator(StyleDecorator) // накладывает глобальные стили и переменные
addDecorator(ThemeDecorator(Theme.LIGHT)) // определяет в какой теме рендерится сторя
addDecorator(RouterDecorator) // оборачивает каждую сторю в роутер
