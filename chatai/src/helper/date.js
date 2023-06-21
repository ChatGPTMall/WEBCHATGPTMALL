export const formatDate = (dateString) => {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  return formattedDate
};
