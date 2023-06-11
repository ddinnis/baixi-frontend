const timeReg = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;

export function parseLyric(lyricString) {
  const lyricInfos = [];
  const lyricLines = lyricString.split("\n");
  for (const lineString of lyricLines) {
    const timeRes = timeReg.exec(lineString);
    if (!timeRes) continue;
    const minute = timeRes[1] * 60 * 1000;
    const second = timeRes[2] * 1000;
    const mSecond = timeRes[3].length === 2 ? timeRes[3] * 10 : timeRes[3] * 1;
    const finTime = minute + second + mSecond;
    const text = lineString.replace(timeReg, "");

    const lyricInfo = {
      time: finTime,
      text,
    };
    lyricInfos.push(lyricInfo);
  }
  return lyricInfos;
}
