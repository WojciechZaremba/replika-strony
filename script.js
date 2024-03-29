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
const expTop = document.getElementsByClassName("expTop")[0]


const removedFromRight = []
const removedFromLeft = []

const arrowExpander = document.createElement("div")
const arrowIcon = document.createElement("span")
arrowExpander.classList.add("expanderElement", "expElemTop")
arrowIcon.classList.add("expandIndicator", "rotateToRight", "arrowIcon")
arrowIcon.setAttribute("id", "arrowIcon")
arrowExpander.setAttribute("id", "arrow")
arrowExpander.append(arrowIcon)

function adjustLastExpanderUpper() {
    const searchMargin = getComputedStyle(search).getPropertyValue("margin-left")
    const marginNum = Number(searchMargin.slice(0, -2))

    const nodeLast = expTop.lastElementChild
    const nodeWidth = nodeLast?.clientWidth
    const prevSibl = nodeLast.previousElementSibling
    const prevWidth = prevSibl?.clientWidth
    const lastRemoved = removedFromRight[removedFromRight.length - 1]?.[0]
    const lastRemovedWidth = removedFromRight[removedFromRight.length - 1]?.[1]

    arrowExpander.style.position = "absolute"
    arrowExpander.style.order = "1"
    arrowIcon.classList.remove("rotateToLeft")

    if (marginNum <= 0 + arrowExpander.clientWidth && nodeLast) { 
        console.log("now")
        if (nodeLast.id === "arrow" && prevSibl) {
            removedFromRight.push([prevSibl, prevWidth])
            expTop.removeChild(prevSibl)
        } else if (nodeLast.id !== "arrow") {
            removedFromRight.push([nodeLast, nodeWidth])
            expTop.removeChild(nodeLast)
            expTop.appendChild(arrowExpander)
        }
    } else if (marginNum > 0 && marginNum > lastRemovedWidth + 8 + 34 && removedFromRight.length >= 2) {
        expTop.insertBefore(lastRemoved, nodeLast)
        removedFromRight.pop()
    } 
    else if (marginNum > 0 && removedFromRight.length < 2 && marginNum > lastRemovedWidth + 8) { // 8 is a column gap number in px
        console.log("last")
        if (nodeLast.id === "arrow") expTop.removeChild(nodeLast)
        expTop.appendChild(lastRemoved)
        removedFromRight.pop()
    }
}

// ARROW FUNCTIONALITY
const arrUpNodes = Array.from(document.querySelectorAll(".expElemTop")).map(elem => [elem, elem.clientWidth])
const sumExpWidth = arrUpNodes.reduce((a,c)=> a + c[1] + 8, -8) // -8 because there are fewer gaps than elements

function handleArrowClick() {
    let availableSpace = 0
    const searchMarginNum = Number(getComputedStyle(search).getPropertyValue("margin-left").slice(0, -2))
    const elems = Array.from(document.querySelectorAll(".expElemTop"))
    const elsWidth = elems.reduce((a,c) => a + c.clientWidth,  searchMarginNum)
    availableSpace = elsWidth - 2 * arrowExpander.clientWidth
    console.log("searchMarginNum " + searchMarginNum)
    console.log(elems)
    console.log("elsWidth " + elsWidth)
    console.log("avaible space " + availableSpace)
   // const removedNumber = 
    const arrowPos = getComputedStyle(arrowExpander).getPropertyValue("position")
    // if (arrowPos === "static") { // CLICK TO LEFT
    //     arrowExpander.style.position = "absolute"
    //     arrowExpander.style.order = "1"
    //     arrowIcon.classList.remove("rotateToLeft")
    // } 
    // else
     if (arrowPos === "absolute") { // CLICK TO RIGHT
       // arrowExpander.style.position = "static"
        // arrowExpander.style.order = "0"
        // arrowIcon.classList.add("rotateToLeft")
    }
}

function shouldResize(n = 0) {
    if (n >= 10) throw new Error('something went wrong');
    if (body.scrollWidth > body.clientWidth) {
        adjustLastExpanderLower()
        adjustLastExpanderUpper()
        shouldResize(n + 1)
    }
}

onload = () => {
    try { shouldResize() } 
    catch (e) { console.error(e) }
}
onresize = () => {adjustLastExpanderLower(); adjustLastExpanderUpper()}       
onclick = () => {adjustLastExpanderLower(); adjustLastExpanderUpper()}       
arrowExpander.addEventListener("click", handleArrowClick)
