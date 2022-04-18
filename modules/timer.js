// Title Set Date
// param params
// param callbaxk
export function setDate(params, callback) {

    let monthId = document.getElementById('month');
    let dayId = document.getElementById('days');

    var git = setInterval(function () {

        if (params.i < params.limit + 1) {

            

            let filteredDates = params.dates.filter(function(d) {
                return d.i === params.i;
            });

            dayId.innerHTML = `${filteredDates[0].day}`;
            monthId.innerHTML =  `${filteredDates[0].month_name}`;

            // console.log(filteredDates[0].date);
            callback(`${filteredDates[0].date}`);
            
        } else {
            clearInterval(monthId);
            clearInterval(dayId);
            clearInterval(git);
        }

        params.i++;
    }, params.speed);
}
