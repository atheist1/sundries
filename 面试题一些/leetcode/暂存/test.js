var f = function (n, count) {
  let groupCount = parseInt(n / 4);
  let res = 0;

  let arr = [groupCount, groupCount, groupCount, n - 3 * groupCount]
  console.log(arr)
  for (let i = 0; i < arr.length; i += 1) {
    let rlt = arr.length % 2 === 0 ? parseInt(arr[i] / 2) : (parseInt(arr[i] / 2) + (arr[i] % 2))
    res += rlt
  }
  console.log(res)
  if (res === 4) return 4
  if (res < 4) return res - 1
  count += f(res, count) + res
  return count
}
console.log(f(146, 0))