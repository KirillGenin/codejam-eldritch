import './index.html'
import './index.css' 
import './lib/TweenMax.min.js'
import ancients from './data/ancients.js'
import allColorCards from './data/mythicCards/index.js'
import { targetAncients, historyList, trackerStages, levelInfo, ancientsImg, targetLevel, shuffleButton, shuffleBlock, cardContainer, currentCardImage, showCardButton, tracker } from './modules/const.js'
import mix from './modules/mix.js'
import createMenuLevel from './modules/createMenuLevel.js'
import difficulties from './data/difficulties.js'
import getRain from './modules/getRain.js'

targetAncients.addEventListener('click', (event) => getSettingsByCurrentAncient(event))
shuffleButton.addEventListener('click', () => shuffleCards())
targetLevel.addEventListener('click', (event) => getLevel(event))

showCardButton.addEventListener('click', () => showCard())

let currentAncients,
    totalGreenCards,
    totalBrownCards,
    totalBlueCards,
    level,
    mixGreenCards,
    mixBrownCards,
    mixBlueCards,
    currentBackgroundAncients,
    currentBackgroundAncientsFilter,
    cardSelected = false
let firstStage = []
let secondStage = []
let thirdStage = []
let allStage = []

let currentStageId
let currentStage
let currentStageLength
const arrayStage = ['firstStage', 'secondStage', 'thirdStage']
const arrayColorsCards = ['greenCards', 'brownCards', 'blueCards']


function getSettingsByCurrentAncient(event) {
    if (event.target.id === 'menu-ancients') return

    for (let item of targetAncients.children) {
        item.classList.remove('ancients__item-active')
    }

    event.target.classList.add('ancients__item-active')

    currentAncients = ancients.find(item => item.id === event.target.id)

    currentStageId = 0
    currentStage = 'firstStage'
    currentStageLength = Object.values(currentAncients[currentStage]).reduce((a, c) => a + c, 0)

    totalGreenCards = currentAncients.getTotalCardsByColor().green
    totalBrownCards = currentAncients.getTotalCardsByColor().brown
    totalBlueCards = currentAncients.getTotalCardsByColor().blue

    setTrackerByCurrentAncient()

    console.group('Имя древнего: ', currentAncients.name.toUpperCase())
    console.table(currentAncients)
    console.groupEnd()

    createMenuLevel()

    ancientsImg.style.backgroundImage = `url(${currentAncients.cardFace})`
    currentBackgroundAncients = ancientsImg.style.backgroundImage
    ancientsImg.style.filter = 'drop-shadow(0px 0px 20px rgb(0, 0, 0)) grayscale(0)'
    currentBackgroundAncientsFilter = ancientsImg.style.filter

    cardSelected = true
    ancientsImg.textContent = ''
    currentCardImage.style.backgroundImage = ''
    levelInfo.textContent = ''
    shuffleBlock.classList.remove('hidden')
    shuffleButton.classList.add('hidden')
    cardContainer.classList.add('hidden')
    showCardButton.classList.remove('hidden')
    document.querySelector('.history').classList.add('hidden')
}

function setTrackerByCurrentAncient() {
    for (let i = 0; i < arrayStage.length; i++) {
        for (let j = 0; j < arrayColorsCards.length; j++) {
            tracker[arrayStage[i]][arrayColorsCards[j]].textContent = currentAncients[arrayStage[i]][arrayColorsCards[j]]
        }
    }
}

function getLevel(event) {
    if (event.target.id === 'menu-level') return

    for (let item of targetLevel.children) {
        item.classList.remove('level__item-active')
    }

    event.target.classList.add('level__item-active')

    level = event.target.id
    let currentLevel = difficulties.find(item => item.id === event.target.id)

    setTrackerByCurrentAncient()

    currentStageId = 0
    currentStage = 'firstStage'
    currentStageLength = Object.values(currentAncients[currentStage]).reduce((a, c) => a + c, 0)

    console.group('Выбранная сложность: ', currentLevel.name)
    console.log(currentLevel.desc)
    console.groupEnd()
    
    levelInfo.textContent = currentLevel.desc

    currentCardImage.style.backgroundImage = ''
    shuffleButton.classList.remove('hidden')
    shuffleButton.classList.add('button-shuffle')
    cardContainer.classList.add('hidden')
    showCardButton.classList.remove('hidden')
    document.querySelector('.history').classList.add('hidden')
}

// --------- ОСНОВНАЯ ФУНКЦИЯ ЗАМЕШИВАНИЯ ---------------------------------------------------------

function shuffleCards() {

    firstStage = []
    secondStage = []
    thirdStage = []
    allStage = []
    currentStageId = 0
    currentStage = 'firstStage'
    currentStageLength = Object.values(currentAncients[currentStage]).reduce((a, c) => a + c, 0)

    setTrackerByCurrentAncient()

    const mixColorCards = [null, null, null]
    const totalColorCards = [totalGreenCards, totalBrownCards, totalBlueCards]

    if (level === 'light') {

        for (let i = 0; i < allColorCards.length; i++) {
            let currentColorCardsCopy = allColorCards[i].filter(item => item.difficulty === 'easy')

            if (currentColorCardsCopy.length >= totalColorCards[i]) {
                mix(currentColorCardsCopy).length = totalColorCards[i]
                mixColorCards[i] = currentColorCardsCopy
            } else {
                mix(currentColorCardsCopy)
                let addColorCardsCopy = allColorCards[i].filter(item => item.difficulty === 'normal')
                mix(addColorCardsCopy).length = totalColorCards[i] - currentColorCardsCopy.length
                mixColorCards[i] = mix([...currentColorCardsCopy, ...addColorCardsCopy])
            }
        }
    }
    if (level === 'easy') {

        for (let i = 0; i < allColorCards.length; i++) {
            let currentColorCardsCopy = allColorCards[i].filter(item => item.difficulty !== 'hard')
            mix(currentColorCardsCopy).length = totalColorCards[i]
            mixColorCards[i] = currentColorCardsCopy
        }
    }
    if (level === 'normal') {

        for (let i = 0; i < allColorCards.length; i++) {
            let currentColorCardsCopy = allColorCards[i].map(item => item)
            mix(currentColorCardsCopy).length = totalColorCards[i]
            mixColorCards[i] = currentColorCardsCopy
        }
    }
    if (level === 'hard') {

        for (let i = 0; i < allColorCards.length; i++) {
            let currentColorCardsCopy = allColorCards[i].filter(item => item.difficulty !== 'easy')
            mix(currentColorCardsCopy).length = totalColorCards[i]
            mixColorCards[i] = currentColorCardsCopy
        }
    }
    if (level === 'heavy') {

        for (let i = 0; i < allColorCards.length; i++) {
            let currentColorCardsCopy = allColorCards[i].filter(item => item.difficulty === 'hard')

            if (currentColorCardsCopy.length >= totalColorCards[i]) {
                mix(currentColorCardsCopy).length = totalColorCards[i]
                mixColorCards[i] = currentColorCardsCopy
            } else {
                mix(currentColorCardsCopy)
                let addColorCardsCopy = allColorCards[i].filter(item => item.difficulty === 'normal')
                mix(addColorCardsCopy).length = totalColorCards[i] - currentColorCardsCopy.length
                mixColorCards[i] = mix([...currentColorCardsCopy, ...addColorCardsCopy])
            }
        }
    }

    [mixGreenCards, mixBrownCards, mixBlueCards] = mixColorCards

    firstStage = mix([...mixGreenCards.splice(0, currentAncients.firstStage.greenCards), ...mixBrownCards.splice(0, currentAncients.firstStage.brownCards), ...mixBlueCards.splice(0, currentAncients.firstStage.blueCards)])
    secondStage = mix([...mixGreenCards.splice(0, currentAncients.secondStage.greenCards), ...mixBrownCards.splice(0, currentAncients.secondStage.brownCards), ...mixBlueCards.splice(0, currentAncients.secondStage.blueCards)])
    thirdStage = mix([...mixGreenCards.splice(0, currentAncients.thirdStage.greenCards), ...mixBrownCards.splice(0, currentAncients.thirdStage.brownCards), ...mixBlueCards.splice(0, currentAncients.thirdStage.blueCards)])

    console.group(currentAncients.name.toUpperCase(), '. ПОСЛЕДОВАТЕЛЬНОСТЬ КАРТ В КОЛОДАХ')

    console.group('ПЕРВЫЙ ЭТАП:')
    console.table(firstStage)
    console.groupEnd()

    console.group('ВТОРОЙ ЭТАП:')
    console.table(secondStage)
    console.groupEnd()

    console.group('ТРЕТИЙ ЭТАП:')
    console.table(thirdStage)
    console.groupEnd()

    console.groupEnd()

    allStage = [...thirdStage.reverse(), ...secondStage.reverse(), ...firstStage.reverse()]

    currentCardImage.style.backgroundImage = ''
    cardContainer.classList.remove('hidden')
    shuffleButton.classList.remove('button-shuffle')
    showCardButton.classList.remove('hidden')
    trackerStages.forEach(item => item.classList.remove('complite'))
    document.querySelector('.history').classList.add('hidden')
    historyList.innerHTML = ''

}

function showCard() {

    const currentCard = allStage.pop()

    if (currentCard.color === 'green') tracker[currentStage].greenCards.textContent = Number(tracker[currentStage].greenCards.textContent) - 1

    if (currentCard.color === 'brown') tracker[currentStage].brownCards.textContent = Number(tracker[currentStage].brownCards.textContent) - 1

    if (currentCard.color === 'blue') tracker[currentStage].blueCards.textContent = Number(tracker[currentStage].blueCards.textContent) - 1

    const li = document.createElement('li')
    li.className = 'history__list-item'
    li.innerHTML = `<span class="history__list-info">${currentCard.difficulty}</span><span class="history__list-info">${currentCard.id}</span>`
    historyList.insertBefore(li, historyList.firstChild)

    console.group('Вытянутая карта: ', currentCard.id, ', ', currentCard.difficulty)
    console.groupEnd()

    currentCardImage.style.backgroundImage = `url(${currentCard.cardFace})`
    document.querySelector('.history').classList.remove('hidden')

    checkLevel()
}

function checkLevel() {
    currentStageLength--;
    console.log('Осталось карт: ', currentStageLength)

    if (currentStageLength === 0) {
        trackerStages[currentStageId].classList.add('complite')
        ++currentStageId;
        if (currentStageId > 2) {
            showCardButton.classList.add('hidden')
            setTimeout(() => currentCardImage.style.backgroundImage = '', 3000)
            return null
        }
        currentStage = arrayStage[currentStageId]
        currentStageLength = Object.values(currentAncients[currentStage]).reduce((a, c) => a + c, 0)        
    }
}

// Анимация дождя --------------------------------------------------------------------------

getRain()