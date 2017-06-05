import P5 from 'p5'
import  '../externalLib/p5.speech.js'

export default function voce(onEnd) {
  const voceNarrante = new P5.Speech('Google UK English Male')

  voceNarrante.onEnd = onEnd
  voceNarrante.setRate(0.7)
  voceNarrante.setPitch(0.9)

  function speak(story) {
    voceNarrante.speak(story)
  }

  return {
    speak,
  }
}
