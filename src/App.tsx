import Nav from "./components/Nav"
import Opening from "./sections/Opening"
import SelectedWork from "./sections/SelectedWork"

function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Opening />
      <SelectedWork />
      {/* Temporary scroll placeholders — real sections arrive in later build steps */}
      <div id="about" className="min-h-screen" style={{ backgroundColor: "#0A0A0A" }} />
      <div id="skills" className="min-h-screen" style={{ backgroundColor: "#0F0F0F" }} />
      <div id="contact" className="min-h-screen" style={{ backgroundColor: "#fafafa" }} />
    </div>
  )
}

export default App
