import type {FunctionComponent} from "react";
import * as React from "react";
import {MarkdownToolbar} from "./MarkdownToolbar.tsx";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import type {Breakpoint} from "@mui/material";
import type {FormControlProps} from "@mui/material/FormControl/FormControl";
import {useTextSelectionFormatting} from "./useTextSelectionFormatting.ts";

type MarkdownInputProps = {
    size: { [key: Breakpoint]: number } | number;
    label: string;
    name: string;
    value: string;
    onChange: (newValue: string) => void;
} & FormControlProps

export const MarkdownInput: FunctionComponent<MarkdownInputProps> = ({label, size, name, value, onChange}) => {
    const {textareaRef, applyLinePrefix, wrapSelection}= useTextSelectionFormatting(value, onChange);

    return (
        <>
            <Grid size={size}>
                <Typography variant="h6" mb={1}>
                    {label}
                </Typography>

                <MarkdownToolbar wrapSelection={wrapSelection} applyLinePrefix={applyLinePrefix} />
                <TextField
                    inputRef={textareaRef}
                    value={value}
                    name={name}
                    onChange={(e) => onChange(e.target.value)}
                    multiline
                    minRows={24}
                    fullWidth
                />
            </Grid>
        </>
    )
}