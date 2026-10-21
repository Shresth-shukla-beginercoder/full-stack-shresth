let todolist = []

let q=true

while(q){
    
    let enter = prompt("What do you like to do in list - ")

    if(enter.toLowerCase() ==='add'){
        let add = prompt("What you want to add - ")
        todolist.push(add)
        console.log(`${add} list is added`)
        console.log("*****************************************")

    }
    else if (enter.toLowerCase() ==='list') {
       for(let i =0 ; i<todolist.length;i++)
        console.log(`${i} ${todolist[i]}`)
      console.log("Todo list are given above ")
        console.log("*****************************************")
    } 
    else if (enter.toLowerCase() ==='delete'){
          let del = parseInt(prompt("What index u want to delete - "))
        todolist.splice(del,1)
          console.log("Givem index list is deleted")
        console.log("*****************************************")
    }
    else if(enter.toLowerCase() ==='quit'){
        q=false
          console.log("Thq for your work ")
        console.log("*****************************************")
    }
}