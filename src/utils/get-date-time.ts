export const getDateTime = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const updatedMonth = month >= 10 ? month : `0${month}`;
  const day = currentDate.getDate();
  const hours = currentDate.getHours();
  const minute = currentDate.getMinutes();

  return {
    year,
    month: updatedMonth,
    day,
    hours,
    minute,
  };
};
