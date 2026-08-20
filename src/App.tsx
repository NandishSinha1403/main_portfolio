import Nav from "./components/Nav"
import Opening from "./sections/Opening"
import SelectedWork from "./sections/SelectedWork"
import Manifesto from "./sections/Manifesto"
import Skills from "./sections/Skills"
import Contact from "./sections/Contact"
import GrainOverlay from "./components/GrainOverlay"
import ScrollProgress from "./components/ScrollProgress"
import useSmoothScroll from "./lib/useSmoothScroll"

function App() {
  useSmoothScroll()

  return (
    <div className="min-h-screen">
      {/* Keyboard users otherwise tab through the whole nav on every load, and
          screen readers had no landmark to jump to — the page was one <nav>
          followed by unlabelled sections. */}
      <a href="#top" className="skip-link">
        Skip to content
      </a>
      <ScrollProgress />
      <Nav />
      <main>
        <Opening />
        <SelectedWork />
        <Manifesto />
        <Skills />
      </main>
      <footer>
        <Contact />
      </footer>
      <GrainOverlay />
    </div>
  )
}

export default App
