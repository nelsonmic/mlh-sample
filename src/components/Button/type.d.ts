

interface buttonType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string,
    RightIcon?: React.ReactNode,
    LeftIcon?: React.ReactNode
    center?: boolean
    fullWidth?: boolean
}