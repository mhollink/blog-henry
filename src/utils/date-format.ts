/**
 * Feed a date in yyyy-MM-dd format and get it back in the
 *
 * @param date
 */
export const inReadableFormat = (date: string) => {
    const [year, month, day] = date.split("-").map(Number);
    return new Date(year, month - 1, day)
        .toLocaleDateString("nl-NL", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })
}