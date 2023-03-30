let speed = document.querySelectorAll(".speed li a");

for (var i = 0; i < speed.length; i++) {
  speed[i].addEventListener("click", runspeed);
}

let delay_time = 100;

function runspeed() {
  speed_show.innerHTML = this.innerHTML;

  switch (speed_show.innerHTML) {
    case "Speed-1x":
      delay_time = 1000;
      break;
    case "Speed-2x":
      delay_time = 500;
      break;
    case "Speed-3x":
      delay_time = 250;
      break;
    case "Speed-4x":
      delay_time = 100;
      break;
  }
}
function div_update(cont, height, color) {
  window.setTimeout(function () {
    cont.innerText = height;
    cont.style =
      " margin:0% " +
      margin_size +
      "%; width:" +
      (100 / array_size - 2 * margin_size) +
      "%; height:" +
      (height + 20) +
      "%; background-color:" +
      color +
      ";" +
      "max-width: 40px;" +
      "display: flex;" +
      "max-height: 98%;" +
      "justify-content: center;" +
      "border: 1px solid black;" +
      "border-radius: 2px";
  }, (c_delay += delay_time));
}

function node_update(node, color) {
  delay_time += 100;
  window.setTimeout(function () {
    node.style =
      "background-color:" + color + ";" + "display: block;" + "color: black";
  }, (n_delay += delay_time));
}

function edge_update(edge, color) {

  delay_time += 100;
  window.setTimeout(function () {
    let line = "line";

    for (let i = 0; i < edges.length; i++) {
      if (edges[i].id == line.concat(edge)) {

        edges[i].style =
          "border: 2px solid " +
          color + ";" +
          "display: block";
          // "animation: traverseLine 1s ease-in-out forwards;";
      }
    }
  }, (n_delay += delay_time));
}
