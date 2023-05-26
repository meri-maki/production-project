// similar to popular library jedwatson/classnames

// record - special type of typescript where KEY is string and VALUE is string OR Boolean
type Mods = Record<string, boolean | string>

export function classNames(
    cls: string,
    mods: Mods = {},
    additional: string[] = []
): string {
    return [
        cls,
        ...additional.filter(Boolean),
        ...Object.entries(mods)
            .filter(([_, value]) => Boolean(value)) // the first value in each array (represented by the underscore) is ignored and the filter only uses the second value (value).
            .map(([cls]) => cls),
    ].join(" ")
}
