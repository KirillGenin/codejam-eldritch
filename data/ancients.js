import Ancients from '../assets/Ancients/index.js'

 function getTotalCardsByColor() {
  return {
    green: this.firstStage.greenCards + this.secondStage.greenCards + this.thirdStage.greenCards,
    brown: this.firstStage.brownCards + this.secondStage.brownCards + this.thirdStage.brownCards,
    blue: this.firstStage.blueCards + this.secondStage.blueCards + this.thirdStage.blueCards
  }
  
}

const ancientsData = [
  {
    id: 'azathoth',
    name: 'azathoth',
    cardFace: Ancients.azathoth,
    firstStage: {
      greenCards: 1,
      brownCards: 2,
      blueCards: 1
    },
    secondStage: {
      greenCards: 2,
      brownCards: 3,
      blueCards: 1 
    },
    thirdStage: {
      greenCards: 2,
      brownCards: 4,
      blueCards: 0
    },
    getTotalCardsByColor
  },
  {
    id: 'cthulhu',
    name: 'cthulhu',
    cardFace: Ancients.cthulhu,
    firstStage: {
      greenCards: 0,
      brownCards: 2,
      blueCards: 2      
    },
    secondStage: {
      greenCards: 1,
      brownCards: 3,
      blueCards: 0      
    },
    thirdStage: {
      greenCards: 3,
      brownCards: 4,
      blueCards: 0      
    },
    getTotalCardsByColor
  },
  {
    id: 'iogSothoth',
    name: 'iogSothoth',
    cardFace: Ancients.iogSothoth,
    firstStage: {
      greenCards: 0,
      brownCards: 2,
      blueCards: 1      
    },
    secondStage: {
      greenCards: 2,
      brownCards: 3,
      blueCards: 1      
    },
    thirdStage: {
      greenCards: 3,
      brownCards: 4,
      blueCards: 0      
    },
    getTotalCardsByColor
  },
  {
    id: 'shubNiggurath',
    name: 'shubNiggurath',
    cardFace: Ancients.shubNiggurath,
    firstStage: {
      greenCards: 1,
      brownCards: 2,
      blueCards: 1      
    },
    secondStage: {
      greenCards: 3,
      brownCards: 2,
      blueCards: 1      
    },
    thirdStage: {
      greenCards: 2,
      brownCards: 4,
      blueCards: 0      
    },
    getTotalCardsByColor
  },
]

export default ancientsData