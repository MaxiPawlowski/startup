window.onload = function(){
  let matriz = [
    [1, 2],
    [3, 4],
    [5, 6]
  ];
  let table = document.createElement("table");
  let tr, td, textnode;
  for (let i = 0; i < matriz.length; i++) {
    tr=document.createElement("tr");
    for (let j = 0; j < matriz[i].length; j++) {
      td=document.createElement("td");
      textnode=document.createTextNode(matriz[i][j]);
      td.appendChild(textnode);
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  document.body.appendChild(table);
}
