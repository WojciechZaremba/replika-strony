const body = document.getElementsByTagName("body")[0]

// LOWER EXPANDER ADJUSTMENTS ("MORE" BUTTON):
const dashboard = document.getElementsByClassName("dashboard")[0]
const expBot = document.getElementsByClassName("expBot")[0]

// console.log(expBot.lastElementChild.clientWidth)

const removedNodesDown = []

const moreExpander = document.createElement("div")
const moreTxt = document.createTextNode("More")
const moreArrow = document.createElement("span")
moreExpander.classList.add("expanderElement", "expElemBot")
moreArrow.classList.add("expandIndicator")
moreExpander.setAttribute("id", "more")
moreExpander.append(moreTxt, moreArrow)

function adjustLastExpanderLower() {
    if (hiddenNodes.left.length > 0) {
        console.log("do sth")
        handleNavbarArrows("dummy")
    }
    const dashMargin = getComputedStyle(dashboard).getPropertyValue("margin-left")
    const marginNum = Number(dashMargin.slice(0, -2))

    const nodeLast = expBot.lastElementChild
    const nodeWidth = nodeLast?.clientWidth
    const prevSibl = nodeLast.previousElementSibling
    const prevWidth = prevSibl?.clientWidth
    const lastRemoved = removedNodesDown[removedNodesDown.length - 1]?.[0]
    const lastRemovedWidth = removedNodesDown[removedNodesDown.length - 1]?.[1]

    if (marginNum === 0) {
        if (nodeLast.id === "more" && prevSibl) {
            removedNodesDown.push([prevSibl, prevWidth])
            expBot.removeChild(prevSibl)
        } else if (nodeLast.id !== "more") {
            removedNodesDown.push([nodeLast, nodeWidth])
            expBot.removeChild(nodeLast)
            expBot.appendChild(moreExpander)
        }
    } else if (marginNum > 0 && marginNum > lastRemovedWidth && removedNodesDown.length >= 2) {
            expBot.insertBefore(lastRemoved, nodeLast)
            removedNodesDown.pop()
    } else if (removedNodesDown.length < 2 && marginNum > lastRemovedWidth - 66 ) { // 66 is a "more" elem length in px
        if (nodeLast.id === "more") expBot.removeChild(nodeLast)
        expBot.appendChild(lastRemoved)
        removedNodesDown.pop()
    }
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

// ADJUST COLUMS HEIGHT

const column = document.querySelector(".column")
const additionals = document.querySelector(".additionals")

function adjustColumnsHeight() {
    const offTop = column.getBoundingClientRect().y > 0 ? column.getBoundingClientRect().y : 0
    const offBottom = window.innerHeight - document.querySelector(".footer").getBoundingClientRect().y
    const desiredHeight = offBottom > 0 ? window.innerHeight - offBottom - offTop : window.innerHeight - offTop

    column.style.height = `${desiredHeight}px`
    additionals.style.height = `${desiredHeight}px`

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


// OTHER

function shouldResize(n = 0) {
    if (n >= 10) throw new Error('something went wrong');
    if (body.scrollWidth > body.clientWidth) {
        adjustLastExpanderLower()
        adjustLastExpanderUpper()
        // adjustLastExpanderUpper()
        shouldResize(n + 1)
    }
}

onload = () => {
    try { shouldResize(); adjustColumnsHeight() } 
    catch (e) { console.error(e) }
}
onresize = () =>  {adjustLastExpanderLower(); adjustLastExpanderUpper(); spaceWarning()}

onscroll = adjustColumnsHeight

rightArrow.addEventListener("click", (e) => handleNavbarArrows(e))
leftArrow.addEventListener("click", (e) => handleNavbarArrows(e))

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