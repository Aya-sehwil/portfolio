import World from "./components/World";
import { LangProvider } from "./i18n";
export default function App() { return <LangProvider><World /></LangProvider>; }