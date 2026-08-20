import Nav from "./components/Nav"
import Opening from "./sections/Opening"
import Skills from "./sections/Skills"

function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Opening />
      {/* Temporary scroll placeholders — real sections arrive in later build steps */}
      <div id="work" className="min-h-screen" style={{ backgroundColor: "#FFFFFF" }} />
      <div id="about" className="min-h-screen" style={{ backgroundColor: "#0A0A0A" }} />
      <Skills />
      <div id="contact" className="min-h-screen" style={{ backgroundColor: "#fafafa" }} />
    </div>
  )
}

export default App
