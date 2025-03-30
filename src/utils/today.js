import moment from "moment";
export default function isToday(inp){
   const  date= moment().format("DD-MMM-YYYY").split("-");
   for(let i = 0;i<date.length;i++){
      if(inp[i] != date[i]){
        return false;
      }
   }
   return true;
}