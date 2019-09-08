function secondsTimeConvert(sec){
  const units = [" days", " hours", " minutes", " seconds"];
  const days = Math.floor(sec / (24 * 3600));
  const hours = Math.floor((sec % (24 * 3600)) / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = sec % 60;
  let time = [days, hours, minutes, seconds];

  for (i = 0; i < 4; i++){
    if (time[i] === 0){
      time[i] = "";
    }
    else time[i] = " " + time[i] + units[i];
  };

  return time.join("").trim();
}

module.exports = secondsTimeConvert;
