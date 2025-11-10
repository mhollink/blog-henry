/**
 * Takes the given date and checks if it is in the future.
 *
 * @param date
 */
export const isInFuture = (date: string) => {
    return new Date(date + "T00:00:00Z").getTime() > new Date().getTime();
}