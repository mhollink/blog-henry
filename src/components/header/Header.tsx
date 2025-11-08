import type {FunctionComponent} from "react";
import * as React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {alpha, styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import logo from './logo.svg';

const StyledToolbar = styled(Toolbar)(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    backdropFilter: 'blur(24px)',
    border: '1px solid',
    borderColor: (theme.vars || theme).palette.divider,
    backgroundColor: theme.vars
        ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
        : alpha(theme.palette.background.default, 0.4),
    boxShadow: (theme.vars || theme).shadows[1],
    padding: '8px 12px',
}));

export const Header: FunctionComponent = () => {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return (
        <AppBar
            position="fixed"
            enableColorOnDark
            sx={{
                boxShadow: 0,
                bgcolor: 'transparent',
                backgroundImage: 'none',
                mt: 'calc(var(--template-frame-height, 0px) + 28px)',
            }}
        >
            <Container maxWidth="lg">
                <StyledToolbar variant="dense" disableGutters>
                    <Box sx={{
                        flexGrow: 1,
                        display: 'flex',
                        alignItems: 'center',
                        px: 0,
                        justifyContent: 'space-between'
                    }}>
                        <Box display="flex" flexDirection="row" justifyContent="space-between" gap={1}
                             alignItems="center">
                            <img src={logo} alt="logo" width={30} height={30}/>
                            <Typography variant="h5" component="h1" color="primary">Henry Hollink</Typography>
                        </Box>
                        <Box sx={{display: {xs: 'none', md: 'flex'}, gap: 2}}>
                            <Button variant="text" color="primary" size="small" component={RouterLink} to={"/"}>
                                Blog
                            </Button>
                            <Button variant="text" color="primary" size="small" component={RouterLink} to={"/over-henry"}>
                                Over Henry
                            </Button>
                            <Button variant="text" color="primary" size="small" component={RouterLink} to={"/contact"}>
                                Contact
                            </Button>
                        </Box>
                    </Box>
                    <Box sx={{display: {xs: 'flex', md: 'none'}, gap: 1}}>
                        <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                            <MenuIcon/>
                        </IconButton>
                        <Drawer
                            anchor="top"
                            open={open}
                            onClose={toggleDrawer(false)}
                            slotProps={{
                                paper: {
                                    sx: {
                                        top: 'var(--template-frame-height, 0px)',
                                    },
                                }
                            }}>
                            <Box sx={{p: 2, backgroundColor: 'background.default'}}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    <IconButton onClick={toggleDrawer(false)}>
                                        <CloseRoundedIcon/>
                                    </IconButton>
                                </Box>
                                <MenuItem>Blog</MenuItem>
                                <MenuItem>Over Henry</MenuItem>
                                <MenuItem>Contact</MenuItem>
                            </Box>
                        </Drawer>
                    </Box>
                </StyledToolbar>
            </Container>
        </AppBar>
    );
};