function startWorker(duration) {
    return new Promise(resolve => {
        const worker = new Worker('worker.js');
        worker.postMessage({ duration: duration });

        worker.onmessage = function(e) {
            if (e.data === 'done') {
                resolve();
                worker.terminate();
            }
        };
    });
}

async function encodeBits(bits) {
    const numberOfCores = navigator.hardwareConcurrency || 4;
    for (const bit of bits) {
        let duration = 0;
        if (bit === '1') {
            // 15 seconds for '1'
            duration = 15000;

        } else if (bit === '0') {
            // 10 seconds for '0'
            duration = 10000; 
        } else {
            throw new Error(`Invalid input '${bit}'. Only binary bits (0 or 1) are allowed.`);
        }

        const promises = [];
        for (let i = 0; i < numberOfCores; i++) {
            promises.push(startWorker(duration));
        }
        await Promise.all(promises);
        // 20 seconds gap between bits
        await new Promise(resolve => setTimeout(resolve, 20000)); 
    }
}

document.getElementById('startEncoding').addEventListener('click', async function() {
    try {
        const bits = document.getElementById('bitSequence').value;
        if (!/^[01]+$/.test(bits)) {
            throw new Error("Invalid input. Please enter a binary sequence (only 0s and 1s).");
        }
        alert("Encoding started.");
        await encodeBits(bits);
        alert("Encoding complete.");
    } catch (error) {
        alert(error.message);
    }
});
