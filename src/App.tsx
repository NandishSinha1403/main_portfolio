import Nav from "./components/Nav"
import Opening from "./sections/Opening"
import SelectedWork from "./sections/SelectedWork"
import Manifesto from "./sections/Manifesto"
import Skills from "./sections/Skills"

function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Opening />
      <SelectedWork />
      <Manifesto />
      <Skills />
      {/* Temporary scroll placeholder — the contact section arrives in the next build step */}
      <div id="contact" className="min-h-screen" style={{ backgroundColor: "#fafafa" }} />
    </div>
  )
}

export default App
