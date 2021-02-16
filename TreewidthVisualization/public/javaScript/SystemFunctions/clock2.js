var time; //the date that will be set on run layout

function initalTime() {
    time = new Date();
}


function startClock() {
    if (layout != 'preset') {
        initalTime();

    }
}


/**
 * Calculates the passed (run-)time since @initialTime and return a string
 * of the elapsed hours, minutes, seconds and miliseconds time.
 * @param {number} ms elapsed miliseconds since @initialTime
 * @returns {string} elapsed time since @initialTime
 */
function diff_time(ms) {
    let s = Math.floor(ms / 1000);
    ms = ms % 1000;

    let m = Math.floor(s / 60);
    s = s % 60;

    let h = Math.floor(m / 60);
    m = m % 60;

    return "hours: " + h + " minutes: " + m + " seconds: " + s + " miliseconds: " + ms
}

/**
 * Print the time that has passed since @initialTime
 */
function printDiffTime() {
    let timeNow = Date.now();
    let ms = timeNow - time

    console.log(diff_time(ms))

}

/**
 * Print the set date of @initialTime
 */
function printDate() {
    console.log("full date is: ", time);
}