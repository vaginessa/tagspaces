/**
 * TagSpaces - universal file and folder organizer
 * Copyright (C) 2017-present TagSpaces UG (haftungsbeschraenkt)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License (version 3) as
 * published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { I18nextProvider } from 'react-i18next'; // as we build ourself via webpack
import {
  createTheme,
  ThemeProvider,
  Theme,
  StyledEngineProvider
} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppConfig from '-/AppConfig';
import i18n from '../services/i18n';
import {
  getCurrentTheme,
  getDefaultRegularTheme,
  getDefaultDarkTheme
} from '-/reducers/settings';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const legacyTheme = createTheme({
  palette: {
    mode: 'light', // Switching the dark mode on is a single property value change.
    primary: {
      light: AppConfig.lightThemeLightColor,
      main: AppConfig.lightThemeMainColor,
      dark: AppConfig.lightThemeMainColor
    },
    secondary: {
      main: AppConfig.lightThemeMainColor
    },
    divider: '#ddd'
  }
});

const newlightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: '#a6def4',
      main: '#3bc8ff',
      dark: '#3bc8ff'
    },
    secondary: {
      main: '#3bc8ff'
    },
    divider: '#ddd'
  }
});

// https://mui.com/material-ui/customization/dark-mode/
const darklegacyTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: AppConfig.darkThemeLightColor,
      main: AppConfig.darkThemeMainColor,
      dark: AppConfig.darkThemeMainColor
    },
    secondary: {
      main: AppConfig.darkThemeMainColor
    },
    divider: '#555'
  }
});

const darkblueTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '#a6def4',
      main: '#3bc8ff',
      dark: '#3bc8ff'
    },
    secondary: {
      main: '#3bc8ff'
    },
    divider: '#555'
  }
});

const draculaTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '#503d50',
      main: '#BD93F9',
      dark: '#BD93F9'
    },
    secondary: {
      main: '#BD93F9'
    },
    divider: '#555',
    background: {
      default: '#282A36'
    },
    text: {
      primary: '#f8f8f2'
    }
  }
});

// const lightBlueTheme = createMuiTheme({
//   palette: {
//     mode: 'light', // Switching the dark mode on is a single property value change.
//     primary: {
//       light: '#cbe9fa',
//       main: '#19aeff',
//       dark: '#19aeff',
//       contrastText: '#ffffff',
//     },
//     secondary: {
//       main: '#19aeff',
//     },
//     divider: '#ddd'
//     // secondary: { main: '#cccccc', 200: '#ddd' }
//   }
// });

interface Props {
  children: Object;
  currentTheme: string;
  defaultRegularTheme: string;
  defaultDarkTheme: string;
}
function App(props: Props) {
  let theme = legacyTheme;
  let regularTheme = legacyTheme;
  let darkTheme = darklegacyTheme;
  const { currentTheme, defaultRegularTheme, defaultDarkTheme } = props;
  const systemDarkMode = useMediaQuery('(prefers-color-scheme: dark)'); // window.matchMedia().matches;
  switch (defaultRegularTheme) {
    case 'legacy': {
      regularTheme = legacyTheme;
      break;
    }
    case 'newlight': {
      regularTheme = newlightTheme;
      break;
    }
  }
  switch (defaultDarkTheme) {
    case 'darklegacy': {
      darkTheme = darklegacyTheme;
      break;
    }
    case 'darkblue': {
      darkTheme = darkblueTheme;
      break;
    }
    case 'dracula': {
      darkTheme = draculaTheme;
      break;
    }
  }
  switch (currentTheme) {
    case 'light': {
      theme = regularTheme;
      break;
    }
    case 'dark': {
      theme = darkTheme;
      break;
    }
    case 'system': {
      theme = systemDarkMode ? darkTheme : regularTheme;
      break;
    }
  }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>{props.children}</I18nextProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

function mapStateToProps(state) {
  return {
    currentTheme: getCurrentTheme(state),
    defaultDarkTheme: getDefaultDarkTheme(state),
    defaultRegularTheme: getDefaultRegularTheme(state)
  };
}
export default connect(mapStateToProps)(App);
