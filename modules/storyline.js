// Update storyline
export function update(selector, data) {

    if (data[0].story != "") {
        let id = document.getElementById(selector);
        id.innerHTML =  `${data[0].story}`;
    }
}

// Changes the body to a dark color to show power blackout
export function effects(data) {

    let date = data[0].date;

    const lightColor = "#FFFFFF";
    const darkColor = "#473F41";

    if (date === 718) {
        document.body.style.backgroundColor = darkColor;
        document.body.style.color = lightColor;
        document.getElementById("timer").style.backgroundColor = lightColor;
        document.getElementById("timer").style.color = darkColor;
        document.getElementById("burn-container").style.borderColor = lightColor;
        document.getElementById("containment-container").style.borderColor = lightColor;
        document.querySelector("#burn svg").style.borderColor = lightColor;
    }

    if (date === 725) {
        document.body.style.backgroundColor = lightColor;
        document.body.style.color = darkColor;
        document.getElementById("timer").style.backgroundColor = darkColor;
        document.getElementById("timer").style.color = lightColor;
        document.getElementById("burn-container").style.borderColor = darkColor;
        document.getElementById("containment-container").style.borderColor = darkColor;
        document.querySelector("#burn svg").style.borderColor = darkColor;
    }

//         if (date === 714) {
//             function func() {
//                 var elem = document.createElement("img");
//                 elem.src = 'assets/lightning.svg';
//                 document.getElementById("effect").appendChild(elem);
//             }
//             setTimeout(func, 2000);
//         }
}
