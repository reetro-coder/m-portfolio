import Hero from "./components/Hero.jsx";
import Main from "./components/Main.jsx";
import DataProvider from "./DataProvider.jsx";
export default function App() {
  return (
    <DataProvider>
      <Hero />
      <Main />
    </DataProvider>
  );
}
