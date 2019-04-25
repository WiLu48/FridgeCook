import {createMuiTheme} from '@material-ui/core/styles'

const THEME = createMuiTheme({
    typography: {
        useNextVariants: true,
        fontFamily: [
            'Montserrat',
            'sans-serif',
        ].join(','),
    },
    palette: {
        primary: {
            main: '#385F71'
        },
        secondary: {
            main: '#B23554',
        } 
    },
})

export default THEME