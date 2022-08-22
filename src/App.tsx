import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import './App.css'
import Three from './components/Three'

function App() {

  return (
    <Canvas id='canvas-container' shadows>
      <Suspense fallback={null}>
         <Three />
      </Suspense>
    </Canvas>
  )
}

export default App
