const getMonthName = (monthNumber: number) => {
  switch (monthNumber) {
    case 0:
      return "Jan";
    case 1:
      return "Feb";
    case 2:
      return "Mar";
    case 3:
      return "Apr";
    case 4:
      return "May";
    case 5:
      return "Jun";
    case 6:
      return "Jul";
    case 7:
      return "Aug";
    case 8:
      return "Sept";
    case 9:
      return "Oct";
    case 10:
      return "Nov";
    case 11:
      return "Dec";
  }
};

const PublishedTime = ({ date }: { date: Date }) => {
  const hour = String(new Date(date).getHours()).padStart(2, "0");
  const minute = new Date(date).getMinutes();
  const day = String(new Date(date).getDay()).padStart(2, "0");
  const month = getMonthName(new Date(date).getMonth());

  const year = new Date(date).getFullYear();

  return (
    <>
      {hour}:{minute} · {month} {day}, {year}
    </>
  );
};

export default PublishedTime;
