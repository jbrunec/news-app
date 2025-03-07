import { PropsWithChildren } from "react";

type NewsContainerProps = PropsWithChildren;

const NewsContainer = ({ children }: NewsContainerProps) => {
  return (
    <div className="w-7xl min-h-200 bg-zinc-600 rounded-2xl border-4 border-zinc-900 p-2 m-4">
      {children}
    </div>
  );
};

export default NewsContainer;
