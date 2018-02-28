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
    let xmlhttp = new XMLHttpRequest();
    let url = "http://api.icndb.com/jokes/random";

    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let joke = JSON.parse(this.responseText);
        document.getElementById("joke1").innerHTML = joke.value.joke;
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }; 
}
