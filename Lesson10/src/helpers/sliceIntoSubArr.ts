export function sliceIntoSubArr(arr:string[], size:number):string[][]{//[[],[],[],...]
    let res = [];
    for (let i = 0; i < arr.length; i += size) {
      const subArr:string[] = arr.slice(i, i+size);
      res.push(subArr) 
    }
    return res
  }
  