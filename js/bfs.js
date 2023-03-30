function BFS(s, node) {
  n_delay = 0;
  console.log("in bfs");

  let start = node;
  let visited = new Array(s.length);

  for (let i = 0; i < s.length; i++) {
    visited[i] = false;
  }

  let queue = [];

  visited[node] = true;
  node_update(nodes[node - 1], "#7878e5");

  queue.push(node);

  while (queue.length > 0) {
    node = queue[0];

    node_update(nodes[node - 1], "red");
    console.log(node);
    queue.shift();

    s[node].forEach((element) => {
      let line = node * 10 + element;
      line = Math.min(line, element * 10 + node);
      line = line + "";

      if (!visited[element]) {
        edge_update(line, "#d885aa");
        node_update(nodes[element - 1], "yellow");
        visited[element] = true;
        queue.push(element);
      }
    });

    node_update(nodes[node - 1], "yellow");
  }

  node_update(nodes[start - 1], "#7878e5");
}
