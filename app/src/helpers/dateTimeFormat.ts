export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const formatTime = (timeString: string) => {
  const time = new Date(`1970-01-01T${timeString}Z`);
  const hours = time.getUTCHours().toString().padStart(2, "0");
  const minutes = time.getUTCMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const formatDateTime = (dateTimeString: string) => {
  const dateTime = new Date(dateTimeString);
  const day = dateTime.getDate().toString().padStart(2, "0");
  const month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
  const year = dateTime.getFullYear();
  const hours = dateTime.getHours().toString().padStart(2, "0");
  const minutes = dateTime.getMinutes().toString().padStart(2, "0");
  return `${day}/${month}/${year} - ${hours}:${minutes}`;
};

export const getTwoMonthsFromToday = () => {
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 4;
  let day = today.getDate();

  if (month > 12) {
    month -= 12;
    year += 1;
  }

  const daysInMonth = new Date(year, month, 0).getDate();
  if (day > daysInMonth) {
    day = daysInMonth;
  }

  return new Date(year, month - 1, day);
};

export const maxDate = getTwoMonthsFromToday();
export const today = new Date().toISOString().split("T")[0];
export const todayTimestamp = new Date().toLocaleString();
