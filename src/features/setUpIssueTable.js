const setUpIssueTable = (issuesList) => {
    let data = [
        {label: "open", x: 1,  y: 0},
        {label: "aditional info needed", x: 2, y: 0},
        {label: "in progress", x: 3, y: 0},
        {label: "under review", x: 4, y: 0},
        {label: "solved",x: 5, y: 0}
    ];

    issuesList.forEach((issue) => {
        data.forEach((obj, index) => {
            if (obj.label === issue.status){
                data[index].y += 1
            }
        })
    });
    
    return data.filter(obj => obj.y > 0);
};


export default setUpIssueTable;