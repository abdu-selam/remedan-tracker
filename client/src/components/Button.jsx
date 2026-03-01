const Button = ({children, type, submit}) => {
  return (
    <button 
    type={submit ? 'submit':'button'}
     className={`text-second px-2 py-1 rounded-md  border border-accent text-[0.8rem]
    ${type == 'log' ? 'bg-transparent' : 'shadow-[0_0_0.2rem_var(--color-accent)] bg-accent text-primary'} font-bold hover:shadow-[0_0_1rem_var(--color-accent)] transition duration-500`}>
      {children}
    </button>
  )
}

export default Button
