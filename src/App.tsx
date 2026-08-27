import CustomCursor from '@/components/layout/CustomCursor'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import PageLoader from '@/components/layout/PageLoader'
import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import { LoadingProvider } from '@/context/LoadingProvider'
import { TransitionProvider } from '@/context/TransitionProvider'
import { useLenis } from '@/hooks/useLenis'
import { useResetScrollOnMount } from '@/hooks/useResetScrollOnMount'

function App() {
  useResetScrollOnMount()
  useLenis()

  return (
    <LoadingProvider>
      <TransitionProvider>
        <CustomCursor />
        <PageLoader />
        <div className="bg-background min-h-screen">
          <Header />
          <main>
            <Hero />
            <Services />
            <About />
            <Contact />
          </main>
          <Footer />
        </div>
      </TransitionProvider>
    </LoadingProvider>
  )
}

export default App
