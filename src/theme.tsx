import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            light: '#AED581',
            main: '#8BC34A',
            dark: '#689F38',
            contrastText: '#fff',
        },
        secondary: {
            light: '#FFD54F',
            main: '#FFC107',
            dark: '#FFA000',
            contrastText: '#000',
        },
        background: {
            default: '#fafafa',
            paper: '#fff',
        },
        text: {
            primary: '#1a1a1a',
            secondary: '#555',
        },
    },
    typography: {
        fontFamily: [
            'Inter',
            'Roboto',
            'Helvetica Neue',
            'Arial',
            'sans-serif',
        ].join(','),
        h1: { fontWeight: 600, fontSize: '2.25rem' },
        h2: { fontWeight: 600, fontSize: '1.75rem' },
        h3: { fontWeight: 500, fontSize: '1.5rem' },
        body1: { lineHeight: 1.6 },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 8,
                },
            },
        },
    },
});
