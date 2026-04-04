/* 
references: 
https://www.geeksforgeeks.org/javascript/how-to-create-a-dynamic-calendar-in-html-css-javascript/
*/

// https://discourse.gohugo.io/t/building-a-js-file-and-calling-one-of-its-functions/47765v
var month_offset = 0;
const todaysDate = new Date();
const thisMonth = todaysDate.getMonth();
const thisYear = todaysDate.getFullYear();

function showCalendar(year, month) {
    let displayDate = new Date(year, month, 1);
    const monthString = new Intl.DateTimeFormat("en-US", {month: "long"}).format(displayDate);
    // get the day of week the first day of the month is
    const firstDayOfMonth = displayDate.getDay();

    // get the number of days in the month
    // get the date next month
    // setDate(0), to roll back to the last day of the "previous" month (which is current month)
    const nextMonth = new Date(year, month + 1);
    nextMonth.setDate(0);

    const daysInMonth = nextMonth.getDate();

    // create the [month], [year] header and days of week
    let table = document.getElementById("table-calendar");
    let monthYearString = document.getElementById("month-year-string");
    monthYearString.innerHTML = `${monthString} ${year}`;
    // remove all rows except the tbody?
    while (table.children.length > 1) {
        table.removeChild(table.children[1]);
    }
    // create blank cells before the first day of the month
    // add cells incrememntally until the last day of the month, wrapping every 7 cells (count the blank ones too!)
    let currDate = 1;
    for (let r = 0; r < 6; r++) {
        let row = document.createElement("tr");
        for (let c = 0; c < 7; c++) {
            if (r == 0 && c < firstDayOfMonth) {
                let cell = document.createElement("td");
                row.appendChild(cell);
            } else if (currDate <= daysInMonth){
                let cell = document.createElement("td");
                if (month == thisMonth && year == thisYear && currDate == todaysDate.getDate()) {
                    cell.className = "selected-date";
                }
                cell.innerHTML = currDate;
                row.append(cell);
                currDate++;
            } else {
                break;
            }
        }
        table.appendChild(row);
    }
    // console.log(table.childNodes.length);
}

function calcNewMonth() {
    let newMonth = thisMonth + month_offset;
    let newYear = thisYear + Math.floor(newMonth / 12);
    newMonth = newMonth % 12;
    if (newMonth < 0) {
        newMonth += 12;
    }

    showCalendar(newYear, newMonth);
}

export function getCalendarToday() {
    let prevButton = document.getElementById("calendar-prev");
    prevButton.addEventListener('click', prev);

    let nextButton = document.getElementById("calendar-next");
    nextButton.addEventListener('click', next);
    
    showCalendar(thisYear, thisMonth);
};

export function next() {
    month_offset++;
    calcNewMonth();
};

export function prev() {
    month_offset--;
    calcNewMonth();
};
