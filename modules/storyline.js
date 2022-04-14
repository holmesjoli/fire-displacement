export const storyData = [
    {date: "714", story: "Officially, the disastor event and state of emergency is declared. The fire started from a lightning strike on July 15th, 2014 and ended on August 14th, 2014. However, impacts from the fire were felt much longer than the timeline of the official event."},
    {date: "715", story: ""},
    {date: "716", story: "High temperatures of 100 degrees, winds and dry fuels fed the fires. Officials warned that the rapidly changing situation could result in evacuations, road closures, and potential power outages."},
    {date: "717", story: "Conditions were rapidly changing so much so that fire crews don't have complete information of who is under an evacuation order. Hot temperatures and high winds mean that the fire was expected to grow rapidly."},
    {date: "718", story: "On the morning of the 18th, an estimated 95 homes were lost to the fire. Residents of the Methow Valley lost power. Carlton, Pateros, and Brewster residents were ordered to evacuate. The threat level jumped from a Level 1 to Level 3 alerts in less than 10 minutes, leaving no time to pack."},
    {date: "719", story: ""},
    {date: "720", story: ""},
    {date: "721", story: ""},
    {date: "722", story: "The fire reached 250,000 acres making it the largest fire in Washington State history."},
    {date: "723", story: ""},
    {date: "724", story: ""},
    {date: "725", story: "Power was restored to part of the valley."},
    {date: "726", story: ""},
    {date: "727", story: ""},
    {date: "728", story: ""},
    {date: "729", story: ""},
    {date: "730", story: "Firefighters started to turn a corner on containing the fire. At this point the fire is approximately 60%-70% contained."},
    {date: "731", story: "Life started to return to some sense of normaly. Residents had electricity, phone, and Internet services restored."},
    {date: "801", story: ""},
    {date: "802", story: "A windstorm with gusts up to 58 miles per hour blew through the valley threatening residents who had recently returned home."},
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
    {date: "826", story: "The fire reached 100% containment."}];

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
            document.getElementsByTagName('body').style.backgroundColor = '#473F41';
            document.getElementsByTagName('body').style.color = '#FFFFFF';
        }

        if (date == "725") {
            document.getElementsByTagName('body').style.backgroundColor = '#FFFFFF';
            document.getElementsByTagName('body').style.color = '#473F41';
        }
    }
}
