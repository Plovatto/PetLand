import CustomCursor from '@/components/layout/CustomCursor'
import Header from '@/components/layout/Header'
import PageLoader from '@/components/layout/PageLoader'
import Hero from '@/components/sections/Hero'
import { LoadingProvider } from '@/context/LoadingProvider'
import { TransitionProvider } from '@/context/TransitionProvider'
import { useLenis } from '@/hooks/useLenis'

function App() {
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
          </main>
        </div>
      </TransitionProvider>
    </LoadingProvider>
  )
}

export default App
