import Nav from "./components/Nav"
import Opening from "./sections/Opening"
import SelectedWork from "./sections/SelectedWork"
import Manifesto from "./sections/Manifesto"
import Skills from "./sections/Skills"
import Contact from "./sections/Contact"
import GrainOverlay from "./components/GrainOverlay"

function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Opening />
      <SelectedWork />
      <Manifesto />
      <Skills />
      <Contact />
      <GrainOverlay />
    </div>
  )
}

export default App
