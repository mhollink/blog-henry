import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {slugify} from "../../utils";
import {inReadableFormat} from "../../utils/date-format.ts";

export const BlogAuthor = ({schrijver, datum}: { schrijver: string, datum: string }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
            }}
        >
            <Box sx={{display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center'}}>
                <Avatar
                    alt={schrijver}
                    src={`/assets/schrijvers/${slugify(schrijver)}.png`}
                    sx={{width: 24, height: 24, bgcolor: theme => theme.palette.primary.main}}

                />
                <Typography variant="caption">
                    {schrijver}
                </Typography>
            </Box>
            <Typography variant="caption">{inReadableFormat(datum)}</Typography>
        </Box>
    )
}