import { Providers } from "./providers/providers";
import { AppRouter } from "./router/app-router";

function App() {
  return (
    <Providers>
      <AppRouter />
    </Providers>
  );
}

export default App;
