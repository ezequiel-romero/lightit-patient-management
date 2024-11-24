type InputProps = {
  name: string
  label?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({ name, label, placeholder, value, onChange }: InputProps) => {
  return (
    <InputWrapper name={name} label={label}>
      <input
        className="input"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </InputWrapper>
  )
}

type TextAreaProps = {
  name: string
  label?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const TextArea = ({ name, label, placeholder, value, onChange }: TextAreaProps) => {
  return (
    <InputWrapper name={name} label={label}>
      <textarea
        className="textArea"
        rows={5}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </InputWrapper>
  )
}
type InputWrapperProps = {
  name: string
  label?: string
  children: React.ReactNode
}

export const InputWrapper = ({ name, label, children }: InputWrapperProps) => {
  return (
    <div className="inputWrapper">
      {label && (
        <label className="inputLabel" htmlFor={name}>
          {label}
        </label>
      )}
      {children}
    </div>
  )
}
