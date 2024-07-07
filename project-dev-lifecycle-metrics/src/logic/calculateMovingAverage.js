export const calculateMovingAverage = (data, windowSize) => {
    let movingAverage = [];
    for (let i = 0; i < data.length; i++) {
        let start = Math.max(0, i - windowSize + 1);
        let sum = 0;
        for (let j = start; j <= i; j++) {
            sum += data[j];
        }
        movingAverage.push(sum / (i - start + 1));
    }
    return movingAverage;
};
