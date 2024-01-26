onmessage = function(e) {
    const duration = e.data.duration;
    const endTime = Date.now() + duration;

    function intensiveTask() {
        let result = 0;
        for (let i = 0; i < 1e7; i++) {
            result += Math.sqrt(i) * Math.cos(i);
        }
        return result;
    }

    while (Date.now() < endTime) {
        intensiveTask();
    }

    postMessage('done');
};
