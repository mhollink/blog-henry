import { useCallback, useRef } from "react";

export function useTextSelectionFormatting(value: string, setValue: (v: string) => void) {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const withSelection = useCallback(
        (fn: (ta: HTMLTextAreaElement, start: number, end: number) => void) => {
            const ta = textareaRef.current;
            if (!ta) return;

            const start = ta.selectionStart;
            const end = ta.selectionEnd;

            fn(ta, start, end);
        },
        []
    );

    const replaceText = (
        oldText: string,
        newText: string,
        ta: HTMLTextAreaElement,
        newStart: number,
        newEnd: number
    ) => {
        setValue(newText);

        // Restore selection after React updates value
        queueMicrotask(() => {
            ta.setSelectionRange(newStart, newEnd);
            ta.focus();
        });
    };

    const wrapSelection = useCallback(
        (before: string, after?: string) => {
            withSelection((ta, start, end) => {
                const markerBefore = before;
                const markerAfter = after ?? before;

                const selected = value.slice(start, end);

                const newSelected = markerBefore + selected + markerAfter;

                const newText =
                    value.slice(0, start) + newSelected + value.slice(end);

                const selStart = start + markerBefore.length;
                const selEnd = selStart + selected.length;

                replaceText(value, newText, ta, selStart, selEnd);
            });
        },
        [value, withSelection, setValue]
    );

    const applyLinePrefix = useCallback(
        (prefix: string) => {
            withSelection((ta, start, end) => {
                // Find start of the current line
                const lineStart = value.lastIndexOf("\n", start - 1) + 1;

                const before = value.slice(0, lineStart);
                const line = value.slice(lineStart, end);
                const after = value.slice(end);

                const newLine = prefix + line;
                const newText = before + newLine + after;

                const selStart = start + prefix.length;
                const selEnd = end + prefix.length;

                replaceText(value, newText, ta, selStart, selEnd);
            });
        },
        [value, withSelection, setValue]
    );

    return {
        textareaRef,
        wrapSelection,
        applyLinePrefix,
    };
}
