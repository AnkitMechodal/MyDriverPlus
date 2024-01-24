import { LogBox } from 'react-native';
import 'react-native-gesture-handler';
import Routes from './source/navigation/Routes';

const App = () => {
  LogBox.ignoreAllLogs();
  return (
    <>
      <Routes />
    </>
  )
}
export default App;
// Git Push test !