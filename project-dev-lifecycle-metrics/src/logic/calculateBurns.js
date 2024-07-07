export const calculateBurns = (rows, numDevs) => {
    const closedStatus = 'Closed';

    const Created = 0
    const Updated = 2
    

    let ResolutionTimes = []

    rows.forEach(item => {
        let updated = new Date(item[Updated])
        let created = new Date(item[Created])
        let res = (updated - created) / (1000 * 60 * 60 * 24)
        if (res > 0) ResolutionTimes.push(res) ;
    });


    const averageResolutionTime = ResolutionTimes.reduce((sum, item) => sum + item, 0) / ResolutionTimes.length / numDevs;

    const startDate = rows.reduce((earliestDate, item) => {
        const createdDate = new Date(item[Created]);
        console.log(item)
        return earliestDate ? (createdDate < earliestDate ? createdDate : earliestDate) : createdDate;
    }, null);

    const currentDate = new Date();

    const getDatesInRange = (start, end) => {
        const dates = [];
        const currentDate = new Date(start);
        while (currentDate <= end) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dates;
    };

    const dates = getDatesInRange(startDate, currentDate);
    const unresolvedCounts = dates.map(date => rows.filter(item => item[Created] <= date && item[Updated] > date).length);
    const resolvedCounts = dates.map(date => rows.filter(item => item[Updated] <= date && item.Status === closedStatus).length);

    const totalIssues = rows.length;
    const remainingIssues = totalIssues - resolvedCounts[resolvedCounts.length - 1];
    const predictedCompletionTimeDays = remainingIssues * averageResolutionTime;
    const predictedCompletionDate = new Date(currentDate.getTime() + predictedCompletionTimeDays * (1000 * 60 * 60 * 24));

    const extendedDates = [...dates, predictedCompletionDate];
    const extendedResolvedCounts = [...resolvedCounts, totalIssues];

    return { dates, unresolvedCounts, resolvedCounts, predictedCompletionDate, extendedDates, extendedResolvedCounts };
}