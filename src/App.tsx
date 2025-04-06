import { Canvas } from '@react-three/fiber';

import { Scene } from './components/scene/scene.tsx';

const App = () => {
  return (
    <>
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 30 }}>
        <Scene />
      </Canvas>
    </>
  );
};

export default App;
