export default function getDateDifference(from: Date, to = new Date()): string {
  if(from > to) throw new Error("From date cannot be higher than To date");

  const fromYear = from.getFullYear();
  const toYear = to.getFullYear();
  if(fromYear !== toYear) {
    const diffrence = toYear - fromYear;
    return getDiffrenceString(diffrence, "year");
  }

  const fromMonth = from.getMonth();
  const toMonth = to.getMonth();
  if(fromMonth !== toMonth) {
    const diffrence = toMonth - fromMonth;
    return getDiffrenceString(diffrence, "month");
  }

  const fromDay = from.getDate();
  const toDay = to.getDate();
  if(fromDay !== toDay) {
    const diffrence = toDay - fromDay;
    return getDiffrenceString(diffrence, "day");
  }

  const fromHours = from.getHours();
  const toHours = to.getHours();
  if(fromHours !== toHours) {
    const difference = toHours - fromHours;
    return getDiffrenceString(difference, "hour");
  }

  const fromMinutes = from.getMinutes();
  const toMinutes = to.getMinutes();
  if(fromMinutes !== toMinutes) {
    const difference = toMinutes - fromMinutes;
    return getDiffrenceString(difference, "minute");
  }

  const fromSeconds = from.getSeconds();
  const toSeconds = to.getSeconds();
  if(toSeconds !== fromSeconds) {
    const diffrence = toSeconds - fromSeconds;
    return getDiffrenceString(diffrence, "second");
  } else {
    return "1 second ago";
  }
}

function getDiffrenceString(diffrence: number, type: string) {
  if(diffrence < 1) throw new Error("Difference should not be less than 1!");

  if(diffrence > 1) {
    return `${diffrence} ${type}s ago`
  } else {
    return `${diffrence} ${type} ago`;
  }
}