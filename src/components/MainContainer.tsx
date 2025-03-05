import { PropsWithChildren } from "react";

type MainContainerProps = PropsWithChildren;

const MainContainer = ({ children }: MainContainerProps) => {
  return (
    <div className="flex justify-center bg-zinc-800 text-white min-h-screen">
      {children}
    </div>
  );
};

export default MainContainer;
