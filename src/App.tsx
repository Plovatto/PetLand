import CustomCursor from '@/components/layout/CustomCursor'
import Header from '@/components/layout/Header'
import PageLoader from '@/components/layout/PageLoader'
import Hero from '@/components/sections/Hero'
import { LoadingProvider } from '@/context/LoadingProvider'
import { useLenis } from '@/hooks/useLenis'

function App() {
  useLenis()

  return (
    <LoadingProvider>
      <CustomCursor />
      <PageLoader />
      <div className="bg-background min-h-screen">
        <Header />
        <main>
          <Hero />
        </main>
      </div>
    </LoadingProvider>
  )
}

export default App
