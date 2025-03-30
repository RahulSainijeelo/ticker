export const clr = (elapsedTime)=>{
    const quarter = 2;
  
  if (elapsedTime <= quarter) {
    return 'r1sclr1'; 
  } else if (elapsedTime <= 2 * quarter) {
    return 'r1sclr2';
  } else if (elapsedTime <= 3 * quarter) {
    return 'r1sclr3';
  } else {
    return 'r1sclr4';
  }
}