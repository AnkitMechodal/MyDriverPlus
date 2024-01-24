import { LogBox } from 'react-native';
import 'react-native-gesture-handler';
import Routes from './source/navigation/Routes';
import { ThemeProvider } from './source/utils/ThemeContext';

const App = () => {
  LogBox.ignoreAllLogs();

  return (
    <>
      <ThemeProvider>
        <Routes />
      </ThemeProvider>
    </>
  )
}
export default App;