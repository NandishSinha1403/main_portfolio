import Nav from "./components/Nav"
import Opening from "./sections/Opening"
import Manifesto from "./sections/Manifesto"

function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Opening />
      {/* Temporary scroll placeholders — real sections arrive in later build steps */}
      <div id="work" className="min-h-screen" style={{ backgroundColor: "#FFFFFF" }} />
      <Manifesto />
      <div id="skills" className="min-h-screen" style={{ backgroundColor: "#0F0F0F" }} />
      <div id="contact" className="min-h-screen" style={{ backgroundColor: "#fafafa" }} />
    </div>
  )
}

export default App
