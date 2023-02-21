import { classNames } from './classNames'

describe('classNames', () => {
    test('with only 1st param', () => {
        expect(classNames('someClass')).toBe('someClass')
    })
    test('with additional class', () => {
        const expected = 'someClass additionalClass class2'
        expect(classNames('someClass', {}, ['additionalClass', 'class2'])).toBe(
            expected
        )
    })
    test('with additional class and mods', () => {
        const expected = 'someClass additionalClass red'
        expect(
            classNames('someClass', { red: true, hovered: false }, [
                'additionalClass',
            ])
        ).toBe(expected)
    })
})
