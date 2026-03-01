const Button = ({children, type, submit}) => {
  return (
    <button 
    type={submit ? 'submit':'button'}
     className={` px-4 py-1 rounded-md  border border-accent text-[1rem]
    ${type == 'log' ? 'bg-transparent' : 'shadow-[0_0_0.2rem_var(--color-accent)] bg-second text-primary'} font-bold hover:shadow-[0_0_1rem_var(--color-accent)] transition duration-500`}>
      {children}
    </button>
  )
}

export default Button
