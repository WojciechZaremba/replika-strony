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
    console.log(buttons)
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
                && previouslyRemovedWidth.length > 1 ) {
        buttons[lastIdx + 1].style.display = "flex"
        previouslyRemovedWidth.pop()
        // console.log(buttons)
    } else if (dashMargin + 66 > previouslyRemovedWidth[0] && previouslyRemovedWidth.length === 1) {
        buttons[lastIdx + 1].style.display = "flex"
        previouslyRemovedWidth.pop()
    }
    if (previouslyRemovedWidth.length <= 0) moreButton.style.display = "none"
    const dashMarginAfter = Number(getComputedStyle(dashboard).getPropertyValue("margin-left").slice(0, -2))
    if (dashMarginAfter <= 0) adjustLastExpanderLower()
}
window.onload = adjustLastExpanderLower

function adjustMoreExpander() {
    const moreButton = document.querySelector("#moreButton")
    const moreDropdown = moreButton.querySelectorAll(".moreDropdown")

    for (let i = 0; i < expBot.children.length - 1; i++) {
        console.log(i)
        console.log(getComputedStyle(expBot.children[i]).display)
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

// BUTTONS

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
    closeExpandersTop(e)
    closeExpandersBottom(e)
    closeDetails(e)
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

onload = () => {
    try { 
        // shouldResize()
        adjustColumnsHeight()
        document.querySelector(".activeContent").scrollIntoView()
        adjustBreadcrumb()
        adjustLastExpanderLower()
     } 
    catch (e) { console.error(e) }
}
onresize = () =>  {
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