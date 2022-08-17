/**
 * 比较时间距离当前时间相差多少天
 * @param startDate
 * @returns {number}
 */
export function getDays(startDate) {
  let endTime=new Date(Date.parse(`${new Date().getFullYear()}/${new Date().getMonth()+1}/${new Date().getDate()}` ));
  let startTime = new Date(Date.parse(startDate.replace(/-/g, "/")));
  let dates = Math.abs((endTime-startTime)) / (1000 * 60 * 60 * 24);
  return dates;
}
