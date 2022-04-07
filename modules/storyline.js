export const storyData = [
    {date: "714", story: "Officially, the disastor event started on July 15th, 2014 and ended on August 14th, 2014. However, impacts from the fire were felt much longer than the timeline of the official event."},
    {date: "715", story: ""},
    {date: "716", story: ""},
    {date: "717", story: ""},
    {date: "718", story: ""},
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

        let filteredData = this.data.filter(function(d) {
            return d.date === date;
        });

        let id = document.getElementById(this.selector);
        id.innerHTML =  `${filteredData[0].story}`;
    }
}
