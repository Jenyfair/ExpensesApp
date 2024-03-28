export const getFormattedDate = (date: Date) => {
  //console.log("formattedDate:", date.toISOString().slice(0, 10));
  return date.toISOString().slice(0, 10);
  //return `${date.getFullYear()} - ${date.getMonth()} - ${date.getDate()}`;
};

export const getDateMinusDays = (date: Date, days: number) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
};

export const getTokenExpirationTime = (expiresIn: number) => {
  const tokenExpirationDate = new Date();
  tokenExpirationDate.setTime(tokenExpirationDate.getTime() + expiresIn * 1000);

  return tokenExpirationDate.getTime();
};
