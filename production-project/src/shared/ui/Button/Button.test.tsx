import { render, screen } from '@testing-library/react'
import { Button, ButtonTheme } from './Button'

describe('Button', () => {
    test('Test render', () => {
        render(<Button>TEST</Button>)
        expect(screen.getByText('TEST')).toBeInTheDocument()
    })

    test('Test ICON theme', () => {
        render(<Button theme={ButtonTheme.ICON}>TEST</Button>)
        expect(screen.getByText('TEST')).toHaveClass('icon')
        screen.debug()
    })
})
