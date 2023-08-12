export function convertDateFormat(date:string){
    let curr_dt = new Date(date)
    let month:string =  curr_dt.getMonth() + 1 < 10? (curr_dt.getMonth() + 1).toString():"0"+((curr_dt.getMonth() + 1)).toString();
    let form_dt =  month + "/" + curr_dt.getDate() + "/" +  curr_dt.getFullYear()  ;
    return form_dt;
  }