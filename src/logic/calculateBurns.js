const parseDate = (dateString) => {
    // Convert the date string to a Date object, handle various formats if necessary
    return new Date(dateString);
};

export const calculateBurns = (rows, numDevs, velocity) => {
    rows.forEach((row) => {
        row.Created = parseDate(row.Created);
        row.Updated = parseDate(row.Updated);
    });

    const closedStatus = 'Closed';

        rows.forEach(item => {
            item.ResolutionTime = (item.Updated - item.Created) / (1000 * 60 * 60 * 24);
        });

        const averageResolutionTime = rows.reduce((sum, item) => sum + item.ResolutionTime, 0) / rows.length / numDevs;

        const v = velocity > 0 ? velocity : averageResolutionTime;

        const startDate = new Date(Math.min(...rows.map(item => item.Created)));
        const currentDate = new Date();
        const dates = [];
        for (let d = new Date(startDate); d <= currentDate; d.setDate(d.getDate() + 1)) {
            dates.push(new Date(d));
        }

        const unresolvedCounts = dates.map(date => rows.filter(item => item.Created <= date && item.Updated > date).length);
        const resolvedCounts = dates.map(date => rows.filter(item => item.Updated <= date && item.Status === closedStatus).length);

        const totalIssues = rows.length;
        const remainingIssues = totalIssues - resolvedCounts[resolvedCounts.length - 1];
        const predictedCompletionTimeDays = remainingIssues * v;
        const predictedCompletionDate = new Date(currentDate.getTime() + predictedCompletionTimeDays * (1000 * 60 * 60 * 24)) || new Date(currentDate.getTime() * (1000 * 60 * 60 * 24));

        const extendedDates = [...dates, predictedCompletionDate];
        const extendedResolvedCounts = [...resolvedCounts, totalIssues];
        return { dates, unresolvedCounts, resolvedCounts, predictedCompletionDate, extendedDates, extendedResolvedCounts, averageResolutionTime, v };
};
