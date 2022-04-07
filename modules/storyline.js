export const storyData = [
    {date: "714", story: "Officially, the disastor event started from a lightning strike on July 15th, 2014 and ended on August 14th, 2014. However, impacts from the fire were felt much longer than the timeline of the official event."},
    {date: "715", story: ""},
    {date: "716", story: ""},
    {date: "717", story: ""},
    {date: "718", story: "On the morning of the 18th, an estimated 95 homes were lost to the fire. Residents of the Methow Valley lost power. Carlton, Pateros, and Brewster residents were ordered to evacuate."},
    {date: "719", story: ""},
    {date: "720", story: ""},
    {date: "721", story: ""},
    {date: "722", story: ""},
    {date: "723", story: ""},
    {date: "724", story: ""},
    {date: "725", story: ""},
    {date: "726", story: ""},
    {date: "727", story: ""},
    {date: "728", story: ""},
    {date: "729", story: ""},
    {date: "730", story: ""},
    {date: "731", story: ""},
    {date: "801", story: ""},
    {date: "802", story: ""},
    {date: "803", story: ""},
    {date: "804", story: ""},
    {date: "805", story: ""},
    {date: "806", story: ""},
    {date: "807", story: ""},
    {date: "808", story: ""},
    {date: "809", story: ""},
    {date: "810", story: ""},
    {date: "811", story: ""},
    {date: "812", story: ""},
    {date: "813", story: ""},
    {date: "814", story: ""},
    {date: "815", story: ""},
    {date: "816", story: ""},
    {date: "817", story: ""},
    {date: "818", story: ""},
    {date: "819", story: ""},
    {date: "820", story: ""},
    {date: "821", story: ""},
    {date: "822", story: ""},
    {date: "823", story: ""},
    {date: "824", story: ""},
    {date: "825", story: ""},
    {date: "826", story: ""}];

export class StoryClass {

    constructor(selector) {
        this.data = storyData;
        this.selector = selector;
    }

    update(date) {

        this.filteredData = this.data.filter(function(d) {
            return d.date === date;
        });

        if (this.filteredData[0].story != "") {
            let id = document.getElementById(this.selector);
            id.innerHTML =  `${this.filteredData[0].story}`;
        }
    }

    // Add effects to the storyline
    effects(date) {
        this.lightning(date);
        this.darkeffect(date);
    }

    // Lightning

    lightning(date) {
        if (date == "714") {
            function func() {
                var elem = document.createElement("img");
                elem.src = 'assets/lightning.svg';
                document.getElementById("effect").appendChild(elem);
            }
            setTimeout(func, 2000);
        }
    }

    // Changes the body to a dark color to show power blackout
    darkeffect(date) {
        if (date == "718") {
            document.getElementById('map-svg').style.backgroundColor = '#473F41';
            document.getElementById('map-svg').style.color = '#FFFFFF';
            // document.getElementsByClassName("state").style.backgroundColor = '#473F41';

            function func() {
                document.getElementById('map-svg').style.backgroundColor = '#FFFFFF';
                document.getElementById('map-svg').style.color = '#473F41';
                // document.getElementsByClassName("state").style.backgroundColor = '#FFFFFF';
            }
            setTimeout(func, 2000);
        }
    }
}
