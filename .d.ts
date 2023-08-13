declare module '*.png' {
  export default '' as string
}
declare module '*.svg' {
  export default '' as string
}
declare module '*.jpeg' {
  export default '' as string
}
declare module '*.jpg' {
  export default '' as string
}

declare module 'react/jsx-runtime'

declare module '*.module.css'

declare module '*.module.css' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.module.scss' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.module.sass' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.module.less' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.module.styl' {
  const classes: { [key: string]: string }
  export default classes
}
