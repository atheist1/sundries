/**
 * 给定一个非空的字符串，判断它是否可以由它的一个子串重复多次构成。给定的字符串只含有小写英文字母，并且长度不超过10000
 * @param {*} s 
 */
var repeatedSubstringPattern = function(s) {
  return s.match(/^(\S+)\1+$/) !== null;
};
var buble = function (arr) {
  for (let i = 0; i < arr.length; i += 1) {
    for (let j = 0; j < arr.length - i; j += 1) {
      if (arr[j + 1] < arr[j]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
var selectSort = function (arr) {
  let max;
  for (let i = 0; i < arr.length; i += 1) {
    max = i;
    for (let j = i + 1; j < arr.length; j += 1) {
      if (arr[max] > arr[j]) {
        max = j;
      }
    }
    [arr[i], arr[max]] = [arr[max], arr[i]];
  }
  return arr;
}
var sortArrayByParity = function(A) {
  let start = 0;
  let end = A.length - 1;
  // [A[start], A[end]] = [A[end], A[start]];
  while(start <= end) {
    if (A[start] % 2 === 1) {
      if (A[end] % 2 === 0) {
        [A[start], A[end]] = [A[end], A[start]];
      }
      end --;
    } else {
      start ++;
    }
  }
  return A;
};
var sortArrayByParityII = function(A) {
  let start = 0;
  let end = A.length - 1;
  // [A[start], A[end]] = [A[end], A[start]];
  while(start <= end) {
    if (A[start] % 2 === 1 && start % 2 === 0) {
      if (A[end] % 2 === 0 && end % 2 === 1) {
        [A[start], A[end]] = [A[end], A[start]];
      }
      end --;
    } else if (A[start] % 2 === 0 && start % 2 === 1) {
      if (A[end] % 2 === 1 && end % 2 === 0) {
        [A[start], A[end]] = [A[end], A[start]];
      }
      end --;
    } else {
      start ++;
    }
  }
  return A;
};