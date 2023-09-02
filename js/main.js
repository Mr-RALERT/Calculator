// Select Nums :
let nums = document.querySelectorAll("body > div .box .nums span");
// Select Opration  :
let opration = document.querySelectorAll("body > div .box .opration span");
// Select Screen : 
let screen = document.querySelector("body > div .screen");
// Create span In Screen "spOpr" :
let spOpr = document.createElement("span");
spOpr.className  = "spOpr"
document.querySelector("body > div").appendChild(spOpr)



// Start Valubers :

let dot = false;







// Start Nums Clicked : 
nums.forEach((num) => {
    num.addEventListener("click",(e) => {

        // If Btn Value Is Number [0-9] :
        if (parseInt(e.target.dataset.num) || e.target.dataset.num == "0") {
            // Add Num Value To Screen
            screen.innerHTML += e.target.dataset.num
        }


        // If Btn Value Is Dot "."
        if (e.target.dataset.num == ".") {

            // If Dot Not Exist Befor :
            if (dot == false) {
                if (screen.innerHTML == "") {
                    screen.innerHTML = `0.`
                }else {
                    screen.innerHTML += `.`
                }
                dot = true
            }
        }

        // If Btn Value Is "+/-"
        if (e.target.dataset.num == "+/-") {
            // if Screen Not Empty:
            if (screen.innerHTML != "") {
                screen.innerHTML = -screen.innerHTML
            }
        }
    })
})


// Start Opratinon :

opration.forEach((opr) => {
    opr.addEventListener("click",(e) => {

        // Start Top Opration

        // List Top Opration
        let listTopOpr = ["back","C","CE"];
        // If Opr In List Top Oprtion : 
        if (listTopOpr.includes(e.target.dataset.opr)) {
            // If Opr Is "Back":
            if (e.target.dataset.opr == "back") {
                // If Screen Not Empty
                if (screen.innerHTML != "") {
                    // If Dot Was Deleted 
                    if (screen.innerHTML[screen.innerHTML.length - 1] == ".") {
                        dot = false
                    }

                    //  If Number has "-" in First
                    if (screen.innerHTML[0] == "-" && screen.innerHTML.length == 2) {
                        screen.innerHTML = ""
                    }else {
                        screen.innerHTML = screen.innerHTML.slice(0,screen.innerHTML.length - 1)
                    }
                    
                }
            }

            // If Opr Os "C" 
            if (e.target.dataset.opr == "C") {
                screen.innerHTML = ""
            }


        // Start Left Opration 
        }else {


            // If Screnn Not Empty :
            
            if (screen.innerHTML != "") {

                // If btn Opr Not Eqale "=""
                if (e.target.dataset.opr != "=") {
                    // Add The Number and The Opr To spanOpr :
    
                    spOpr.innerHTML += `${screen.innerHTML} ${e.target.dataset.opr} `

                    // Clear Screen 
                    screen.innerHTML = ""; 
                }

                // if btn Opr Is Eqale "=" 
                if (e.target.dataset.opr == "=" && spOpr.innerHTML != "") {
                    spOpr.innerHTML += screen.innerHTML;
                    console.log(getSolution(spOpr.innerHTML))
                    screen.innerHTML = "";
                }

            }


        }



    })
})















// Function Solution :

function getSolution(allOpr) {
    let str  = allOpr.split(" ")
    let allMultbly = [];
    let allDiv  = [];
    for (let i = 0 ; i < str.length ; i++) {
        if (str[i] == "x") {
            if (str[i - 1] == null && i != 0) {
                str[i] = `${parseFloat(str[i - 2]) * parseFloat(str[i + 1])}`
                str[i - 2] = null;
            }else {
                str[i] = `${parseFloat(str[i - 1]) * parseFloat(str[i + 1])}`
                str[i - 1] = null;
            }
            str[i + 1] = null ;
            
        }
        if (str[i] == "%") {
            if (str[i - 1] == null && i != 0) {
                str[i] = `${parseFloat(str[i - 2]) / parseFloat(str[i + 1])}`
                str[i - 2] = null;
            }else {
                str[i] = `${parseFloat(str[i - 1]) / parseFloat(str[i + 1])}`
                str[i - 1] = null;
            }
            str[i + 1] = null ;
        }
    }
    let result = 0 ;
    let filterStr = str.filter((ch) => ch != null);
    filterStr.map((ele,index) => {

        if (ele == "+") {
            result += parseFloat(filterStr[index - 1]) + parseFloat(filterStr[index + 1])
        }else if (ele == "-") {
            result += parseFloat(filterStr[index - 1]) - parseFloat(filterStr[index + 1])
        }
    })

    return result;
    
}