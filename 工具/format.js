// 根据正则生成不同时间格式
function format(time, pattern) {
  if (pattern === void 0) { pattern = 'YYYY-MM-dd'; }
  var date = new Date(time);
  var preFormat = pattern;
  var timeObj = {
    year: date.getFullYear() + '',
    month: date.getMonth() + 1 + '',
    day: date.getDate() + '',
    hour: date.getHours() + '',
    minute: date.getMinutes() + '',
    second: date.getSeconds() + ''
  };
  var arr = [/Y{1,4}/, /M{1,2}/, /d{1,2}/, /H{1,2}/, /m{1,2}/, /s{1,2}/];
  var padding = function(str) {
    return Number(str) < 10 ? '0' + str : (str + '');
  };
  arr.forEach(function(item, index) {
    preFormat = preFormat.replace(item, function(all) {
      var str = '';
      switch (index) {
        case 0:
          str = timeObj.year.substr(-all.length);
          break;
        case 1:
          str = padding(timeObj.month);
          break;
        case 2:
          str = padding(timeObj.day);
          break;
        case 3:
          str = padding(timeObj.hour);
          break;
        case 4:
          str = padding(timeObj.minute);
          break;
        case 5:
          str = padding(timeObj.second);
          break;
      }
      return str;
    });
  });
  return preFormat;
}