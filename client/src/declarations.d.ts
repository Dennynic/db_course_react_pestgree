declare module '*.png' {
  const value: any;
  export = value;
}

declare module '*.jpg' {
  const value: any;
  export = value;
}

declare module '*.svg' {
  const value: any;
  export = value;
}

interface IClassNames {
  [className: string]: string;
}

declare module '*.scss' {
  const classNames: IClassNames;
  export = classNames;
}

declare module '*.css' {
  const classNames: IClassNames;
  export = classNames;
}
