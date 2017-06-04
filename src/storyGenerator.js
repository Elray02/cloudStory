import  tracery from 'tracery-grammar'

class Story {
  constructor(animale, emozione) {
    this.animal = animale
    this.emotion = emozione
    this.grammar = tracery.createGrammar({
      "name": ["Arjun", "Yuuma", "Darcy", "Mia", "Chiaki", "Izzi", "Azra", "Lina"],
      "animal": [this.animal],
      "mood": ["vexed", "indignant", "impassioned", "wistful", "astute", "courteous"],
      "story": ["#hero# traveled with her pet #heroPet#. #hero# was never #mood#, for the #heroPet# was always too #mood#."],
      "intro": ["umm this remind me that time when", "to me seams like when", "there was a time when", "it comes to my mind that time when"],
      "origin": ["#intro# #[hero:#name#][heroPet:#animal#]story#"]
    })
  }

  createStory() {
    return this.grammar.flatten('#origin#')
  }
}
export default Story
