import { useEffect, useState } from "react";
import { getTime } from "@/libs/helpers";

const useUpdateTime = ({ publishedAt }: { publishedAt: Date }) => {
  const [updatedAt, setUpdatedAt] = useState(getTime(publishedAt));

  useEffect(() => {
    const timeout = setTimeout(() => {
      setUpdatedAt(getTime(publishedAt));
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [updatedAt, publishedAt]);

  return { updatedAt };
};

export default useUpdateTime;
