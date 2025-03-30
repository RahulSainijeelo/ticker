export default function totalTimeStamp(s_tamp, duration,extra) {
  let cmp = duration / (1000 * 60 * 60);
  let dsd;
  if (cmp > 3) {
    dsd = 900000;
  } else {
    dsd = 300000;
  }
  return s_tamp + duration;
}
