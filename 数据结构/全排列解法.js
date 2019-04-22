/***
 * 增广矩阵机型初等行变化的算法
 *
 * @param value
 *            需要算的增广矩阵
 * @return 计算的结果
 */
function mathDeterminantCalculation(value) {
  // 当矩阵的行数大于2时
  for (let i = 0; i < value.length; i++) {
    // 检查数组对角线位置的数值是否是0，如果是零则对该数组进行调换，查找到一行不为0的进行调换
    if (value[i][i] == 0) {
      value = changeDeterminantNoZero(value, i, i);
    }
    for (let j = 0; j < i; j++) {
      // 让开始处理的行的首位为0处理为三角形式
      // 如果要处理的列为0则和自己调换一下位置，这样就省去了计算
      if (value[i][j] == 0) {
        continue;
      }
      // 如果要是要处理的行是0则和上面的一行进行调换
      if (value[j][j] == 0) {
        let temp = value[i];
        value[i] = value[i - 1];
        value[i - 1] = temp;
        continue;
      }
      let ratio = -(value[i][j] / value[j][j]);
      value[i] = addValue(value[i], value[j], ratio);
    }
  }
  return value;
}

/***
 * 将i行之前的每一行乘以一个系数，使得从i行的第i列之前的数字置换为0
 *
 * @param currentRow
 *            当前要处理的行
 * @param frontRow
 *            i行之前的遍历的行
 * @param ratio
 *            要乘以的系数
 * @return 将i行i列之前数字置换为0后的新的行
 */
function addValue(currentRow, frontRow, ratio) {
  for (let i = 0; i < currentRow.length; i++) {
    currentRow[i] += frontRow[i] * ratio;
    currentRow[i] = parseFloat(currentRow[i]);
    //( df.format(currentRow[i]));
    //Double.parseDouble(df.format(currentRow[i]));
  }
  return currentRow;
}

/**
 * 指定列的位置是否为0，查找第一个不为0的位置的行进行位置调换，如果没有则返回原来的值
 *
 * @param determinant
 *            需要处理的行列式
 * @param line
 *            要调换的行
 * @param row
 *            要判断的列
 */
function changeDeterminantNoZero(determinant, line, row) {
  for (let j = line; j < determinant.length; j++) {
    // 进行行调换
    if (determinant[j][row] != 0) {
      let temp = determinant[line];
      determinant[line] = determinant[j];
      determinant[j] = temp;
      return determinant;
    }
  }
  return determinant;
}

/**
 * 将系数矩阵和方程值的矩阵进行合并成增广矩阵
 *
 * @param coefficient
 *            系数矩阵
 * @param value
 *            方程值
 * @return 增广矩阵
 */
function transferMatrix(coefficient, value) {
  let temp = new Array(coefficient.length);
  if (coefficient.length != value.length) {
    return temp;
  }
  // 将方程值添加到系数矩阵中
  for (let i = 0; i < coefficient.length; i++) {
    temp[i] = new Array(coefficient[0].length + 1);
    for (let j = 0; j < coefficient[0].length; j++) {
      temp[i][j] = coefficient[i][j];
    }
  }
  for (let i = 0; i < value.length; i++) {
    temp[i][temp[i].length - 1] = value[i];
  }
  return temp;
}

/**
 * 检查有效的行数，看非零行的个数
 *
 * @param value
 *            需要检查的数组
 * @return 非零行的个数
 */
function effectiveMatrix(value) {
  for (let i = value.length - 1; i > -1; i--) {
    for (let j = 0; j < value[i].length; j++) {
      if (value[i][j] != 0) {
        return i + 1;
      }
    }
  }
  return 0;
}

/**
 * 当方程组有解的时候计算方程组的解
 *
 * @param mathMatrix
 *            方程组的增广矩阵
 * @return 方程组的解
 */

function calculationResult(mathMatrix) {
  // 有解时方程组的个数等于方程组的未知数
  let result = new Array(mathMatrix.length);
  for (let i = mathMatrix.length - 1; i > -1; i--) {
    let temp = 0;
    for (let j = mathMatrix[i].length; j > 0; j--) {
      // 第一个为方程的解，需要将解赋值给临时变量
      if (mathMatrix[i][j - 1] != 0) {
        if (j == mathMatrix[i].length) {
          temp = mathMatrix[i][j - 1];
        } else if (j - 1 > -1 && result[j - 1] != undefined) {
          temp -= mathMatrix[i][j - 1] * result[j - 1];
          //console.log((j - 1 > -1 )&&(typeof(result[j - 1])!=undefined)+";j="+j+";undefined="+(typeof(result[j - 1])!=undefined));
        } else {
          result[i] = temp / mathMatrix[i][j - 1];
          continue;
        }
      }
    }
  }
  return result;
}

/**
 * 求3个数的最大公约数
 *
 * @param num1 数值1
 * @param num2 数值2
 * @param num3 数值3
 *
 * @return 最大公约数
 */
function getSpecialNum(num1, num2, num3) {
  var specilanum = new Object();
  if (num1 < 1 || num2 < 1 || num3 < 1) {
    specilanum.GCM = -1;
    return specilanum.GCM;
  }
  for (var i = num1; i > 0; i--) {
    if (num1 % i == 0 && num2 % i == 0 && num3 % i == 0) {
      specilanum.GCM = i;
      break;
    }
  }
  return specilanum.GCM;
}

/**
 * permutation解法JS实现
 *
 * @param nums 数组
 *
 * @return 所有不重复的排列
 */
var permuteUnique = function(nums) {
  const fo = (matrix, add) => {
    // 出现一个数认为他是排列完成
    if (!matrix.length) return [[add]];
    const result = [];
    for (const arr of matrix) {
      result.push(
        ...Array(arr.length + 1)
          .fill()
          // 返回的是不同的排列
          // 对个数不同进行不同排列
          // [2,1],[1,2] 
          .map((_, index) => [...arr.slice(0, index), add, ...arr.slice(index)])
      );
    }
    return result;
  };

  let mulArr = [];
  for (const num of nums) {
    mulArr = fo(mulArr, num);
  }
  return [...new Set(mulArr.map(arr => arr.join('|')))].map(item =>
    item.split('|').map(item => +item)
  );
};

function main() {
  console.warn('根据已知条件 2的个数比1的个数多4，总个数为24，总和为80');
  console.warn('推导三元一次方程为： x-y=-4; x+y+z=60; 1x+2y+5z=204;');
  // 系数矩阵
  const test = [[1, -1, 0], [1, 1, 1], [1, 2, 5]];
  // 方程的解
  const value = [-4, 24, 80];
  try {
    // 转换成增广矩阵并进行初等行变化
    const mt = transferMatrix(test, value);
    const mathMatrix = mathDeterminantCalculation(mt);
    // 根据未知数的个数和方程组非零行的个数来判断当前方程组的解的情况
    const result = calculationResult(mathMatrix);
    const x = result[0];
    const y = result[1];
    const z = result[2];
    console.error(`解上述三元一次方程得：x= ${x};  y= ${y};  z= ${z};`);
    // 计算最大公约数
    const gcm = getSpecialNum(x, y, z);
    console.log(`计算三个解的最大公约数为：${gcm}`);
    // 构建单个最小长度不重复的数组
    let list = [];
    for (let i = 0; i < x / gcm; i++) {
      list.push(1);
    }
    for (let i = 0; i < y / gcm; i++) {
      list.push(2);
    }
    for (let i = 0; i < z / gcm; i++) {
      list.push(5);
    }
    list = list.sort(function(a, b) {
      return a - b;
    });
    console.log('构建不重复的单次最大可变数组为：', list);
    const allList = permuteUnique(list);
    console.log(`枚举结果为:(${allList.length}组)`);
    allList.forEach(item => {
      let rlt = [];
      for (let i = 0; i < gcm; i++) {
        rlt = [...rlt, ...item];
      }
      console.log(rlt);
    });
  } catch (e) {
    // TODO Auto-generated catch block
    console.log(e.name + ': ' + e.message);
  }
}

main();
