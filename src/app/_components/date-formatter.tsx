import faPen from "../images/fontawesome-icons/pen-solid.svg";
import { parseISO, format } from "date-fns";

type Props = {
  dateString: string;
};

const DateFormatter = ({ dateString }: Props) => {
  const date = parseISO(dateString);
  return (
    <div className="flex items-center">
      <img src={faPen.src} className="w-3 h-3" alt="ペン" />
      <time dateTime={dateString} className="fill-red ml-1 text-xs">
        {format(date, "yyyy/MM/dd")}
      </time>
    </div>
  );
};

export default DateFormatter;
