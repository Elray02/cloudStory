// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// A class to describe a single Letter
class Letter {
  // var letter
  // // The object knows its original "home" location
  // var homex,homey
  // // As well as its current location
  // var x,y
  // // And an angle of rotation
  // float theta
  p5 = null
  constructor(p5, x_, y_, letter_) {
    this.p5 = p5
    this.homex = this.x = x_
    this.homey = this.y = y_
    this.x = this.p5.random(this.p5.width)
    this.y = this.p5.random(this.p5.height)
    this.theta = this.p5.random(this.p5.TWOPI)
    this.letter = letter_
  }

  // Display the letter
  display() {
    this.p5.fill(0)
    this.p5.textAlign(this.p5.LEFT)
    // User translate and rotate to draw the letter
    this.p5.push()
    this.p5.translate(this.x, this.y)
    this.p5.rotate(this.theta)
    this.p5.text(this.letter, 0, 0)
    this.p5.pop()
  }
  // Return the letter home using lerp!
  animate() {
    this.x = this.p5.lerp(this.x, this.homex, 0.05)
    this.y = this.p5.lerp(this.y, this.homey, 0.05)
    this.theta = this.p5.lerp(this.theta, 0, 0.05)
  }
}

export default Letter
