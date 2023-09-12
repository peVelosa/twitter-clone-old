import { useEffect, useState } from "react";
import { getTime } from "@/libs/helpers";

const useUpdateTime = ({ lastUpdate }: { lastUpdate: Date }) => {
  const [publishedAt, setPublishedAt] = useState(getTime(lastUpdate));

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPublishedAt(getTime(lastUpdate));
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [publishedAt, lastUpdate]);

  return { publishedAt };
};

export default useUpdateTime;
