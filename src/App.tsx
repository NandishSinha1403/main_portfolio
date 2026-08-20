import Nav from "./components/Nav"
import SilkBackground from "./components/SilkBackground"

function App() {
  return (
    <div className="min-h-screen">
      <SilkBackground />
      <Nav />
      {/* Temporary scroll placeholders — real sections arrive in later build steps */}
      <div className="relative z-10">
        <div id="top" className="min-h-screen" />
        <div id="work" className="min-h-screen" />
        <div id="about" className="min-h-screen" />
        <div id="skills" className="min-h-screen" />
        <div id="contact" className="min-h-screen" />
      </div>
    </div>
  )
}

export default App
