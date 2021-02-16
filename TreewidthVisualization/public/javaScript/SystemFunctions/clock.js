/**
 * Start a clock and recall the passed time since then 
 * by calling @getTime
 */
class CLock{
    
    constructor(){
        this.time = new Date();//the date that will be set on run layout
    }
   
    /**
     * Calculates the passed (run-)time since @initialTime and return a string
     * of the elapsed hours, minutes, seconds and miliseconds time.
     * @param {number} ms elapsed miliseconds since @initialTime
     * @returns {string} elapsed time since @initialTime
     */
    diff_time(ms) {
        let s = Math.floor(ms / 1000);
        ms = ms % 1000;

        let m = Math.floor(s / 60);
        s = s % 60;

        let h = Math.floor(m / 60);
        m = m % 60;

        return "Hours: " + h + "</br>Minutes: " + m + "</br>Seconds: " + s + "</br>Miliseconds: " + ms
    }

    /**
     *  Returns the time since the setted time.
     */
    get getTime(){
        let timeNow = Date.now();
        let ms = timeNow - this.time
        return this.diff_time(ms)
    }

    /**
     * Returns the start time of this clock.
     */
    get setTime(){
        return this.time;
    }

}