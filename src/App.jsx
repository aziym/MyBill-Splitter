import { ThemeProvider } from './components/ThemeProvider';
import BillSplitter from './components/BillSplitter';

function App() {
  return (
    <ThemeProvider>
      <BillSplitter />
    </ThemeProvider>
  );
}

export default App;