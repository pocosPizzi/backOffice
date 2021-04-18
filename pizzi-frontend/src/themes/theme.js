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
    MuiButtonBase: {
      root: {
        justifyContent: 'end !important',
        padding: '5px !important',
        marginLeft: '5px !important',
      },
    },

    MuiAppBar: {
      root: {
        backgroundColor: '#124999 !important',
        color: '#fff !important',
      },
      colorSecondary: {
        color: '#fff',
      },
    },
    RaTopToolbar: {
      root: {
        paddingTop: 8,
        paddingRight: '24px !important',
        minHeight: '48px !importtabt',
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
