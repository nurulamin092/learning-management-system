export const formatMyDate = (date) => {
    let options = {
        year: "numeric",
        month: "short",
        day: "numeric"
    }
    const formatDate = new Intl.DateTimeFormat("en-US", options).format(date)
    return formatDate;
}