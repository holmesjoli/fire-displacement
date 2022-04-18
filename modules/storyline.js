// Update storyline
export function update(selector, data) {

    console.log(data)

    if (data[0].story != "") {
        let id = document.getElementById(selector);
        id.innerHTML =  `${data[0].story}`;
    }
}



// export class StoryClass {

//     constructor(selector) {
//         this.data = storyData;
//         this.selector = selector;
//     }

//     update(date) {

//         this.filteredData = this.data.filter(function(d) {
//             return d.date === date;
//         });

//         if (this.filteredData[0].story != "") {
//             let id = document.getElementById(this.selector);
//             id.innerHTML =  `${this.filteredData[0].story}`;
//         }
//     }

//     // Add effects to the storyline
//     effects(date) {
//         this.lightning(date);
//         this.darkeffect(date);
//     }

//     // Lightning

//     lightning(date) {
//         if (date === 714) {
//             function func() {
//                 var elem = document.createElement("img");
//                 elem.src = 'assets/lightning.svg';
//                 document.getElementById("effect").appendChild(elem);
//             }
//             setTimeout(func, 2000);
//         }
//     }

//     // Changes the body to a dark color to show power blackout
//     darkeffect(date) {
//         if (date === 718) {
//             document.getElementsByTagName('body').style.backgroundColor = '#473F41';
//             document.getElementsByTagName('body').style.color = '#FFFFFF';
//         }

//         if (date === 725) {
//             document.getElementsByTagName('body').style.backgroundColor = '#FFFFFF';
//             document.getElementsByTagName('body').style.color = '#473F41';
//         }
//     }
// }
