// display algorithm and speed
let algo = document.querySelectorAll("#algo li a");
let algorithm = document.getElementById("algorithm");
let speed_show = document.getElementById("speed");

let nodes_no = document.getElementById("nodes_no");
let insert_nodes = document.getElementById("insert_nodes");

// taking nodes and edges
let nodes = document.querySelectorAll("#nodes div");
let edges = document.querySelectorAll("#edges div");

insert_nodes.addEventListener("click", () => {
  nodes_no = parseInt(nodes_no.value);

  for (var i = 0; i < nodes_no; i++) {
    nodes[i].style = "display: block";
  }
});

// making graph
let adj = [];
// nodes_no = 9;
for (let i = 0; i < 9; i++) {
  adj[i] = "";
}

let edges_no = document.getElementById("edges_no");
let insert_edges = document.getElementById("insert_edges");

insert_edges.addEventListener("click", () => {
  let strings = edges_no.value.split(",");

  for (var i = 0; i < strings.length; i++) {
    strings[i] = strings[i].replace(/ /g, "");
  }
  
// displaying graph
  let graph = document.getElementById("graph");
  graph.innerHTML = strings;

  let line = "line";
  for (let i = 0; i < strings.length; i++) {
    for (let j = 0; j < edges.length; j++) {
      if (edges[j].id == line.concat(strings[i])) {
        edges[j].style = "display: block";
        edges[j].style.animationPlayState = "paused";
        break;
      }
    }
  }

  for (let i = 0; i < strings.length; i++) {
    let st = strings[i].split("");

    let n1 = parseInt(st[0]);
    let n2 = parseInt(st[1]);

    adj[n1] = adj[n1] + st[1];
    adj[n2] = adj[n2] + st[0];
  }

  for (let i = 1; i < adj.length; i++) {
    let str = adj[i].split("");

    for (let j = 0; j < str.length; j++) {
      str[j] = parseInt(str[j]);
    }

    adj[i] = str;
  }

  console.log(adj);
});


// running algorithms
let run_algo = document.getElementById("run");

for (var i = 0; i < algo.length; i++) {
  algo[i].addEventListener("click", runalgo);
}

function runalgo() {
  algorithm.innerHTML = this.innerHTML;
}

run_algo.addEventListener("click", run);

function run() {
  console.log(algorithm.innerHTML);
  switch (algorithm.innerHTML) {
    case "BFS":
      BFS(adj, 1);
      break;
    case "DFS":
      DFS(adj, 1);
      break;
    case "Prims Algorithm":
      break;
    case "Kruskal's Algorithm":
      break;
  }
}
