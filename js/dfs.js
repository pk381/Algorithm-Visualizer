function dfs(s, node, visited) {
  visited[node] = true;

  node_update(nodes[node - 1], "red");

  s[node].forEach((element) => {
    let line = node * 10 + element;
    line = Math.min(line, element * 10 + node);
    line = line + "";

    if (!visited[element]) {
      edge_update(line, "#d885aa");
      node_update(nodes[element - 1], "yellow");

      dfs(s, element, visited);
      edge_update(line, "blue");
    }
  });

  node_update(nodes[node - 1], "#e26d6d");
}

function DFS(s, node) {
  n_delay = 0;
  let visited = new Array(s.length);

  for (let i = 0; i < s.length; i++) {
    visited[i] = false;
  }

  node_update(nodes[node - 1], "#7878e5");

  dfs(s, node, visited);

  node_update(nodes[node - 1], "#7878e5");
}
