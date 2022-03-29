const tagsEl = document.getElementById('tags')
const textarea = document.getElementById('textarea')

// The focus function is used to have the page start off in the textarea box (so the cursor will start there without having to be clicked/prompted)
textarea.focus()

textarea.addEventListener('keyup', (e) => {
    createTags(e.target.value)

    if(e.key === 'Enter') {
        setTimeout(() => {
            e.target.value = ''
        }, 10)
        randomSelect()

    }
})

function createTags(input) {
    // This line takes tags inputted by the user and logs them in a way where every time a comma is inputted, it creates a new item within the list
    // The trim function detects any excess whitespace within a list item and cuts it out (example: "2 " would be logged as "2")
    const tags = input.split(',').filter(tag => tag.trim() !== '').map(tag => tag.trim())
    
    tagsEl.innerHTML = ''

    tags.forEach(tag => {
        const tagEl = document.createElement('span')
        tagEl.classList.add('tag')
        tagEl.innerText = tag
        tagsEl.appendChild(tagEl)
    })
}

function randomSelect() {
    const times = 30

    // The following lines are responsible for animating the selecting of each randomized item within the list
    const interval = setInterval(() => {
        const randomTag = pickRandomTag()

        highlightTag(randomTag)

        setTimeout(() => {
            unHighlightTag(randomTag)
        }, 100)
    }, 100);

    // The following lines are responsible for stopping the animation from above and selecting/stopping the selection process on one random item
    setTimeout(() => {
        clearInterval(interval)

        setTimeout(() => {
            const randomTag = pickRandomTag ()

            highlightTag(randomTag)
        }, 100)
    }, times * 100)
}

// Creates a list of all of the tags that were entered, randomizes one, uses math.floor to round down -- this function is used to pick one of the inputted tags at random
function pickRandomTag() {
    const tags = document.querySelectorAll('.tag')
    return tags[Math.floor(Math.random() * tags.length)]
}

// Adds a highlight to one of the user-entered list items
function highlightTag(tag) {
    tag.classList.add('highlight')
}

// Removes the highlight from the front end list
function unHighlightTag(tag) {
    tag.classList.remove('highlight')
}