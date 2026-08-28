import { MotionConfig } from 'framer-motion'
import { lazy, Suspense } from 'react'
import CustomCursor from '@/components/layout/CustomCursor'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import PageLoader from '@/components/layout/PageLoader'
import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'
import Hero from '@/components/sections/Hero'
import { LoadingProvider } from '@/context/LoadingProvider'
import { TransitionProvider } from '@/context/TransitionProvider'
import { useLenis } from '@/hooks/useLenis'
import { useResetScrollOnMount } from '@/hooks/useResetScrollOnMount'

const Services = lazy(() => import('@/components/sections/Services'))

function App() {
  useResetScrollOnMount()
  useLenis()

  return (
    <MotionConfig reducedMotion="user">
      <LoadingProvider>
        <TransitionProvider>
          <CustomCursor />
          <PageLoader />
          <div className="bg-background min-h-screen">
            <Header />
            <main>
              <Hero />
              <Suspense fallback={<div className="bg-muted min-h-[500px]" />}>
                <Services />
              </Suspense>
              <About />
              <Contact />
            </main>
            <Footer />
          </div>
        </TransitionProvider>
      </LoadingProvider>
    </MotionConfig>
  )
}

export default App
