import { DateTime } from "luxon"

const simpleDate = (string) => {
    return DateTime.fromISO(string).toLocaleString(DateTime.DATE_MED)
};

const detailedDate = (string) => {
    return DateTime.fromISO(string).toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS)
}

export {
    simpleDate,
    detailedDate
}