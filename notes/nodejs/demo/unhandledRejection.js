Promise.resolve().then(() => console.log('p1'))
Promise.reject()
Promise.resolve().then(() => {
    console.log('p2');
    process.nextTick(() => {
        console.log('t3')
        Promise.resolve().then(() => console.log('p3'))
    })
})
process.on('unhandledRejection', () => {
    console.log('unhandledRejection')
})

/*

p1
p2
t3
p3 // 这个为啥比unhandledRejection输出早
unhandledRejection

*/