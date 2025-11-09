import {marked} from "marked";

export interface TocItem {
    id: string;
    text: string;
    level: number;
}

export function extractToc(markdown: string): TocItem[] {
    const tokens = marked.lexer(markdown);
    const toc: TocItem[] = [];

    tokens.forEach((token) => {
        if (token.type === 'heading' && token.depth <= 3) { // limit to h1–h3
            const text = token.text;
            const id = text
                .toLowerCase()
                .replace(/[^\w]+/g, '-') // slugify
                .replace(/^-|-$/g, '');

            toc.push({ id, text, level: token.depth });
        }
    });

    return toc;
}
