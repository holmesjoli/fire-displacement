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
        document.querySelector("#burn svg").style.borderColor = lightColor;
        document.querySelector("#timeline svg rect").style.fill = lightColor;
        document.querySelector("#burn svg rect").style.fill = lightColor;
        document.querySelector("#containment svg rect").style.fill = lightColor;
        d3.selectAll("text").attr("fill", lightColor)
        // console.log(blah)
        // .style.fill = lightColor;
    }

    if (date === 725) {
        document.body.style.backgroundColor = lightColor;
        document.body.style.color = darkColor;
        document.querySelector("#burn svg").style.borderColor = darkColor;
        document.querySelector("#timeline svg rect").style.fill = darkColor;
        document.querySelector("#burn svg rect").style.fill = darkColor;
        document.querySelector("#containment svg rect").style.fill = darkColor;
        d3.selectAll("text").attr("fill", darkColor);
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
