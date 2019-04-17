class FindClass {
    constructor() {
        this.datas = []
    }
    addMember(member) {
        // this.datas.push(member)
        this.datas[member] = 1
    }
    isExist(member) {
        // o(n)算法 如何改进成o(1)呢
        // return !!~this.datas.indexOf(member)
        return !!this.datas[member]
    }
}
var	fc	= new FindClass();
var	arr	= [0, 3, 5, 6, 9, 34, 23, 78, 99];
for(var	i	= 0;i	<	arr.length;i++){
	fc.addMember(arr[i]);
}
console.log(fc.isExist(3));
console.log(fc.isExist(7));
console.log(fc.isExist(78));
// 上述的算法虽然可以将on复杂度转换成o1,但是在几亿数量的情况下,一个数字四个字节,几亿个数字就是很多m
// 我们需要用一个更巧妙地办法
// 一个数字四个字节 而一个三十二位的整数可以表示0-32的存在与否
// 00000000 00000000 00000000 00000001 ->表示存在数0
// 00000000 00000000 00000000 00000101 -> 表示存在数字0和数字2 所以一个数字5可以表示0和2的同时存在
// 一个长度为10的数组则可以表示0-31的数字存在与否 data[0]存0到31
class Bitmap {
    constructor(size) {
        var bit_arr = new Array(size)
        for (let i = 0; i < size; i++) {
            bit_arr[i] = 0
        }
        this.bit_arr = bit_arr
    }
    addMember(member) {
        var arr_index = parseInt(member / 32) // 获取存入数字是在哪个位置 0号位储存0-31 1号位储存 32-63
        var bit_index = member % 32 // 获取数字所在二进制位
        // 解释下下面的代码 按位或 1 | 1 = 1 0 | 1 = 1 0 | 0 = 0
        // 使用按位或以后将相同位置的1不变,第一次出现数字所在位置置为1,这样就实现了32位记录多个数字
        // 而后面的移位运算等价于将十进制数转为二进制数
        this.bit_arr[arr_index] = this.bit_arr[arr_index] | 1 << bit_index
    }
    isExist(member) {
        var arr_index = parseInt(member / 32)
        var bit_index = member % 32
        // 00000001 00000101 表示5 和 2
        // 这时候
        return !!this.bit_arr[arr_index] & 1 << bit_index // 通过按位与判断是否存在
    }
}
