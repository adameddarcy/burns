export const calculateMovingAverage = (data, windowSize) => {
    let result = [];
    for (let i = 0; i < data.length - windowSize + 1; i++) {
        let window = data.slice(i, i + windowSize);
        let average = window.reduce((sum, val) => sum + val) / windowSize;
        result.push(average);
    }
    return result;
}
