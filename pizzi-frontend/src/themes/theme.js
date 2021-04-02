import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  palette: {
    primary: { main: '#124999' },
    secondary: { main: '#fff' },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  overrides: {
    MuiAppBar: {
      root: {
        backgroundColor: '#124999 !important',
      },
      colorSecondary: {
        color: '#fff',
      },
    },
    RaTopToolbar: {
      root: {
        paddingTop: 8,
      },
    },
    MuiFormControl: {
      root: {
        width: '100%',
      },
      marginNormal: {
        marginTop: 0,
        marginBottom: 0,
      },
      marginDense: {
        marginTop: 0,
        marginBottom: 0,
      },
    },
    MuiFilledInput: {
      root: {
        backgroundColor: 'unset',
      },
    },
  },
});

export default theme;
