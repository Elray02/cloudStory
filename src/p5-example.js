import P5 from 'p5'
import 'p5/lib/addons/p5.sound'
import 'p5/lib/addons/p5.dom'
import  '../externalLib/p5.speech.js'
import Story from 'storyGenerator.js'
import Letter from 'Letter.js'

const s = function (p) {
  var timeNow
  var updateTime
  var deltaTime
  var voceNarrante = new P5.Speech('Google UK English Male')
  var introText = ""
  voceNarrante.onEnd = speechEnded
  var lettere = []
  const bodyWidth = window.innerWidth
  const bodyHeight = window.innerHeight
  p.setup = function () {
    p.createCanvas(bodyWidth, bodyHeight)
    timeNow = p.millis()
    voceNarrante.setRate(0.7)
    voceNarrante.setPitch(0.9)
    p.background(70)
    p.textSize(15)
    p.textFont("Helvetica")
  }

  p.draw = function () {
    p.background(70)
    updateTime = p.millis()
    deltaTime = updateTime - timeNow
    if (deltaTime > 3000) {
      timeNow = p.millis()
    }
    // display the text with animation
    lettere.forEach(function (value, index) {
      lettere[index].display()
      lettere[index].animate()
    })
  }
  p.mousePressed = function () {
    voceNarrante.speak("testo di prova")
    fromJsonToStory(introText)
  }

  // controll whenl the voice has end to speak
  function speechEnded() {
    introText = "Schiacchia un pulsante per generare una storia"
    fromStringToChar(introText, lettere)
    console.log("finito")
  }
  // read the JSON file and feed tracery with data
  function fromJsonToStory(genStory) {
    p.loadJSON('mytest.json', function (jsonInput) {
      var story = new Story(jsonInput.main.animal, jsonInput.main.umor)
      genStory = story.createStory()
      lettere = fromStringToChar(genStory, lettere)
//      voceNarrante.speak(genStory)
    })
  }
// Transform one string to signle char for make the text animation
  function fromStringToChar(textToIterate, charContainer) {
    charContainer = []
    var spacingLetter = 10
    for (var i = 0; i < textToIterate.length; i++) {
      spacingLetter += 13
      charContainer[i] = new Letter(p, spacingLetter, bodyHeight / 2, textToIterate.charAt(i))
    }
    return charContainer
  }
}

const a = new P5(s)
//  console.log(a) // to avoid linter error
