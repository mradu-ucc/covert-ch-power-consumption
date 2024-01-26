# covert-ch-power-consumption
cpu_experiment.html file contains simple html code to get binary input for encoding. 

worker.js is javascript file contains code to create worker thread, it is used by script.js file.

script.js file contains main code which utilizes worker.js file to create multi-threads to consume all cores of CPU. The code allows multithreads to run for specific time windows to represent binary bits '0', '1' and 20 seconds of gap between each bit.
