var rawdt = 1598032135;
var dt = new Date(1598032135 * 1000);

function printDate(dt) {
  let day = {
    0: "Sun",
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat",
  };

  let month = {
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

async function buildReport(data) {
  let report = "";
  for (index in data.daily) {
    let day = data.daily[index];

    report += printDate(day.dt) + "\n";
    // report += 'http://openweathermap.org/img/wn/' + day.weather[0].icon + '@2x.png' + '\n';
    report += day.weather[0].main + "\n";
    report += "---------------" + "\n";
  }

  return report;
}

module.exports = {
  buildReport: buildReport,
};
