const body = document.getElementsByTagName("body")[0]

// LOWER EXPANDER ADJUSTMENTS ("MORE" BUTTON):

const dashboard = document.getElementsByClassName("dashboard")[0]
const expBot = document.getElementsByClassName("expBot")[0]

// console.log(expBot.lastElementChild.clientWidth)

const removedNodesDown = []
 
// AN OLD "MORE EXPANDER" CODE:
//
// \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/
// const moreExpander = document.createElement("div")
// const moreTxt = document.createTextNode("More")
// const moreArrow = document.createElement("span")
// moreExpander.classList.add("expanderElement", "expElemBot")
// moreArrow.classList.add("expandIndicator")
// moreExpander.setAttribute("id", "more")
// moreExpander.append(moreTxt, moreArrow)

// const moreList = document.createElement("ul")
// // moreList.setAttribute("style", "position: absolute")
// moreList.classList.add("moreList")
// moreExpander.append(moreList)

// moreExpander.addEventListener("click", () => {
//     moreList.classList.toggle("hidden")

//     console.log(removedNodesDown.length)
//     createMoreList()
// })

// function createMoreList() {
//     moreList.innerHTML = ""
//     for (let node of removedNodesDown) {
//         console.log(node[0].childNodes[0].data)
//         // const ul = document.createElement("ul")
//         // ul.innerText = node[0].childNodes[0].data
//         // moreList.appendChild(ul)
//     }
// }
// /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\

// AN OLD ADJUSTER THAT WORKS WITH THE OLD "MORE EXPANDER"
//
// \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/
// function adjustLastExpanderLower() {
// // console.log("do sth")
//     if (hiddenNodes.left.length > 0) { // TODO: maybe move it somewhere else
//         handleNavbarArrows("dummy")
//     }
//     const dashMargin = getComputedStyle(dashboard).getPropertyValue("margin-left")
//     const marginNum = Number(dashMargin.slice(0, -2))

//     const nodeLast = expBot.lastElementChild
//     const nodeWidth = nodeLast?.clientWidth
//     const prevSibl = nodeLast.previousElementSibling
//     const prevWidth = prevSibl?.clientWidth
//     const lastRemoved = removedNodesDown[removedNodesDown.length - 1]?.[0]
//     const lastRemovedWidth = removedNodesDown[removedNodesDown.length - 1]?.[1]

//     if (marginNum === 0) {
//         if (nodeLast.id === "more" && prevSibl) {
//             removedNodesDown.push([prevSibl, prevWidth])
//             expBot.removeChild(prevSibl)
//         } else if (nodeLast.id !== "more") {
//             removedNodesDown.push([nodeLast, nodeWidth])
//             expBot.removeChild(nodeLast)
//             expBot.appendChild(moreExpander)
//         }
//     } else if (marginNum > 0 && marginNum > lastRemovedWidth && removedNodesDown.length >= 2) {
//             expBot.insertBefore(lastRemoved, nodeLast)
//             removedNodesDown.pop()
//     } else if (removedNodesDown.length < 2 && marginNum > lastRemovedWidth - 66 ) { // 66 is a "more" elem length in px
//         if (nodeLast.id === "more") expBot.removeChild(nodeLast)
//         expBot.appendChild(lastRemoved)
//         removedNodesDown.pop()
//     }
// }
// /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\

let previouslyRemovedWidth = []

function adjustLastExpanderLower(e) {
    // console.log("previouslyRemovedWidth: ", previouslyRemovedWidth)
    
    const buttons = expBot.children
    // console.log(buttons)
    const moreButton = document.querySelector("#moreButton")
    const dashMargin = Number(getComputedStyle(dashboard).getPropertyValue("margin-left").slice(0, -2))
    let lastVisible = buttons[0]

    let lastIdx = NaN
    
    // console.log("dashMargin before: ", dashMargin)
    // console.log(buttons[4].clientWidth)
    
    for (let i = 0; i <= buttons.length - 1; i++) {
        const display = getComputedStyle(buttons[i]).getPropertyValue("display")
        const width = buttons[i].clientWidth
        const id = buttons[i].id
        // console.log(i, display, width, id)
        if (display === "flex" && id !== "moreButton") {
            lastVisible = buttons[i]
            lastIdx = i
        }
    }
    if (dashMargin <= 0) {
        // console.log("now")
        previouslyRemovedWidth.push(lastVisible.clientWidth)
        lastVisible.style.display = "none"
        moreButton.style.display = "flex"
    } else if (dashMargin > previouslyRemovedWidth[previouslyRemovedWidth.length - 1] 
                && previouslyRemovedWidth.length > 1) {
        buttons[lastIdx + 1].style.display = "flex"
        previouslyRemovedWidth.pop()
        // console.log(buttons)
    } else if (dashMargin + 66 > previouslyRemovedWidth[0] && previouslyRemovedWidth.length === 1) {
        buttons[lastIdx + 1].style.display = "flex"
        previouslyRemovedWidth.pop()
    }
    if (previouslyRemovedWidth.length <= 0) moreButton.style.display = "none"
    const dashMarginAfter = Number(getComputedStyle(dashboard).getPropertyValue("margin-left").slice(0, -2))
    // if (dashMarginAfter <= 0 || (dashMarginAfter + 66 > previouslyRemovedWidth[0] && previouslyRemovedWidth.length >= 1)) {
    // console.log(previouslyRemovedWidth[previouslyRemovedWidth.length - 1] < dashMarginAfter + 66)
    if (dashMarginAfter <= 0) {
        adjustLastExpanderLower()
    } else if (dashMarginAfter > previouslyRemovedWidth[previouslyRemovedWidth.length - 1] 
        && previouslyRemovedWidth.length > 1) {
        adjustLastExpanderLower()
    } else if (dashMarginAfter + 66 > previouslyRemovedWidth[0] && previouslyRemovedWidth.length === 1) {
        adjustLastExpanderLower()
    }
    
    // console.log(previouslyRemovedWidth[0], dashMarginAfter, moreButton.style.display)




    // if (previouslyRemovedWidth.length === 1 && previouslyRemovedWidth[0] < dashMarginAfter) {
    // if (dashMarginAfter + 66 > previouslyRemovedWidth[0] && previouslyRemovedWidth.length === 1) {
    //     console.log("here")
    //     adjustLastExpanderLower()
    // }

    // if (dashMarginAfter + 66 > 150 && moreButton.style.display !== "none") {
    //     console.log(dashMarginAfter + 66)
    //     // console.log(66 + previouslyRemovedWidth[0], dashMarginAfter)
    //    adjustLastExpanderLower()
    // } // this may cause an callstack overflow so be carefull
}
//window.onload = adjustLastExpanderLower

function adjustMoreExpander() {
    const moreButton = document.querySelector("#moreButton")
    const moreDropdown = moreButton.querySelectorAll(".moreDropdown")

    for (let i = 0; i < expBot.children.length - 1; i++) {
        // console.log(i)
        // console.log(getComputedStyle(expBot.children[i]).display)
        if (getComputedStyle(expBot.children[i]).display === "none") {
            moreDropdown[i].style.display = "flex"
        } else if (getComputedStyle(expBot.children[i]).display === "flex") {
            moreDropdown[i].style.display = "none"
        }
    }
    // console.log(expBot.children)
    // console.log(moreButton.children)
}

// UPPER EXPANDER ADJUSTMENTS (ARROWS):

const search = document.getElementsByClassName("searchButton")[0]
const arrUpNodes = Array.from(document.querySelectorAll(".expElemTop")).map(elem => [elem, elem.clientWidth])
const expBarWidth = arrUpNodes.reduce((a,c) => a + c[1] + 8, -8) // -8 because there are fewer gaps than elements
const hiddenNodes = { left: [], right: [] }
const searchButton = document.querySelector(".searchButton")

leftArrow.style.display = "none"
rightArrow.style.display = "none"

function adjustLastExpanderUpper(e) {
    const countArrow = rightArrow.style.display === "none" ? 0 : 34
    
    let spaceRight = 0
    const searchMarginNum = Number(getComputedStyle(search).getPropertyValue("margin-left").slice(0, -2))
    
    const curRight = arrUpNodes[arrUpNodes.length - 1 - hiddenNodes.right.length]
    // const curRightNode = curRight[0] 
    // const curRightWidth = curRight[1]
    const lastRemoved = hiddenNodes.right[hiddenNodes.right.length - 1]?.[0]
    const lastLength = hiddenNodes.right[hiddenNodes.right.length - 1]?.[1]

    if (searchMarginNum - countArrow <= 0 && hiddenNodes.right.length < arrUpNodes.length - 1) {
        console.log("remove from the right")
        curRight[0].style.display = "none"
        hiddenNodes.right.push(curRight)
        rightArrow.style.display = "flex"
    } else if (searchMarginNum - lastLength - countArrow > 0 && hiddenNodes.right.length >= 2) {
        console.log("add to the right")
        // hiddenNodes.right[hiddenNodes.right.length - 1]?.[0].style.display = "flex" 
        // invalid left side assignemnt (???)
        lastRemoved.style.display = "flex"
        hiddenNodes.right.pop()
    } else if (searchMarginNum - lastLength > 0 && hiddenNodes.right.length <= 1) {
        console.log("add last to the right")
        lastRemoved.style.display = "flex"
        hiddenNodes.right.pop()
        rightArrow.style.display = "none"
    }
}
function handleNavbarArrows(e) {
    const searchMarginNum = Number(getComputedStyle(search).getPropertyValue("margin-left").slice(0, -2))

    const countArrowR = rightArrow.style.display === "none" ? 0 : 34
    // const countArrowL = leftArrow.style.display === "none" ? 0 : 34

    const currentExpWidth = document.querySelector(".expTop").clientWidth
    const spaceAvaiable = searchMarginNum + currentExpWidth - countArrowR

    hiddenNodes.right = []
    hiddenNodes.left = []
    for (let node of arrUpNodes) { node[0].style.display = "none"}
    let spaceLeft = spaceAvaiable
    
    if (e !== "dummy" && e.currentTarget.id === "rightArrow") {
        // SHOW MAXIMUM FROM THE RIGHT
        for (let i = arrUpNodes.length - 1; i >= 0; i--) {
            if (spaceLeft - arrUpNodes[i][1] >= 0) {
                spaceLeft = spaceLeft - arrUpNodes[i][1]
                arrUpNodes[i][0].style.display = "flex"
            } else if (spaceLeft - arrUpNodes[i][1] <= 0) {
                for (let j = i; j >= 0; j--) {
                    hiddenNodes.left.unshift(arrUpNodes[j])
                }
                break
            }
        }
        rightArrow.style.display = "none"
        leftArrow.style.display = "flex"
    } else if (e === "dummy" || e.currentTarget.id === "leftArrow") {
        // SHOW MAXIMUM FROM THE LEFT
        for (let i = 0; i < arrUpNodes.length; i++) {
            if (spaceLeft - arrUpNodes[i][1] + 8 > 0) { // +8 quick fix, left arrow adds one flex gap
                spaceLeft = spaceLeft - arrUpNodes[i][1]
                arrUpNodes[i][0].style.display = "flex"
            } else if (spaceLeft - arrUpNodes[i][1] <= 0) {
                for (let j = i; j < arrUpNodes.length; j++) {
                    hiddenNodes.right.unshift(arrUpNodes[j])
                }
                break
            }
        }
        rightArrow.style.display = "flex"
        leftArrow.style.display = "none"
    }
}

function spaceWarning() {
    const searchMarginNum = Number(getComputedStyle(search).getPropertyValue("margin-left").slice(0, -2))
    const countArrowR = rightArrow.style.display === "none" ? 0 : 34
    const countArrowL = leftArrow.style.display === "none" ? 0 : 34
    const currentExpWidth = document.querySelector(".expTop").clientWidth
    const spaceAvaiable = searchMarginNum + currentExpWidth - countArrowR - countArrowL

    let left = 0
    let right = 0

    for (let i = 0; i < Math.ceil(arrUpNodes.length / 2); i++) {
        left += arrUpNodes[i][1]
        right += arrUpNodes[arrUpNodes.length - 1 - i][1]
    }

    if (left > spaceAvaiable || right > spaceAvaiable) {
        console.warn("Warning: not enough space in the top navbar")
        console.warn("left ", left, " or ", "right ", right, "is more than ", spaceAvaiable)
    }
}

// SEARCH BAR

const searchBar = document.querySelector(".searchBar")
const searchIcon = document.querySelector(".search")

function handleSearchButton(e) {
    console.log("search clicked")
    e.stopPropagation()
    searchBar.classList.toggle("hidden")
    document.querySelector(".expanders.expTop").classList.toggle("hidden")
    if (searchIcon.className === "search") {
        searchIcon.classList.remove("search")
        searchIcon.classList.add("closeSearch")
        
    } else if (searchIcon.className === "closeSearch") {
        searchIcon.classList.remove("closeSearch")
        searchIcon.classList.add("search")
    }
}

searchButton.addEventListener("click", handleSearchButton)
searchBar.addEventListener("click", (e) => e.stopPropagation())


// ADJUST COLUMS HEIGHT

const column = document.querySelector(".column")
const additionals = document.querySelector(".additionals")

function adjustColumnsHeight() {
    const offTop = column.getBoundingClientRect().y > 0 ? column.getBoundingClientRect().y : 0
    const offBottom = window.innerHeight - document.querySelector(".footer").getBoundingClientRect().y
    const desiredHeight = offBottom > 0 ? window.innerHeight - offBottom - offTop : window.innerHeight - offTop
    
    column.style.height = `${desiredHeight}px`
    
    const diff = window.innerHeight - additionals.clientHeight
    additionals.style.top = diff < 0 ? `${diff}px` : `${0}px`
}

// COLUMN NAVIGATION 

const colChapters = document.querySelectorAll(".contentChapter")

function handleChapterClick(e) {
    const expanded1 = e.currentTarget.querySelector(".contentExpanded")
    const arrow = e.currentTarget.querySelector(".chapterIndicatorIcon")
    expanded1.classList.toggle("hidden")
    arrow.classList.toggle("rotateClass")

    // const expanded = e.target.querySelector(".contentExpanded")
    // if (e.target === e.currentTarget || e.target.classList.contains(".chapterIndicator")) {
    //     console.log("a")
    //     expanded.classList.toggle("hidden")
        
    //     // if (expanded.classList.contains("contentExpanded") 
    //     //     && expanded.style.display != "none") {
    //     //     expanded.style.display = "none"
    //     // } else if (expanded.classList.contains("contentExpanded") 
    //     //            && expanded.style.display === "none") {
    //     //     expanded.style.display = "block"
    //     // }
    // }
}

for (let chapter of colChapters) {
    chapter.addEventListener("click", (e) => handleChapterClick(e))
}

// BREADCRUMB

const breadcrumb = document.querySelector(".breadcrumb")
const article = document.querySelector(".article")

const dots = document.querySelector(".detailsContainer")

const detailsSquare = document.querySelector(".breadSummary")
const clickableDots = dots.querySelector(".expDots")

detailsSquare.addEventListener("click", (e) => {
    if (e.target !== e.currentTarget) return
    clickableDots.click()
})

dots.style.display = "none"

let i = 3
let lastWidth = undefined
let lastRemoved = undefined

const widthArray = []

function adjustBreadcrumb(n = 0) {
    if (n >= 6) return
//    console.log("breadcrumb width",breadcrumb.clientWidth)
    if (breadcrumb.clientWidth - 4 > article.clientWidth * 0.7) { // -4 to count padding
        // console.log("REMOVE")
        // console.log("article width * 0.7", article.clientWidth * 0.7)
        
        lastRemoved = breadcrumb.childNodes[i]
        lastWidth = lastRemoved.clientWidth
        // console.log("diff:",breadcrumb.clientWidth - lastWidth)
        // console.log("last width",lastWidth)
        widthArray.unshift(lastWidth)
        lastRemoved.style.display = "none"
        dots.style.display = ""
        i += 2
        adjustBreadcrumb(++n)
    } 
    else if (breadcrumb.clientWidth + widthArray[0]  < article.clientWidth * 0.7) {
        // console.log("ADD")
        // console.log("bread width", breadcrumb.clientWidth)
        // console.log("last width", lastWidth)
        // console.log("sum:",breadcrumb.clientWidth + lastWidth)
        // console.log("article width * 0.7", article.clientWidth * 0.7)
        i -= 2
        lastRemoved = breadcrumb.childNodes[i]
        lastRemoved.style.display = ""
        widthArray.shift()
        lastWidth = widthArray[0]
        if (widthArray.length === 0) dots.style.display = "none"
        adjustBreadcrumb(++n)
    }
}

// MOBILE HAMBURGER AND NAVIGATION PANEL

const mobileNavButton = document.querySelector(".hamburgerMobile")
const mobileNavPanel = document.querySelector(".mobileNavigation")
const mobileNavBackground = document.querySelector(".mobileBackground")
const closeButton = document.querySelector(".mobileClose")

function mobileNavButtonHandler() {
    console.log("asdf")
    mobileNavPanel.classList.remove("hidden")
    mobileNavBackground.classList.remove("hidden")
    body.classList.add("fixedPosition")
}
function closeMobileNavPanels() {
    console.log("test")
    mobileNavPanel.classList.add("hidden")
    contributorsPanel.classList.add("hidden")
    feedbackPanel.classList.add("hidden")
    feedbackThanks.classList.add("hidden")
    mobileNavBackground.classList.add("hidden")
    body.classList.remove("fixedPosition")
}

mobileNavBackground.addEventListener("click", closeMobileNavPanels)
closeButton.addEventListener("click", closeMobileNavPanels)
mobileNavButton.addEventListener("click", mobileNavButtonHandler)

// CONTRIBUTORS PANEL

const contributorsPanel = document.querySelector(".contributorsFrame")
const contributorsButton = document.querySelector(".contributors")
const closeContributors = document.querySelector(".closeContributors .closeIcon")

function contributorsOpener() {
    const avatars = document.querySelectorAll(".contributorPicture")
    avatars.forEach(picture => {
        picture.style.backgroundColor = "#" + Math.floor(Math.random()*16777245).toString(16)
    })


    contributorsPanel.classList.remove("hidden")
    mobileNavBackground.classList.remove("hidden")   
    // fixed position works awful on Firefox
    body.classList.add("fixedPosition")
}

contributorsButton.addEventListener("click", contributorsOpener)
closeContributors.addEventListener("click", closeMobileNavPanels)

// FEEDBACK PANEL

const feedbackBtn = document.querySelector(".feedbackMeta")
const feedbackPanel = document.querySelector(".feedbackFrame")
const closeFeedback = document.querySelectorAll(".closeFeedback")


function feedbackOpener() {
    const feedbackSent = (sessionStorage.getItem("formSent") === "true")
    
    if (feedbackSent === false) {
        feedbackPanel.classList.remove("hidden")
        mobileNavBackground.classList.remove("hidden")
    } else if (feedbackSent === true) {
        feedbackThanks.classList.remove("hidden")
        mobileNavBackground.classList.remove("hidden")
    }
}

feedbackBtn.addEventListener("click", feedbackOpener)
closeFeedback.forEach(cf => cf.addEventListener("click", closeMobileNavPanels))

// FEEDBACK FORM
// FORM BEHAVIOUR

const thumbUp = document.querySelector(".thumbUpButton")
const thumbDown = document.querySelector(".thumbDownButton")
const upSquares = document.querySelector(".thumbIsUpSquares")
const downSquares = document.querySelector(".thumbIsDownSquares")

const submitButton = document.querySelector("#submitButton")
const feedbackForm = document.querySelector(".feedbackForm")
const checkboxes = document.querySelectorAll(".checkbox")
const inputError = document.querySelector(".inputError")

const checkboxLabels = document.querySelectorAll(".checkboxLabel")

function feedbackThumbsSwitch(e) {
    switch(e.currentTarget.id) {
        case "thumbDown":
            thumbUp.classList.remove("clickedBtn")
            thumbDown.classList.add("clickedBtn")
            downSquares.classList.remove("hidden")
            upSquares.classList.add("hidden")
            checkCheckedCheckboxes()
        break;
        case "thumbUp":
            thumbDown.classList.remove("clickedBtn")
            thumbUp.classList.add("clickedBtn")
            upSquares.classList.remove("hidden")
            downSquares.classList.add("hidden")
            checkCheckedCheckboxes()
        break;
    }
    inputError.classList.add("hidden")
}

const feedbackThanks = document.querySelector(".feedbackThanks")

function submitForm() {
    if (Array.from(checkboxes).every(box => box.checked === false)) {
        inputError.classList.remove("hidden")
        return
    }
    console.log("asdf")
    feedbackThanks.classList.remove("hidden")
    feedbackPanel.classList.add("hidden")
    feedbackForm.requestSubmit()
    sessionStorage.setItem("formSent", true)
}

feedbackForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    // feedback doesn't send anything at this point; should use fetch api
    console.log(e)
})

function chooseCheckbox(e) {
    inputError.classList.add("hidden")

    if (e.target.checked === true) {
        e.currentTarget.parentNode.querySelector(".checkbIcon").style.backgroundColor = "#75b6e7"
        e.currentTarget.parentNode.querySelector(".checkbIcon").style.borderColor = "#75b6e7"
        e.currentTarget.parentNode.querySelector(".checkbIcon").classList.add("checkbIcoChecked")
        
    } else if (e.target.checked === false) {
        e.currentTarget.parentNode.querySelector(".checkbIcon").style.backgroundColor = ""
        e.currentTarget.parentNode.querySelector(".checkbIcon").style.borderColor = ""
        e.currentTarget.parentNode.querySelector(".checkbIcon").classList.remove("checkbIcoChecked")
    }
    // sessionStorage.setItem(`${e.currentTarget.name}`,`${e.currentTarget.checked}`)
    updateFormStorage(`${e.currentTarget.name}`,`${e.currentTarget.checked}`)
}

function createFormStorage() {
    const formObj = {}
    checkboxes.forEach(c => formObj[`${c.name}`] = `${c.checked}`)
    const formStr = JSON.stringify(formObj)
    sessionStorage.setItem("form", formStr)
    sessionStorage.setItem("formSent", false)
    // checkboxes.forEach(c => sessionStorage.setItem(`${c.name}`, `${c.checked}`))
}

function updateFormStorage(name, checked) {
    const formObj = JSON.parse(sessionStorage.getItem("form"))
    formObj[name] = checked
    const formStr = JSON.stringify(formObj)
    sessionStorage.setItem("form", formStr)
}

function checkCheckedCheckboxes() {
    const formObj = JSON.parse(sessionStorage.getItem("form"))
    console.log(Object.entries(formObj))

    for (const [key, value] of Object.entries(formObj)) {
        console.log(typeof value)
        const box = document.querySelector(`input[name="${key}"]`)
        const checkedBool = (value === "true")
        box.checked = checkedBool
        // value == "true" ? box.checked = true : box.checked = false
    }

    // formObj.forEach(box => {
    //     document.querySelector(`input[name="${box.name}"]`).checked = box.checked
    // })

    // document.querySelector(`input[name="${checkName}"]`).checked = true
}

function labelHover(e) {
    e.currentTarget.querySelector(".checkbIcon").classList.add("checkbIcoHov")
}

function labelLeave(e) {
    e.currentTarget.querySelector(".checkbIcon").classList.remove("checkbIcoHov")
}

thumbUp.addEventListener("click", (e) => feedbackThumbsSwitch(e))
thumbDown.addEventListener("click", (e) => feedbackThumbsSwitch(e))

checkboxes.forEach(box => box.addEventListener("change", (e) => chooseCheckbox(e)))
submitButton.addEventListener("click", submitForm)

checkboxLabels.forEach(label => label.addEventListener("mouseover", (e) => labelHover(e)))
checkboxLabels.forEach(label => label.addEventListener("mouseleave", (e) => labelLeave(e)))


// BUTTONS ???

const showButton = document.querySelectorAll(".showMore")
const resourcesList = document.querySelectorAll(".resourcesListUl")
let ariaExpanded = false

function handleShowButton() {
    console.log("handleShowButton fun")
    ariaExpanded = !ariaExpanded
    for (let i = 3; i < resourcesList[0].children.length; i++) {
        resourcesList[1].children[i].classList.toggle("hidden")
        resourcesList[0].children[i].classList.toggle("hidden")
    }
    // showButton.forEach(button => button.textContent = ariaExpanded ? "Show less test" : "Show 5 more test")
    showButton[0].textContent = ariaExpanded ? "Show less" : "Show 5 more"
    showButton[1].textContent = ariaExpanded ? "Show less" : "Show 5 more"
    const diff = window.innerHeight - additionals.clientHeight
    additionals.style.top = diff < 0 ? `${diff}px` : `${0}px`
}

// OTHER

function shouldResize(n = 0) {
    console.log(body.scrollWidth , body.clientWidth)
    if (n >= 15) throw new Error('something went wrong');
    if (body.scrollWidth > body.clientWidth) {
        adjustLastExpanderLower()
        adjustLastExpanderUpper()
        // adjustLastExpanderUpper()
        shouldResize(n + 1)
    }
}

function handleClickAll(e) {
    console.log("window event click")
    closeExpandersTop(e)
    closeExpandersBottom(e)
    closeDetails(e)
    closeSearchBar(e)
    function closeExpandersTop(e) {
        const topExpanders = document.querySelectorAll(".expElemTop")
        const openExpanders = Array.from(topExpanders).some(exp => exp.classList.contains("activeTop"))
        if (openExpanders === false) return
        console.log("closer top")
        let elem = e.target
        while (elem !== body) { // replace this with a .contains()?
            if (Array.from(topExpanders).indexOf(elem) > -1) return
            elem = elem.parentElement
        }
        topExpanders.forEach(exp => {
            exp.querySelector(".headerPanel").classList.add("hidden")
            exp.classList.remove("activeTop")
        })
    }
    function closeExpandersBottom(e) {
        const botExpanders = document.querySelectorAll(".expElemBot")
        const openExpanders = Array.from(botExpanders).some(exp => exp.classList.contains("activeTop")) // it should be "activeBot" or sth like that
        if (openExpanders === false) return
        console.log("closer bot")
        let elem = e.target
        while (elem !== body) {
            if (Array.from(botExpanders).indexOf(elem) > -1) return
            elem = elem.parentElement
        }
        botExpanders.forEach(exp => {
            exp.querySelector(".expanderList")?.classList.add("hidden")
            exp.classList.remove("activeTop")
        })
    }
    function closeDetails(e) {
        const details = document.querySelector("details")
        if (details.open === false) return
        let elem = e.target
        while (elem !== body) {
            if (elem === details) return 
            elem = elem.parentElement
        }
        document.querySelector("details").open = false
    }
    function closeSearchBar(e) {
            document.querySelector(".expanders.expTop").classList.remove("hidden")
            searchBar.classList.add("hidden")
        if (searchIcon.className === "closeSearch") {
            searchIcon.classList.remove("closeSearch")
            searchIcon.classList.add("search")
        }
    }
}

function upperButtonHandler(e) {
    // do nothing when a panel is clicked
    let current = e.target 
    while (current !== e.currentTarget) { 
        if (current.classList.contains("headerPanel")) return
        if (current.classList.contains("expanderList")) return
        current = current.parentElement
    }
    // hide previously opened panels 
    document.querySelectorAll(".expElemTop").forEach(elem => {
        if (elem !== e.currentTarget) {
            elem.querySelector(".headerPanel").classList.add("hidden")
            elem.classList.remove("activeTop")
        }
    })
    document.querySelectorAll(".expElemBot").forEach(elem => {
        if (elem !== e.currentTarget) {
            elem.querySelector(".expanderList")?.classList.add("hidden")
            elem.classList.remove("activeTop")
        }
    })
    // toggle panel visibility of a clicked button
    // e.currentTarget.querySelector(".headerPanel")?.classList.toggle("hidden") // don't need it since I use expanderList class in both navbars
    e.currentTarget.querySelector(".expanderList")?.classList.toggle("hidden")
    e.currentTarget.classList.toggle("activeTop")
}

function bottomButtonHandler(e) {
    upperButtonHandler(e)
    adjustMoreExpander()
    // console.log(e.currentTarget)


}

const code = document.querySelectorAll("code") 

function codeFormatting() {
    code.forEach(piece => {
        // piece.innerHTML = piece.innerHTML.replace(/\/\/(.*)/g, '<span class="comment">$&</span>')
        // piece.innerHTML = piece.innerHTML.replace(/const|void|float/g, '<span class="keyword">$&</span>')
        // piece.innerHTML = piece.innerHTML.replace(/(?<!\w)\d+(\.\d+f)?(?!\w)/g, '<span class="number">$&</span>')

        piece.innerHTML = piece.innerHTML.replace(
            /\/\/(.*)|\b(const|void|float)\b|(?<!\w)\d+(\.\d+f)?(?!\w)/g,
            // /\/\/(.*)|(\b(?:const|void|float)\b)|(?<!\w)\d+(\.\d+f)?(?!\w)/g,
            (match, p1, p2, p3, p4) => {
                return `<span class="${p1 ? "comment" : p2 ? "keyword" : p3 ? "number" : p4 ? "number" : ""}">${match}</span>`
            }
        )
    } )
}

codeFormatting()

function setCssVariables() {
    const root = document.querySelector(":root")
    const contrList = document.querySelectorAll(".contributorElem")
    const contrHeight = contrList.length * 50 + 75
    root.style.setProperty("--contrPos", `${contrHeight / 2 + 17}px`)
    root.style.setProperty("--feedbackMaxHeight", `${window.innerHeight - 40}px`)
    // console.log(window.innerHeight)
    // console.log(window.innerHeight - 100)
}

function squeezeContributors() {
    const contrHeight = document.querySelector(".contributorsFrame").offsetHeight
    //if (contrHeight === 0) return // return if contributors are closed
    const contrBaseHeight = 420 // should be calculated as in setCssVariables() fun

    console.log(contrHeight, contrBaseHeight, window.innerHeight)
    console.log(window.innerHeight - 17 * 2 - contrHeight)
    const diff = window.innerHeight - 17 * 2 - contrBaseHeight
    if (diff <= 0) {
        const newHeight = contrBaseHeight + diff // diff is a negative number now
        document.querySelector(".contributorsList").style.height = `${newHeight - 75}px`
        document.querySelector(".contributorsList").style.overflowY = "scroll"
        document.querySelector(".contributorsFrame").style.transform = "translateX(-50%) translateY(-215px)"
    } else if (diff > 0) {
        document.querySelector(".contributorsList").style.height = "auto"
        document.querySelector(".contributorsList").style.overflowY = "unset"
        //document.querySelector(".contributorsFrame").style.transform = "translateX(-50%) translateY(-50%)"
    }
}

onload = () => {
    try { 
        adjustColumnsHeight()
        adjustLastExpanderLower()
        const a = function () {
            const offset = document.querySelector(".activeContent").offsetTop 
            // let scroll = document.querySelector(".tableOfContent").scrollTop 
            // document.querySelector(".tableOfContent").scrollTop 
            // = document.querySelector(".activeContent").offsetTop
            // + document.querySelector(".tableOfContent").clientHeight
            // contHeight < offset ? scroll = offset + contHeight : scroll = 0
            
            const contHeight = document.querySelector(".tableOfContent").clientHeight
            const activePos = document.querySelector(".activeContent").getBoundingClientRect().top
            const containerPos = document.querySelector(".tableOfContent").getBoundingClientRect().top

            const activeRelativePos = activePos - containerPos
            const shouldScroll = (contHeight < activeRelativePos)
            
            if (shouldScroll) {
                console.log("activePos", activePos)
                console.log("containerPos", containerPos)
                console.log("contHeight", contHeight)
                console.log("activeRelativePos", activeRelativePos)
                console.log("shouldScroll", shouldScroll)
                console.log("shouldScrollThisMuch: ", activeRelativePos + contHeight)
                // need to toss it to the event loop for the scrollbar appears with a delay causing problems
                // why?
                // is there a better fix?
                setTimeout(()=>{document.querySelector(".tableOfContent").scrollTop = activeRelativePos + contHeight},0)
            }
                
            // document.querySelector(".tableOfContent").scrollTop = (
            //     offset > contHeight ? offset + contHeight : 0
            // )
        }
        a()
        // causes bug that scrolls the website down on reload
        // block: nearest is still not a greatest soltion
        // document.querySelector(".activeContent").scrollIntoView({ 
        //     //behavior: 'smooth', 
        //     block: 'nearest', 
        //     //inline: 'start' 
        //     // start, center, end, or nearest
        // })
        // shouldResize()
        adjustBreadcrumb()
        setCssVariables()
        createFormStorage()
    } 
    catch (e) { console.error(e) }
}
window.onresize = () =>  {
    setCssVariables()
    squeezeContributors()
    adjustColumnsHeight()
    adjustLastExpanderLower()
    adjustLastExpanderUpper()
    spaceWarning()
    adjustBreadcrumb()
    adjustMoreExpander()
}
    
onscroll = adjustColumnsHeight

rightArrow.addEventListener("click", (e) => handleNavbarArrows(e))
leftArrow.addEventListener("click", (e) => handleNavbarArrows(e))

window.addEventListener("click", (e) => handleClickAll(e))

document.querySelectorAll(".expElemTop").forEach(btn => {
    btn.addEventListener("click", (e) => upperButtonHandler(e))
})
document.querySelectorAll(".expElemBot").forEach(btn => {
    btn.addEventListener("click", (e) => bottomButtonHandler(e))
})

// // UPPER EXPANDER ADJUSTMENTS (ARROWS):
// const search = document.getElementsByClassName("searchButton")[0]
// const expTop = document.getElementsByClassName("expTop")[0]


// const removedFromRight = []
// const removedFromLeft = []

// const arrowExpander = document.createElement("div")
// const arrowIcon = document.createElement("span")
// arrowExpander.classList.add("expanderElement", "expElemTop")
// arrowIcon.classList.add("expandIndicator", "rotateToRight", "arrowIcon")
// arrowIcon.setAttribute("id", "arrowIcon")
// arrowExpander.setAttribute("id", "arrow")
// arrowExpander.append(arrowIcon)

// function adjustLastExpanderUpper() {
//     const searchMargin = getComputedStyle(search).getPropertyValue("margin-left")
//     const marginNum = Number(searchMargin.slice(0, -2))

//     const nodeLast = expTop.lastElementChild
//     const nodeWidth = nodeLast?.clientWidth
//     const prevSibl = nodeLast.previousElementSibling
//     const prevWidth = prevSibl?.clientWidth
//     const lastRemoved = removedFromRight[removedFromRight.length - 1]?.[0]
//     const lastRemovedWidth = removedFromRight[removedFromRight.length - 1]?.[1]

//     arrowExpander.style.position = "absolute"
//     arrowExpander.style.order = "1"
//     arrowIcon.classList.remove("rotateToLeft")

//     if (marginNum <= 0 + arrowExpander.clientWidth && nodeLast) { 
//         console.log("now")
//         if (nodeLast.id === "arrow" && prevSibl) {
//             removedFromRight.push([prevSibl, prevWidth])
//             expTop.removeChild(prevSibl)
//         } else if (nodeLast.id !== "arrow") {
//             removedFromRight.push([nodeLast, nodeWidth])
//             expTop.removeChild(nodeLast)
//             expTop.appendChild(arrowExpander)
//         }
//     } else if (marginNum > 0 && marginNum > lastRemovedWidth + 8 + 34 && removedFromRight.length >= 2) {
//         expTop.insertBefore(lastRemoved, nodeLast)
//         removedFromRight.pop()
//     } 
//     else if (marginNum > 0 && removedFromRight.length < 2 && marginNum > lastRemovedWidth + 8) { // 8 is a column gap number in px
//         console.log("last")
//         if (nodeLast.id === "arrow") expTop.removeChild(nodeLast)
//         expTop.appendChild(lastRemoved)
//         removedFromRight.pop()
//     }
// }

// // ARROW FUNCTIONALITY
// const arrUpNodes = Array.from(document.querySelectorAll(".expElemTop")).map(elem => [elem, elem.clientWidth])
// const sumExpWidth = arrUpNodes.reduce((a,c)=> a + c[1] + 8, -8) // -8 because there are fewer gaps than elements

// function handleArrowClick() {
//     let availableSpace = 0
//     const searchMarginNum = Number(getComputedStyle(search).getPropertyValue("margin-left").slice(0, -2))
//     const elems = Array.from(document.querySelectorAll(".expElemTop"))
//     const elsWidth = elems.reduce((a,c) => a + c.clientWidth,  searchMarginNum)
//     availableSpace = elsWidth - 2 * arrowExpander.clientWidth
//     console.log("searchMarginNum " + searchMarginNum)
//     console.log(elems)
//     console.log("elsWidth " + elsWidth)
//     console.log("avaible space " + availableSpace)
//    // const removedNumber = 
//     const arrowPos = getComputedStyle(arrowExpander).getPropertyValue("position")
//     // if (arrowPos === "static") { // CLICK TO LEFT
//     //     arrowExpander.style.position = "absolute"
//     //     arrowExpander.style.order = "1"
//     //     arrowIcon.classList.remove("rotateToLeft")
//     // } 
//     // else
//      if (arrowPos === "absolute") { // CLICK TO RIGHT
//        // arrowExpander.style.position = "static"
//         // arrowExpander.style.order = "0"
//         // arrowIcon.classList.add("rotateToLeft")
//     }
// }