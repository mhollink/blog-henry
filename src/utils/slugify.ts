export const slugify = (text: string): string =>
    text.toLowerCase()
        .normalize("NFD")                   // remove accents
        .replace(/\p{Diacritic}/gu, "")     // remove diacritics
        .replace(/[^a-z0-9]+/g, "-")        // replace non-alphanumerics with hyphen
        .replace(/^-+|-+$/g, "");           // trim hyphens at start/end