import { useEffect, useState } from "react";
import { getTime } from "@/libs/helpers";

const useUpdateTime = ({ updatedAt }: { updatedAt: Date }) => {
  const [publishedAt, setPublishedAt] = useState(getTime(updatedAt));

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPublishedAt(getTime(updatedAt));
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [publishedAt, updatedAt]);

  return { publishedAt };
};

export default useUpdateTime;
