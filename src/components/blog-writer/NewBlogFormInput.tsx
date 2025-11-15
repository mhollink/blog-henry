import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import type {FunctionComponent} from "react";
import * as React from "react";
import type {Breakpoint} from "@mui/material";
import type {PostMeta} from "../../types/post-meta.ts";
import type {FormControlProps} from "@mui/material/FormControl/FormControl";

type NewBlogFormInputProps = {
    size: { [key: Breakpoint]: number } | number;
    label: string;
    name: keyof PostMeta;
    value: string;
    type?: string
    onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
} & FormControlProps

export const NewBlogFormInput: FunctionComponent<NewBlogFormInputProps> = ({
                                                                               size,
                                                                               label,
                                                                               type,
                                                                               value,
                                                                               name,
                                                                               onChange,
                                                                               ...textFieldProps
                                                                           }) => (
    <Grid size={size}>
        <TextField
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            type={type ?? "text"}
            size="small"
            variant="standard"
            fullWidth
            {...textFieldProps}
        />
    </Grid>
)