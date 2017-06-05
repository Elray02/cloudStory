import P5 from 'p5'
import 'p5/lib/addons/p5.dom'
import Story from 'storyGenerator.js'
import Letter from 'Letter.js'
import voce from './voice'

const startX = 10
const startY = window.innerHeight / 2
const fontSize = 15

function buildLetters(p, font, text) {
  let x = startX
  let y = startY
  const delta = font.textBounds('l', x, y, fontSize).h * 2
  // string to array: https://stackoverflow.com/a/38066567/433685
  const newLettere = Array.from(text).map((char, i) => {
    const bounds = font.textBounds(char, x, y, fontSize)
    if (x > window.innerWidth - startX) {
      x = startX
      y += delta
    }
    const l = new Letter(p, x, y, char)
    x += Math.ceil(bounds.w) + 2
    return l
  })
  return newLettere
}

const s = function (p) {
  var timeNow
  var updateTime
  var deltaTime
  var introText = ""
  var lettere = []
  var font = null

  function onSpeechEnded() {
    introText = "Press the mouse button for create a new story"
    lettere = buildLetters(p, font, introText)
  }
  const voice = voce(onSpeechEnded)

  p.setup = function () {
    p.createCanvas(window.innerWidth, window.innerHeight)

    font = p.loadFont('assets/Cormorant-Regular.otf')
    p.textFont(font)
    p.textSize(15)

    timeNow = p.millis()
  }

  p.draw = function () {
    p.background(170)
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
    console.log(story)
    lettere = buildLetters(p, font, story)
    // voice.speak(story)
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
