import { CameraControls, Environment, useCursor } from '@react-three/drei';
import { useRef, useState } from 'react';

import { useCameraFocus } from '../../hooks/useCameraFocus.ts';
import { MonsterName } from '../../types.ts';
import { Cactoro } from '../monsters/cactoro.tsx';
import { DragonEvolved } from '../monsters/dragon.tsx';
import { Fish } from '../monsters/fish.tsx';
import { MonsterStage } from '../stage/monster-stage.tsx';

export const Scene = () => {
  const [active, setActive] = useState<MonsterName | null>(null);
  const [hovered, setHovered] = useState<MonsterName | null>(null);
  const controlsRef = useRef<CameraControls>(null!);

  useCursor(hovered !== null);
  useCameraFocus(active, controlsRef);

  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />
      <CameraControls ref={controlsRef} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 6} />

      <MonsterStage
        name="Fish King"
        color="#38adcf"
        texture="textures/anime_art_style_a_water_based_pokemon_like_environ.jpg"
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      >
        <Fish scale={0.6} position-y={-1} hovered={hovered === 'Fish King'} />
      </MonsterStage>

      <MonsterStage
        name="Dragon"
        color="#df8d52"
        texture="textures/anime_art_style_lava_world.jpg"
        position-x={-2.5}
        rotation-y={Math.PI / 8}
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      >
        <DragonEvolved scale={0.5} position-y={-1} hovered={hovered === 'Dragon'} />
      </MonsterStage>

      <MonsterStage
        name="Cactoro"
        color="#739d3c"
        texture="textures/anime_art_style_cactus_forest.jpg"
        position-x={2.5}
        rotation-y={-Math.PI / 8}
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      >
        <Cactoro scale={0.45} position-y={-1} hovered={hovered === 'Cactoro'} />
      </MonsterStage>
    </>
  );
};
