
// Select Element And Create Valus :
let box  = document.querySelector("body > div");
let screen = document.querySelector("body > div .screen");
let leftOpration = document.querySelectorAll("body > div .box .left_opration");
let listOpr  = ["%","x","-","+"]
let spOpr = document.createElement("span");
spOpr.classList.add("spOpr")
let OprValue = true ;
let eqaleValue = false ;
let postiveORnegtaivValue = false ;




// Start Nums :


// Select Nums :
let nums = document.querySelectorAll("body > div .box .nums span");

let dotValue = true
nums.forEach((num) => {
    num.addEventListener("click",(e) => {      
        if (parseFloat(e.target.dataset.num) != NaN || e.target.dataset.num == "0" || e.target.dataset.num == ".") {
            if (parseInt(spOpr.innerHTML) == parseInt(screen.innerHTML) || eqaleValue == true) {
                screen.innerHTML = ""
                if (eqaleValue == true) {
                    eqaleValue = false
                }
            }
            if (e.target.dataset.num == "." && screen.innerHTML == "") {
                screen.innerHTML +=  `0${e.target.innerHTML}`
                dotValue = false;
            }else if (e.target.dataset.num == "." && screen.innerHTML != "" && dotValue == true) {
                screen.innerHTML +=  `${e.target.innerHTML}`
                dotValue = false;
            }else if (parseFloat(e.target.dataset.num) || e.target.dataset.num == "0") {
                screen.innerHTML +=  `${e.target.innerHTML}`
            }
            
        }
        if (e.target.dataset.num == "+/-" && eqaleValue == false && screen.innerHTML != "") {
            screen.innerHTML = -parseFloat(screen.innerHTML)
            if (spOpr.innerHTML != "") {
                postiveORnegtaivValue = true;
            }
        }

    })
}) 


// Start Opration :

let num1 = /(^((\+|-)?\d+\.\d+))|(^((\+|-)?\d+))/g ;
let num2 = /((\d+\.\d+)$)|((\d+)$)/g;


// Start Left Opration : 



leftOpration.forEach((opr) => {
    opr.addEventListener("click",(e) => {
        if (postiveORnegtaivValue == true && spOpr.innerHTML != "") {
            num2 = /((\d+\.\d+)$)|((\d+)$)|(((\+{1}|-{1})?\d+\.\d+)$)|(((\+{1}|-{1})?\d+)$)/g;
            console.log("postiveORnegtaivValue is true no")
        }
        // If btn Is in ["+","-","x","%"]
        if (listOpr.includes(e.target.dataset.opr)) {

            if (screen.innerHTML != "" && OprValue == true) {
                spOpr.innerHTML += screen.innerHTML + e.target.dataset.opr ;
                spOpr.remove()
                box.prepend(spOpr);
                OprValue = false
                screen.innerHTML = "" 
            }else if (screen.innerHTML != "") {
                // let listspOpr = spOpr.split(" ");
                // console.log(listspOpr)
                spOpr.innerHTML += screen.innerHTML;
                let oprFirst = /\d+(\+|-|x|%)(\d+|(\+|-|x|%))?/g ;
                let opr = /(\+|-|x|%)/;
                let opration = spOpr.innerHTML.match(oprFirst)[0]
                console.log(opration.match(opr)[0])
                let solution ;
                if (opration.match(opr)[0] == "+") {
                    solution = parseFloat(spOpr.innerHTML.match(num1)) + parseFloat(spOpr.innerHTML.match(num2))
                }else if (opration.match(opr)[0] == "-") {
                    solution = parseFloat(spOpr.innerHTML.match(num1)) - parseFloat(spOpr.innerHTML.match(num2))
                }else if (opration.match(opr)[0] == "x") {
                    solution = parseFloat(spOpr.innerHTML.match(num1)) * parseFloat(spOpr.innerHTML.match(num2))
                }else if (opration.match(opr)[0] == "%") {
                    solution = parseFloat(spOpr.innerHTML.match(num1)) / parseFloat(spOpr.innerHTML.match(num2))
                }
                spOpr.innerHTML  = solution + e.target.dataset.opr;
                screen.innerHTML = solution
            }
        // If btn is "="    
        }else if (e.target.dataset.opr == "=") {
            if (spOpr.innerHTML != "") {
                spOpr.innerHTML += screen.innerHTML
                screen.innerHTML = "";
                let oprFirst = /\d+(\+|-|x|%)(\d+|(\+|-|x|%))?/g ;
                let opr = /(\+|-|x|%)/;
                let opration = spOpr.innerHTML.match(oprFirst)[0]
                if (opration.match(opr)[0] == "+") {
                    screen.innerHTML = parseFloat(spOpr.innerHTML.match(num1)) + parseFloat(spOpr.innerHTML.match(num2))
                }else if (opration.match(opr)[0] == "-") {
                    screen.innerHTML = parseFloat(spOpr.innerHTML.match(num1)) - parseFloat(spOpr.innerHTML.match(num2))
                }else if (opration.match(opr)[0] == "x") {
                    screen.innerHTML = parseFloat(spOpr.innerHTML.match(num1)) * parseFloat(spOpr.innerHTML.match(num2))
                }else if (opration.match(opr)[0] == "%") {
                    screen.innerHTML = parseFloat(spOpr.innerHTML.match(num1)) / parseFloat(spOpr.innerHTML.match(num2))
                }
                spOpr.innerHTML = ""
                OprValue = true;
                eqaleValue = true;
            }
            
        }
    })
})

// Start Top Opration : 
let topOpration = document.querySelectorAll("body > div .box .top_opration span");

topOpration.forEach((sp) => {
    sp.addEventListener("click",(e) => {
        if (e.target.dataset.opr == "back") {
            if (screen.innerHTML.length == 2 && screen.innerHTML[0] == "-") {
                screen.innerHTML = ""
            }else if (screen.innerHTML.length > 0) {
                screen.innerHTML = screen.innerHTML.slice(0,-1)
            }
        }else if (e.target.dataset.opr == "C") {
            screen.innerHTML = "";
            
        }else if (e.target.dataset.opr == "CE") {
            screen.innerHTML = ""
            spOpr.innerHTML = ""
        }
    })
} )