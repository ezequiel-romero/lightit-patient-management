import clsx from 'clsx'

type ButtonProps = {
  text: string
  className?: string
  variant?: 'primary' | 'secondary'
  onClick?: () => void
  size?: 'small' | 'medium' | 'large'
  type?: 'button' | 'submit'
  disabled?: boolean
}

export const Button = ({
  text,
  className,
  variant = 'primary',
  onClick,
  size = 'medium',
  type = 'button',
  disabled,
}: ButtonProps) => {
  return (
    <button
      className={clsx(variant, className, size)}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  )
}
