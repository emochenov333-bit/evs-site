import { Header } from './components/Header/Header'
import { Hero } from './components/Hero/Hero'
import { Services } from './components/Services/Services'
import { WorkCycle } from './components/WorkCycle/WorkCycle'
import { Advantages } from './components/Advantages/Advantages'
import { Projects } from './components/Projects/Projects'
import { About } from './components/About/About'
import { ContactForm } from './components/ContactForm/ContactForm'
import { Footer } from './components/Footer/Footer'
import Calculator from './components/Calculator/Calculator'

function App() {
  return (
    <>
      <div className="noise-overlay" aria-hidden />

      <Header />

      <main>
        <Hero />

        <Services />

        <WorkCycle />

        <Advantages />

        <Projects />

        <About />

        <ContactForm />
      </main>

      <Footer />
    </>
  )
}

export default App