const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.textAlign = "center";
ctx.textBaseline = "middle";

const r = 90;
const fr = 70;
const sr = 50;
const d = 250;

function getMoonPhase(yer, month, day) {
    // https://gist.github.com/endel/dfe6bb2fbe679781948c

    var c = e = jd = b = 0;

    if (month < 3) {
        yer --;
        month += 12;
    }

    ++ month;

    c = 365.25*yer;
    e = 30.6*month;
    jd = c+e+day-694039.09;
    jd /= 29.5305882;
    b = parseInt(jd);
    jd -= b;
    b = jd*8; // b = Math.round(jd*8);

    if (b >= 8 ) {
        b = 0;
    }

    // 0 => New Moon
    // 1 => Waxing Crescent Moon
    // 2 => Qurter Moon
    // 3 => Waxing Gibbous Moon
    // 4 => Full Moon
    // 5 => Waning Gibbous Moon
    // 6 => Last Qurter Moon
    // 7 => Waning Crescent Moon
    
    return b;
}

function drawClock(x, y, fast, slow, type, name, size) {
    fast = (2*Math.PI)*fast-Math.PI/2;
    slow = (2*Math.PI)*slow-Math.PI/2;

    ctx.save();
    ctx.translate(x, y);

    // draw intervals
    if (type == 0) {
        for (let i = -2; i < 10; i ++) {
            const a = i*Math.PI/6;
            ctx.fillText(i+3, Math.cos(a)*r, Math.sin(a)*r);
        }
    } else if (type == 1) {
        for (let i = -2; i < 10; i ++) {
            const a = i*Math.PI/6;
            ctx.fillText((i+3)*5, Math.cos(a)*r, Math.sin(a)*r);
        }
    } else if (type == 2) {
        for (let i = -1.5; i < 8.5; i ++) {
            const a = i*Math.PI/5;
            ctx.fillText((i+2.5)*3, Math.cos(a)*r, Math.sin(a)*r);
        }

        ctx.fillText("PM", -50, 0);
        ctx.fillText("AM", 50, 0);
    } else if (type == 3) {
        const months = ["Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec.", "Jan.", "Feb.", "Mr."];

        for (let i = 0; i < 12; i ++) {
            const a = i*Math.PI/6;
            ctx.fillText(months[i], Math.cos(a)*r, Math.sin(a)*r);
        }
    } else if (type == 4) {
        const roman = ["III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "I", "II"];
        for (let i = 0; i < 12; i ++) {
            const a = i*Math.PI/6;
            ctx.fillText(roman[i], Math.cos(a)*r, Math.sin(a)*r);
        }
    } else if (type == 5) {
        const days = ["Mon.", "Tue.", "Wed.", "Thu.", "fri.", "Sat.", "Sun."];

        for (let i = 0; i < 7; i ++) {
            const a = (2*Math.PI*i/7)-Math.PI/2;
            ctx.fillText(days[i], Math.cos(a)*r, Math.sin(a)*r);
        }
    } else if (type == 6) {
        const phases = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"];

        for (let i = 0; i < 8; i ++) {
            const a = (.25*Math.PI*i)-Math.PI/2;
            ctx.fillText(phases[i], Math.cos(a)*r, Math.sin(a)*r);
        }
    } else if (type == 7) {
        const seasons = ["Winter", "Spring", "Summer", "Autumn"];

        for (let i = 0; i < 4; i ++) {
            const a = (i*Math.PI/2)-Math.PI/2;
            ctx.fillText(seasons[i], Math.cos(a)*r, Math.sin(a)*r);
        }
    } else if (type == 8) {
        
    } else {
        for (let i = 0; i < 12; i ++) {
            const a = i*Math.PI/6;
            ctx.beginPath();
            ctx.rc(Math.cos(a)*r, Math.sin(a)*r, i%3 == 0?iR*1.75:iR, 0, Math.PI*2);
            ctx.fill();
        }
    }

    // draw name
    ctx.fillText(name, 0, 30);
    
    // draw fast hand
    if (fast != undefined) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(fast)*fr, Math.sin(fast)*fr);
        ctx.stroke();
    }

    // draw slow hand
    if (slow != undefined) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(slow)*sr, Math.sin(slow)*sr);
        ctx.stroke();
    }
    
    ctx.restore();
}

function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const date = new Date();

    const ms = date.getMilliseconds()/1000;
    const seconds = (date.getSeconds()+ms)/60;
    const minutes = (date.getMinutes()+seconds)/60;

    const hours = ((date.getHours() % 12)+minutes)/12;
    const fullHours = (date.getHours() + minutes) / 24;

    const dayOfWeek = (((date.getDay()+6)%7)+fullHours)/7;
    
    const daysInMonth = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
    const days = ((date.getDate()-1)+fullHours)/daysInMonth;

    const months = (date.getMonth()+days)/12;

    const intervals = [[days, months, 3, "Months & Days"], [fullHours, days, 2, "Days & Hours"], [seconds, minutes, 1, "Minutes & Seconds"], [ms, seconds, 1, "Seconds & Milliseconds"], [dayOfWeek, undefined, 5, "Day of the Week"], [getMoonPhase(date.getFullYear(), date.getMonth()+1, date.getDate())/8, undefined, 6, "Current Moon Phase"]];

    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, r+20, 0, Math.PI*2);
    ctx.stroke();

    drawClock(
        canvas.width/2,
        canvas.height/2,
        minutes,
        hours,
        4,
        `${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`,
        1
    );

    for (let i = 0; i < 6; i ++) {
        const a = i*(1/3)*Math.PI;

        ctx.beginPath();
        ctx.arc(canvas.width/2-Math.cos(a)*d, canvas.height/2-Math.sin(a)*d, r+15, 0, Math.PI*2);
        ctx.stroke();
        
        drawClock(
            canvas.width/2-Math.cos(a)*d,
            canvas.height/2-Math.sin(a)*d,
            intervals[i][0],
            intervals[i][1],
            intervals[i][2],
            intervals[i][3],
            0
        );

    }

    /*
    drawClock(
        canvas.width/2,
        canvas.width*7.5,
        undefined,
        months,
        7,
        "Present Season"
    );
    */

    requestAnimationFrame(main);
}

main();