
let algo = document.querySelectorAll("#algo li a");
let run_algo = document.getElementById("run");

let div_sizes = [];
let divs = [];

let input = document.getElementById("user_text");
let insert = document.getElementById("insert");

// display

let algorithm = document.getElementById("algorithm");
let speed_show = document.getElementById("speed");
let array = document.getElementById("array");


let cont = document.getElementById("cont");
cont.style = "flex-direction:row";

insert.addEventListener("click", generate_array);

function generate_array() {

  cont.innerHTML = "";
  let strings = input.value.split(",");
  array_size = strings.length;
  console.log(input.innerHTML);
  array.innerText = input.value;

  for (var i = 0; i < array_size; i++) {
    strings[i] = strings[i].replace(/ /g, "");
    div_sizes[i] = parseInt(strings[i]);
    divs[i] = document.createElement("div");
    divs[i].innerText = div_sizes[i];

    cont.appendChild(divs[i]);
    margin_size = 0.1;
    divs[i].style =
      " margin:0% " +
      margin_size +
      "%; background-color:aqua; width:" +
      (100 / array_size - 2 * margin_size) +
      "%; height:" +
      (div_sizes[i] + 20) +
      "%;" +
      "color: black;" +
      "max-width: 40px;" +
      "max-height: 98%;" +
      "display: flex;" +
      "justify-content: center;" +
      "border: 1px solid black;" +
      "transition: all 0.5s ease-in-out;"+
      "border-radius: 2px" ;
  }
}

for (var i = 0; i < algo.length; i++) {
  algo[i].addEventListener("click", runalgo);
}


function runalgo() {
  algorithm.innerHTML = this.innerHTML;
}

run_algo.addEventListener("click", run);


function run()
{
  console.log(algorithm.innerHTML);
    switch(algorithm.innerHTML)
    {
        case "Bubble Sort": Bubble();
                        break;
        case "Insertion Sort":Insertion();
                        break;
        case "Merge Sort":Merge();
                        break;
        case "Quick Sort":Quick();
                        break;
    }
}
