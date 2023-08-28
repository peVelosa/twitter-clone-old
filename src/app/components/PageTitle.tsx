import type { FC } from "react";

type PageTitle = {
  title: string;
};

const PageTitle: FC<PageTitle> = ({ title }) => {
  return (
    <>
      <div className="py-4 px-2 border-b-[1px] border-gray-500 md:px-4">
        <h1 className="text-xl font-bold capitalize">{title}</h1>
      </div>
    </>
  );
};

export default PageTitle;
