export default function calPr(array) {
  const elapsedTime = array.reduce((sum, subArray) => {
    const lastElement = subArray[subArray.length - 2];
    return sum + lastElement||0;
  },0);
  const quarter = 2;
  if (elapsedTime <= quarter) {
    return 'r9sclr1';
  } else if (elapsedTime <= 2 * quarter) {
    return 'r9sclr2';
  } else if (elapsedTime <= 3 * quarter) {
    return 'r9sclr3';
  } else if(elapsedTime < 4 * quarter) {
    return 'r9sclr4';
  } else {
    return 'r9sclr5';
  }
}
