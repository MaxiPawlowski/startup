window.onload = function(){
  let element= document.getElementById('hworld')
  var op = 0.1;  // initial opacity
  element.style.display = 'block';
  var timer = setInterval(function () {
    if (op >= 1){
      clearInterval(timer);
    }
    element.style.opacity = op;
    element.style.filter = 'alpha(opacity=' + op * 100 + ")";
    op += op * 0.1;
  }, 10);

  document.getElementById("btn").onclick= function(){

    let url = "http://api.icndb.com/jokes/random";
    let mostrarBroma = function(data){
      document.getElementById('joke1').innerHTML = data.value.joke;
    }
    let mostrarError = function(tipoDeError){
      let node = document.createElement("div");
      let textnode = document.createTextNode(tipoDeError);
      node.setAttribute("class","cred");
      node.appendChild(textnode);
      document.getElementById('hworld').appendChild(node);
    }
    get(url,mostrarBroma,mostrarError);
  };

  function get(url,func,error) {
    return new Promise(function(succeed, fail) {
      var req = new XMLHttpRequest();
      req.open("GET", url, true);
      req.addEventListener("load", function() {
        if (req.status == 200){
          succeed(req.responseText);
          func(JSON.parse(req.responseText));
        }
        else{
          fail(new Error("Status Code: " + req.statusText));
          error("Algo fallo, Error code: " + req.statusText);
        }
      });
      req.addEventListener("error", function() {
        fail(new Error("Network error"));
        error("Network error");
      });
      req.send(null);
    });
  }

  function getjson(url,func,error){
    fetch(url)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Status Code: ' + response.status);
          error("Algo fallo, Error code: " + req.statusText);
          return;
        }
        response.json().then(function(data) {
          func(data);
        });
      }
    )
    .catch(function(err) {
      console.log('Network error', err);
      error("Network error");
    });
  }
}
