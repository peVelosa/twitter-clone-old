const PublishedTime = ({ date }: { date: Date }) => {
  const hour = new Date(date).getHours();
  const minute = new Date(date).getMinutes();
  const day = new Date(date).getDay();
  const month = new Intl.DateTimeFormat("en-US", {
    month: "short",
  }).format();
  const year = new Date(date).getFullYear();

  return (
    <>
      {String(hour).padStart(2, "0")}:{String(minute).padStart(2, "0")} ·{" "}
      {month} {day}, {year}
    </>
  );
};

export default PublishedTime;
