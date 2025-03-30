export default function isExtraDay(inp,index,length) {
    if(index == 0){
        for (let i = 23; i <= 31; i++) {
            if (inp == i) {
              return "r1s1t";
            }
          }
          return "r1s1f";
    }else if(length==index){
        for (let i = 1; i <= 7; i++) {
            if (inp == i) {
              return "r1s1t";
            }
          }
          return "r1s1f";
    }
    else{
        return "";
    }
}
