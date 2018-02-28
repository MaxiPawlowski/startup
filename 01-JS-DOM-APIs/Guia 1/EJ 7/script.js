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
    getjson(url,mostrarBroma);
  };

  function get(url,func) {
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
        }
      });
      req.addEventListener("error", function() {
        fail(new Error("Network error"));
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
          return;
        }
        response.json().then(function(data) {
          func(data);
        });
      }
    )
    .catch(function(err) {
      console.log('Network error', err);
    });
  }
}
