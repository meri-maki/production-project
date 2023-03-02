import 'app/styles/index.scss'
import 'app/styles/reset.scss'
import 'app/styles/variables/global.scss'

import { Story } from '@storybook/react'

export const StyleDecorator = (story: () => Story) => story()
