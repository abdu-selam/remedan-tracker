const Loading = ({dashboard}) => {
  return (
    <div className={`${dashboard ? 'w-full h-full rounded-xl grow' : 'w-screen h-screen'} bg-black grid place-content-center place-items-center gap-4`}>
      <div className="w-12 h-12 bg-conic transform-3d from-black via-black to-white rounded-full grid place-content-center animate-spin">
        <div className="w-11 h-11 bg-black rounded-full"></div>
      </div>
      <p className="text-white text-sm w-28 animate-load whitespace-nowrap overflow-hidden">
        Abidin Is Loading
      </p>
    </div>
  );
};

export default Loading;
