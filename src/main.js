import P5 from 'p5'
import 'p5/lib/addons/p5.dom'
import Story from 'storyGenerator.js'
import Letter from 'Letter.js'
import voce from './voice'

function buildLetters(p, textToIterate) {
  let spacingLetter = 10
  const newLettere = []
  for (let i = 0; i < textToIterate.length; i++) {
    spacingLetter += 13
    newLettere[i] = new Letter(p, spacingLetter, window.innerHeight / 2, textToIterate.charAt(i))
  }
  return newLettere
}

const s = function (p) {
  var timeNow
  var updateTime
  var deltaTime
  var introText = ""
  var lettere = []

  function onSpeechEnded() {
    introText = "Press the mouse button for create a new story"
    lettere = buildLetters(p, introText)
  }
  const voice = voce(onSpeechEnded)

  p.setup = function () {
    p.createCanvas(window.innerWidth, window.innerHeight)
    timeNow = p.millis()
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
    lettere.forEach(value => value.render())
  }

  function newStory(jsonInput) {
    var storyFactory = new Story(jsonInput.main.animal, jsonInput.main.umor)
    const story = storyFactory.createStory()
    lettere = buildLetters(p, story)
    voice.speak(story)
  }

  function loadStory(genStory) {
    p.loadJSON('mytest.json', newStory)
  }

  p.mousePressed = function () {
    loadStory(introText)
  }
}

const a = new P5(s)
//  console.log(a) // to avoid linter error
