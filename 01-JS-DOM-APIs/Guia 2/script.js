class Logger {
  log(event, info){
    console.log(event.type + " " + info);
  }
}
class EventEmitter  {
  func (event, logger){
    logger(event, "Triggered");
  }
  on(event, logger){
    document.addEventListener(event.type, this.func(event, logger));
  }
  emit(event){
    document.dispatchEvent(event);
  }
  off(event, logger){
    document.removeEventListener(event.type, this.func(event, logger))
  }
}
class Actor {
  constructor(name) {
    this.actorName=name;
  }
}
class movie extends EventEmitter {
  constructor(title, year, duration) {
    super();
    this.title = title;
    this.year = year;
    this.duration = duration;
    this.cast=[];
  }
  play (logger) {
    let play = new CustomEvent("play");
    this.on(play, logger);
    this.emit(play);
  }
  pause (logger) {
    let pause = new CustomEvent("pause");
    this.on(pause);
    this.emit(pause);
  }
  resume (logger) {
    let resume = new CustomEvent("resume");
    this.on(resume);
    this.emit(resume);
  }
  addCast (cast) {
    if ( Array.isArray(cast) ){
        this.cast = this.cast.concat(cast);
      return;
    }
    this.cast.push(cast);
  }
};

let social = {
  share(friendName){
    console.log(`Share ${this.title} with ${friendName}`);
  },
  like(friendName){
    console.log(`${friendName} likes ${this.title}`);
  }
};
 Object.assign(movie.prototype, social);



let terminator = new movie("Terminator", 1984, "1:47");
let matrix = new movie("Matrix", 1999, "2:16");
let wall = new movie("Another brick in the wall", 1982, "1:35");



let logger = new Logger();
let resume = new CustomEvent("play");

terminator.on(new CustomEvent("play"), logger.log);
terminator.emit(new CustomEvent("play"), logger.log);
terminator.off(new CustomEvent("play"), logger.log);

terminator.play(logger.log);

terminator.share("mike bossom");


let arnold = new Actor('Arnold Schwarzenegger', 50);
let otherCast = [
  new Actor('Paul Winfield', 50),
  new Actor('Michael Biehn', 50),
  new Actor('Linda Hamilton', 50)
];
terminator.addCast(arnold);
terminator.addCast(otherCast);

console.log(terminator.cast);
