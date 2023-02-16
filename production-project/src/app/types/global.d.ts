declare module '*.scss' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames
  export = classNames
}

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}

declare module '*.png'

declare module '*.jpg'
declare module '*.jpeg'
declare module '*.woff'

declare const __IS__DEV: boolean
