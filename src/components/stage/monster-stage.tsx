import { Environment, MeshPortalMaterial, RoundedBox, Text, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { ReactNode, useRef } from 'react';
import * as THREE from 'three';

import { MonsterName } from '../../types.ts';

export interface MonsterStageProps {
  name: MonsterName;
  color: string;
  texture: string;
  active: MonsterName | null;
  setActive: (name: MonsterName | null) => void;
  hovered: MonsterName | null;
  setHovered: (name: MonsterName | null) => void;
  children: ReactNode;
}

export const MonsterStage = ({
  children,
  texture,
  name,
  color,
  active,
  setActive,
  setHovered,
  ...props
}: MonsterStageProps) => {
  const map = useTexture(texture);
  const portalMaterial = useRef<THREE.MeshStandardMaterial>(null!);

  useFrame((_state, delta) => {
    const isActive = active === name;
    easing.damp(portalMaterial.current, 'blend', isActive ? 1 : 0, 0.2, delta);
  });

  return (
    <group {...props}>
      <Text
        font="fonts/Caprasimo-Regular.ttf"
        fontSize={0.3}
        position={[0, -1.3, 0.051]}
        anchorY="bottom"
      >
        {name}
        <meshBasicMaterial color={color} toneMapped={false} />
      </Text>
      <RoundedBox
        name={name}
        args={[2, 3, 0.1]}
        onDoubleClick={() => setActive(active === name ? null : name)}
        onPointerEnter={() => setHovered(name)}
        onPointerLeave={() => setHovered(null)}
      >
        <MeshPortalMaterial ref={portalMaterial} side={THREE.DoubleSide}>
          <ambientLight intensity={1} />
          <Environment preset="sunset" />
          {children}
          <mesh>
            <sphereGeometry args={[5, 64, 64]} />
            <meshStandardMaterial map={map} side={THREE.BackSide} />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
    </group>
  );
};
