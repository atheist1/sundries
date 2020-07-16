/*****
 * 求出1~13的整数中1出现的次数,并算出100~1300的整数中1出现的次数？为此他特别数了一下1~13中包含1的数字有1、10、11、12、13
 * 因此共出现6次,但是对于后面问题他就没辙了。ACMer希望你们帮帮他,并把问题更加普遍化,可以很快的求出任意非负整数区间中1出现的次数（从1 到 cur 中1出现的次数）。
 */
var getOne = (number) => {
  // arr表示 从0-9 10-99 100 - 999 1000 - 9999
  /***
   * 从十位(digital)开始看
   * 1209
   * 如果当前位为0高位为12(high)低位为9(low) 
   * 那十位出现1的个数应该由高位决定 十位出现1的范围由0010 -> 1119 所以十位出现1的次数等于000 ->119修改其中任何一个数字保持十位
   * 1不变的次数 即为119-0 + 1加1是0010的情况
   * count = high * digital
   * 
   * 1219
   * 如果当前位为1 高位为12(high)低位为9(low)
   * 理论与上述一致 固定十位 范围从0010 ->1219 出现1的次数为129 - 0 + 1即130次
   * 易得count = high * digital + low + 1
   * 
   * 1239
   * 如果当前为大于1 高位为12(high)低位为9(low)
   * 固定10位 范围从0010->1219 000->129 共130个
   * count = (high + 1) * digital 
   */
  let digital = 1;
  // 开始的条件 高位为nnumber / 10低位为0 开始的位置cur为number % 10
  let high = parseInt(number / 10);
  let low = 0;
  // cur为当前位置
  let cur = number % 10;
  let count = 0;
  while (high || cur) {
    // 判断条件
    if (cur === 0) {
      count += high * digital;
    } else if(cur === 1) {
      count += high * digital + low + 1
    } else {
      count += (high + 1) * digital
    }

    // 低位进位
    low += cur * digital;
    // 重新赋值
    cur = high % 10;
    digital *= 10;
    high = parseInt(high / 10);
  }
  return count;
}
console.log(getOne(100))