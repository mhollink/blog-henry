/**
 * Feed a date in yyyy-MM-dd format and get it back in the given
 * format.
 *
 * @param date the date formatted in the yyyy-MM-dd.
 * @param format locale code for the format; nl-NL, en-UK, ect.
 */
export const inReadableFormat = (date: string, format = "nl-NL") => {
    const [year, month, day] = date.split("-").map(Number);
    return new Date(year, month - 1, day)
        .toLocaleDateString(format, {
            day: "numeric",
            month: "long",
            year: "numeric",
        })
}