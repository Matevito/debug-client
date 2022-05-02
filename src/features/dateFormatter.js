import { DateTime } from "luxon"

const simpleDate = (string) => {
    return DateTime.fromISO(string).toLocaleString(DateTime.DATE_MED)
};

const detailedDate = (string) => {
    let date = DateTime.fromISO(string,{ zone: 'utc' })
    date.setZone('local', { keepLocalTime: true })
    return date.toLocaleString(DateTime.DATETIME_MED)
}

export {
    simpleDate,
    detailedDate
}