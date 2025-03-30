// Array of month objects
const yearData = [
    {"month":10,"year":2024,"days":{"7":["12:30:40","14:30:00","2:00:00"],"8":["12:30:40","14:30:00","2:00:00"]}},
    {"month":11,"year":2024,"days":{"7":["10:00:00","11:30:00"],"8":["09:15:00","12:45:00"]}},
    {"month":12,"year":2024,"days":{"9":["08:00:00","10:30:00"],"10":["07:30:00","13:00:00"]}},
    // Add more objects as needed
];

// Function to get a month object by month and year
function getMonthObject(array, month, year) {
    return array.find(obj => obj.month === month && obj.year === year) || null;
}

// Function to get a day's array from a specific month object
function getDayArray(array, month, year, day) {
    const monthObj = getMonthObject(array, month, year);
    if (!monthObj) {
        console.error(`Month ${month} of year ${year} not found.`);
        return null;
    }
    return monthObj.days[day] || null;
}

// Example Usage
const monthObj = getMonthObject(yearData, 10, 2024); // Get the object for October 2024
console.log("Month Object:", monthObj);

const dayArray = getDayArray(yearData, 10, 2024, 7); // Get the array for day 7 of October 2024
console.log("Day Array:", dayArray);

const invalidDay = getDayArray(yearData, 10, 2024, 15); // Invalid day
console.log("Invalid Day:", invalidDay);
