function myAll(arr){
    let sum = -1
    let result = []

    for(let i = 0,len = arr.length; i < len; i++){
        console.log(i,sum)
        let val = arr[i]
        val.then( res => {
            sum++
            result.push(res)

        })
    }
    return result

}
let a = new Promise( (res,rej) =>{
    setTimeout(() =>{
        console.log(1)
        res(1)
    },1000)

})
let b = new Promise( (res,rej) =>{
    setTimeout(() =>{
        console.log(2)
        res(2)
    },1000)

})


let arr = [a,b]
myAll(arr)