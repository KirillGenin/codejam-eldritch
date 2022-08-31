const targetAncients = document.getElementById('menu-ancients')
const ancientsImg = document.querySelector('.ancients__img')
const targetLevel = document.getElementById('menu-level')
const shuffleButton = document.getElementById('shuffle')
const shuffleBlock = document.querySelector('.shuffle')
const cardContainer = document.querySelector('.card-container')
const currentCardImage = document.getElementById('current-card')
const showCardButton = document.getElementById('show-card')
const levelInfo = document.querySelector('.level-info')

const stageOneGreen = document.getElementById('stage-one-green')
const stageOneBrown = document.getElementById('stage-one-brown')
const stageOneBlue = document.getElementById('stage-one-blue')
const stageTwoGreen = document.getElementById('stage-two-green')
const stageTwoBrown = document.getElementById('stage-two-brown')
const stageTwoBlue = document.getElementById('stage-two-blue')
const stageThreeGreen = document.getElementById('stage-three-green')
const stageThreeBrown = document.getElementById('stage-three-brown')
const stageThreeBlue = document.getElementById('stage-three-blue')
const trackerStages = document.querySelectorAll('.tracker__stage')
const historyList = document.querySelector('.history__list')

const tracker = {
  firstStage: {
    greenCards: stageOneGreen,
    brownCards: stageOneBrown,
    blueCards: stageOneBlue
  },
  secondStage: {
    greenCards: stageTwoGreen,
    brownCards: stageTwoBrown,
    blueCards: stageTwoBlue
  },
  thirdStage: {
    greenCards: stageThreeGreen,
    brownCards: stageThreeBrown,
    blueCards: stageThreeBlue
  }
}

export {targetAncients, historyList, trackerStages, levelInfo, ancientsImg, targetLevel, shuffleButton, shuffleBlock, cardContainer, currentCardImage, showCardButton, tracker}