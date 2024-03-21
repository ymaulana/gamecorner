const options: Intl.DateTimeFormatOptions = {
  month: "short",
  day: "numeric",
  year: "numeric",
};

export const formattedDate = (date: string) => {
  const dateFormat = new Date(date);
  return dateFormat.toLocaleDateString("en-US", options);
};
