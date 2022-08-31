import {targetLevel} from './const.js'
import difficulties from '../data/difficulties.js'

function createMenuLevel() {
    targetLevel.innerHTML = ''
    difficulties.forEach(item => {
        const li = document.createElement('li')
        li.className = 'level__item'
        li.textContent = item.name
        li.id = item.id
        targetLevel.appendChild(li)
    })
}

export default createMenuLevel