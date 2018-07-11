Array.prototype.indexOf = function (val) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] === val) return i;
    }
    return -1;
};
Array.prototype.remove = function (val) {
    const index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

function log(msg) {
    console.log(msg)
}


function random(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function timer(total_time, progress, callback) {
    setTimeout(() => {
        let now_total = total_time - 50;
        if (now_total > 0) {
            progress(Math.floor(now_total / 100) / 10 );
            timer(now_total,progress, callback)
        } else {
            callback();
        }
    }, 50)
}