import { Check, X } from "lucide-react";

const Alert = ({msg, type, on}) => {
  return (
    <div className={`fixed bg-white text-black border ${type ? 'border-green-500 ':'border-red-500'} w-[90%] max-w-70 left-1/2 -translate-x-1/2 rounded-2xl p-4 flex items-start gap-2
    ${on ? 'top-4':'-top-full'} transition-all duration-500 ease-in-out z-1000
    `}>
        <div className={`${type ? 'bg-green-500' : 'bg-red-500'} rounded-full w-6 grid place-content-center px-1 aspect-square text-white`}>
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
