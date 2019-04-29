  /**
   * 4月22日算法思考题：某数学家的生日，月份和日期均为一位数
   * 月份和日期组成一个两位数
   * 这个两位数的3次方是个四位数
   * 4次方是个六位数
   * 四位数和六位数的各个数字是0~9这10个数字
   * 且不重复
   * 数学家的生日是？
   */
  let  numSplit = num => {
    return String.prototype.split.call(num, '')
  }
  for (let date = 1; date < 10; date++) {
    for (let month = 1; month < 10; month++) {
      const $2 = parseInt(month + '' + date)
      const $4 = Math.pow($2, 3)
      const $6 = Math.pow($2, 4)
      if (parseInt($4 / 1e3) >=1 && parseInt($4 / 1e3) < 10 && parseInt($6 / 1e5) >= 1 && parseInt($6 / 1e5) < 10) {
        const $4Arr = numSplit($4)
        const $6Arr = numSplit($6)
        let $all = $4Arr.concat($6Arr).sort()
        const set = new Set($all)
        const $trueAll = numSplit(1234567890).sort()
        if (set.size === 10) {
          if ($all.toString() === $trueAll.toString()) {
            console.log(Math.pow($6, 1/4))
          }
        }
      }
    }
  }