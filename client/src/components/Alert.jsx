import { Check, X } from "lucide-react";

const Alert = ({msg, type, on}) => {
  return (
    <div className={`fixed font-semibold bg-primary text-second border ${type ? 'border-confirm shadow-[0_0_1rem_var(--color-confirm)]':'border-denied shadow-[0_0_1rem_var(--color-denied)]'} w-[90%] max-w-70 left-1/2 -translate-x-1/2 rounded-2xl p-4 flex items-center gap-2
    ${on ? 'top-4':'-top-full'} transition-all duration-500 ease-in-out z-10000000
    `}>
        <div className={`${type ? 'bg-confirm text-primary' : 'bg-denied'} rounded-full w-6 grid place-content-center px-1 aspect-square `}>
            {
                !type ? (
                    <X className="w-4"></X>
                ):(
                    <Check className="w-4"></Check>
                )
            }
        </div>
        
        <p className="text-xs w-full">
            {msg}
        </p>
    </div>
  );
};

export default Alert;
