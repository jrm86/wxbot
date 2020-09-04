const day = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
};

const month = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

/**
 *
 * @param {number} dt Unix style datetime
 */
function formatDate(dt) {

  let date = new Date(dt * 1000);
  let datestring =
    day[date.getDay()] +
    ", " +
    date.getDate() +
    " " +
    month[date.getMonth()] +
    " " +
    date.getFullYear();
  return datestring;
}

function shortDate(dt){
  let date = new Date(dt * 1000);

  let shortDate = date.getDate() + ": " + day[date.getDay()];

  return shortDate;
}

/**
 * Convert Kelvin to F
 * @param {number} temp 
 */
function getFTemp(temp){
  let f = (temp - 273.15) * (9/5) + 32;

  return f;
}

module.exports = {
  formatDate: formatDate,
  shortDate: shortDate,
  getFTemp: getFTemp
};
