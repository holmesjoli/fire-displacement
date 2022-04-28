// Update storyline
export function update(selector, data) {

    if (data[0].story != "") {
        let id = document.getElementById(selector);
        id.innerHTML =  `${data[0].story}`;
    }
}

// Changes the body to a dark color to show power blackout
export function powerout(date) {

    const lightColor = "#FFFFFF";
    const darkColor = "#473F41";

    if (date === 718) {
        document.body.style.backgroundColor = "#141225";
        document.body.style.color = lightColor;
        document.querySelector("#burn svg").style.borderColor = lightColor;
        document.querySelector("#timeline svg rect").style.fill = lightColor;
        document.querySelector("#burn svg rect").style.fill = lightColor;
        document.querySelector("#containment svg rect").style.fill = lightColor;
        d3.selectAll("text").attr("fill", lightColor)
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
}

//Lightning strike
export function lightning(timeout = 1000) {
    var strike = document.createElement("img");
    strike.src = 'assets/lightning.svg';

    let div = document.createElement('div');
    div.setAttribute("id", "lightning");
    document.body.appendChild(div);
    let lightning = document.getElementById("lightning");
    lightning.appendChild(strike);

    function func() {
        strike.remove();
        lightning.remove();
    }
    setTimeout(func, timeout);
}

