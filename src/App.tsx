import CustomCursor from '@/components/layout/CustomCursor'
import Header from '@/components/layout/Header'
import Hero from '@/components/sections/Hero'
import { useLenis } from '@/hooks/useLenis'

function App() {
  useLenis()

  return (
    <>
      <CustomCursor />

      <div className="bg-background min-h-screen">
        <Header />
        <main>
          <Hero />
        </main>
      </div>
    </>
  )
}

export default App