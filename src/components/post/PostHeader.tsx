import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import {slugify} from "../../utils";
import {inReadableFormat} from "../../utils/date-format.ts";

type PostHeaderProps = { titel: string, datum: string, categorie: string, schrijver: string };

export const PostHeader = (meta: PostHeaderProps) =>
    !meta.titel ? (
        <Box component="section">
            <Stack component="div" gap={1} direction={"row"} justifyContent="center">
                <Skeleton variant="text" animation="wave" sx={{fontSize: '1rem', width: '10ch'}}/>
            </Stack>
            <Stack component="div" gap={1} direction={"row"} justifyContent="center">
                <Typography variant="h2" color="inherit">
                    <Skeleton variant="text" animation="wave" sx={{width: '40ch', fontSize: '2.25rem'}}/>
                </Typography>
            </Stack>
            <Stack component="div" gap={1} direction={"row"} justifyContent="center">
                <Skeleton variant="text" animation="wave" sx={{fontSize: '1rem', width: '20ch'}}/>
                <Skeleton variant="text" animation="wave" sx={{fontSize: '1rem', width: '8ch'}}/>
            </Stack>
        </Box>
    ) : (
        <Box component="section">
            <Stack component="div" gap={1} direction={"row"} justifyContent="center">
                <Chip label={meta.categorie} variant="outlined"/>
            </Stack>
            <Typography variant={"h2"} component="h2" textAlign={"center"} sx={{my: 2}} id={slugify(meta.titel)}>
                {meta.titel}
            </Typography>
            {meta.schrijver && (
                <Stack component="div" gap={1} direction={"row"} justifyContent="center">
                    <Typography color="text.secondary" variant="body2">
                        {meta.schrijver},
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                        {inReadableFormat(meta.datum)}
                    </Typography>
                </Stack>
            )}
        </Box>
    );
