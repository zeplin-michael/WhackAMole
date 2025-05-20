import { GameProvider } from "./context/GameContext";
import MoleContainer from "./components/MoleContainer";

export default function App() {
  return (
    <GameProvider>
      <MoleContainer />
    </GameProvider>
  );
}
