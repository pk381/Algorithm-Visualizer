// run code

let algo = document.querySelectorAll("#algo li a");

let run_algo = document.getElementById("run");
let algorithm = document.getElementById("algorithm");

let operation = document.getElementById("speed");
let Value = document.getElementById("graph");

for (var i = 0; i < algo.length; i++) {
  algo[i].addEventListener("click", runalgo);
}

function runalgo() {
  algorithm.innerHTML = this.innerHTML;
}

let insert_btn = document.getElementById("insert");
let delete_btn = document.getElementById("delete");

let h2_value = document.getElementById("h2");

let order = false

insert_btn.addEventListener("click", ()=>{

    let insert_value = document.getElementById("insert_value").value;
    let num = parseInt(insert_value);

    console.log(num+1)

    if(order == false){

        operation.innerText = "Insert Order";


        myTree = new tree(num);
        maxDisplay = num * 50;
        hist = [];
        hist[0] = 'myTree = new tree(' + num + ');';

        order = true;
        h2_value.innerText = "Input Value:-"
    }
    else{

        operation.innerText = "Insert Value";

        myTree.insert(num, num);
        hist.push('myTree.insert(' + num + ',' + num + ');');

    }

    Value.innerText = "" + num;

    let txt = "";

    if (myTree !== null) {
        console.log("yes")
        if (txt.length == 0) txt = myTree.show('toCanvas');
        else myTree.showoff('toCanvas');
    }
})

delete_btn.addEventListener("click", ()=>{

    operation.innerText = "Delete Value";


    let delete_value = document.getElementById("delete_value").value;
    let num = parseInt(delete_value);


    Value.innerText = "" + num;


    console.log("delete num");
    console.log(num + 1);

    if (num == 0) {
        myTree.remove();
        hist.push('myTree.remove();');
    } else {
        myTree.remove(num);
        hist.push('myTree.remove(' + num + ');');
    }
    
    let txt = "";

    if (myTree !== null) {
        console.log("yes")
        if (txt.length == 0) txt = myTree.show('toCanvas');
        else myTree.showoff('toCanvas');
    }
})
