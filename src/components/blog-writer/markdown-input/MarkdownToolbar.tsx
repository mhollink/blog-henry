import Toolbar from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import Typography from "@mui/material/Typography";
import FormatIndentIncreaseIcon from '@mui/icons-material/FormatIndentIncrease';
import FormatIndentDecreaseIcon from '@mui/icons-material/FormatIndentDecrease';

export const MarkdownToolbar = ({wrapSelection, applyLinePrefix}: {
    wrapSelection?: (before: string, after?: string) => void,
    applyLinePrefix?: (prefix: string) => void
}) => (
    <Toolbar variant="dense">
        <Stack direction="row" alignItems="center">
            <IconButton onClick={() => applyLinePrefix("## ")}>
                <Typography component="div" variant="body2" color="inherit" fontWeight="bold"
                            sx={{width: 24, aspectRatio: 1, lineHeight: 1.8}}>
                    H1
                </Typography>
            </IconButton>
            <IconButton onClick={() => applyLinePrefix("### ")}>
                <Typography component="div" variant="body2" color="inherit" fontWeight="bold"
                            sx={{width: 24, aspectRatio: 1, lineHeight: 1.8}}>
                    H2
                </Typography>
            </IconButton>
            <IconButton onClick={() => applyLinePrefix("#### ")}>
                <Typography component="div" variant="body2" color="inherit" fontWeight="bold"
                            sx={{width: 24, aspectRatio: 1, lineHeight: 1.8}}>
                    H3
                </Typography>
            </IconButton>
            <IconButton onClick={() => wrapSelection("**")}>
                <FormatBoldIcon/>
            </IconButton>
            <IconButton onClick={() => wrapSelection("_")}>
                <FormatItalicIcon/>
            </IconButton>
            <Typography component="div" variant="body2" color="textDisabled" >
                |
            </Typography>
            <IconButton onClick={() => wrapSelection("**")}>
                <HorizontalRuleIcon />
            </IconButton>
            <IconButton onClick={() => applyLinePrefix("> ")}>
                <FormatQuoteIcon/>
            </IconButton>
            <Typography component="div" variant="body2" color="textDisabled" >
                |
            </Typography>
            <IconButton onClick={() => applyLinePrefix("- ")}>
                <FormatListBulletedIcon/>
            </IconButton>
            <IconButton onClick={() => applyLinePrefix("1. ")}>
                <FormatListNumberedIcon/>
            </IconButton>
            <IconButton onClick={() => applyLinePrefix("1. ")}>
                <FormatIndentIncreaseIcon/>
            </IconButton>
            <IconButton onClick={() => applyLinePrefix("1. ")}>
                <FormatIndentDecreaseIcon/>
            </IconButton>
            <Typography component="div" variant="body2" color="textDisabled" >
                |
            </Typography>
            <IconButton onClick={() => wrapSelection("[", "](https://link-naar.nl)")}>
                <InsertLinkIcon/>
            </IconButton>
        </Stack>
    </Toolbar>
);
