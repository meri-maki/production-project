// similar to popular library jedwatson/classnames

// record - special type of typescript where KEY is string and VALUE is string OR Boolean
type Mods = Record<string, boolean | string>

export function classNames(
  cls: string,
  mods: Mods,
  additional: string[]
): string {
  return [
    cls,
    ...additional,
    Object.entries(mods)
      .filter(([cls, value]) => Boolean(value))
      .map(([cls]) => cls),
  ].join(' ')
}
