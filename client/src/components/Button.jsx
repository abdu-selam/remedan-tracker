const Button = ({children, type, submit}) => {
  return (
    <button 
    type={submit ? 'submit':'button'}
     className={`px-2 py-1 rounded-md  border border-black text-[0.8rem]
    ${type == 'log' ? 'bg-transparent text-black' : 'bg-black text-white'}`}>
      {children}
    </button>
  )
}

export default Button
