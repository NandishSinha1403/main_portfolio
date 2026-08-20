import Nav from "./components/Nav"
import LiquidMetalBackground from "./components/LiquidMetalBackground"

function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      {/* Temporary scroll placeholders — real sections arrive in later build steps */}
      <div id="top" className="relative min-h-screen">
        <LiquidMetalBackground />
      </div>
      <div id="work" className="min-h-screen" style={{ backgroundColor: "#FFFFFF" }} />
      <div id="about" className="min-h-screen" style={{ backgroundColor: "#0A0A0A" }} />
      <div id="skills" className="min-h-screen" style={{ backgroundColor: "#0F0F0F" }} />
      <div id="contact" className="min-h-screen" style={{ backgroundColor: "#fafafa" }} />
    </div>
  )
}

export default App
