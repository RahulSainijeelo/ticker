export default function stats(array) {
    const elapsedTime = array.reduce((sum, subArray) => {
      const lastElement = subArray[subArray.length - 2];
      return sum + (lastElement || 0);
    }, 0);
  
    const quarter = 2;
    let className = "r10sclr1";
    let milestoneMessage = "⏳ Time to grind!";
  
    if (elapsedTime <= quarter) {
      className = "r10sclr1";
      milestoneMessage = "⏳ Time to grind!";
    } else if (elapsedTime <= 2 * quarter) {
      className = "r10sclr2";
      milestoneMessage = "🔥 Momentum up!";
    } else if (elapsedTime <= 3 * quarter) {
      className = "r10sclr3";
      milestoneMessage = "💪 Beast mode!";
    } else if (elapsedTime < 4 * quarter) {
      className = "r10sclr4";
      milestoneMessage = "🚀 Elite focus!";
    } else {
      className = "r10sclr5";
      milestoneMessage = "🏆 Mission complete!";
    }
  
    return { className, milestoneMessage, elapsedTime };
  }
  