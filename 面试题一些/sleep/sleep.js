// 用尽可能多的方式实现一个sleep函数
function sleep (time) {
    return new Promise(resolve =>{
        setTimeout(resolve, time);
    })
}
sleep(1000).then(() =>{
    console.log('i slept for about 1000 ')
})
function *sleepGenerator(time) {
    yield new Promise(resolve =>{
        setTimeout(resolve, time);
    })
}
sleepGenerator(1000).next().value.then(res=>{
    console.log('i slept for about 1000 ')
})
async function waitForMinutes(time,callback) {
    await sleep(time)
    return callback()
}
waitForMinutes(1000,() => console.log('i slept for about 1000 '))