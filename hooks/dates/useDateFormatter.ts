// hooks/useDateFormatter.ts
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import * as moment from "moment-timezone";
import timezonePlugin from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezonePlugin);

export const useDateFormatter = () => {
  const [timezone, setTimezone] = useState<string>("");

  useEffect(() => {
    setTimezone(dayjs.tz.guess());  // Always guess browser timezone
  }, []);

  const formatListDate = (p: string | Date) => {
    if (!timezone || !p) return "";
    return dayjs(p).tz(timezone).format("MMM DD YYYY");
  };

  const formatListTime = (p: string | Date) => {
    if (!timezone || !p) return "";
    const timeString = dayjs(p).tz(timezone).format("hh:mm A");
    const zoneAbbr = moment.tz(timezone).zoneAbbr();
    return `${timeString} ${zoneAbbr}`;
  };

  return { formatListDate, formatListTime };
};
