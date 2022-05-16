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
export function intro() {

    // Create intro
    let intro = document.createElement("div");
    intro.setAttribute("id", "intro");
    document.body.appendChild(intro);

    // Create container for titles
    let header = document.createElement("div");
    header.setAttribute("id", "header");

    // Create h1 title tag
    let title = document.createElement("h1");
    let titleText = document.createTextNode("Flee");
    title.appendChild(titleText);

    // Create h2 title tag
    let subtitle = document.createElement("h2");
    let subtitleText = document.createTextNode("Local impacts from the Carlton Complex Fire in Okanogan County, Washington.");
    subtitle.appendChild(subtitleText);
    
    // Append title to header div
    header.appendChild(title);
    header.appendChild(subtitle);

    intro.appendChild(header);

    // Lightning strike
    let strike = document.createElement("img");
    strike.src = 'assets/lightning.svg';
    strike.setAttribute("id", "lightning");
    intro.appendChild(strike);

    // function lightning() {
    //     intro.appendChild(strike);
    // }

    function func() {
        strike.remove();
        intro.remove();
    }

    // setTimeout(lightning, 3500)
    setTimeout(func, 5000);
}

