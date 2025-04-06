import { useAnimations, useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Group, SkinnedMesh } from 'three';
import { GLTF } from 'three-stdlib';

import { MonsterProps } from '../../types.ts';

type GLTFResult = GLTF & {
  nodes: {
    Body: THREE.Bone;
    Head: THREE.Bone;
    Cube146: SkinnedMesh;
    Cube146_1: SkinnedMesh;
    Cube000: SkinnedMesh;
    Cube000_1: SkinnedMesh;
    Cube000_2: SkinnedMesh;
    Cube000_3: SkinnedMesh;
    Cube000_4: SkinnedMesh;
  };
  materials: {
    Cactoro_Main: THREE.Material;
    Cactoro_Secondary: THREE.Material;
    Cactoro_Red: THREE.Material;
    Eye_Black: THREE.Material;
    Eye_White: THREE.Material;
  };
};

export const Cactoro = ({ hovered, ...props }: MonsterProps) => {
  const group = useRef<Group>(null!);
  const { nodes, materials, animations } = useGLTF('/models/Cactoro.gltf') as unknown as GLTFResult;
  const { actions } = useAnimations(animations, group);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  useEffect(() => {
    const anim = hovered ? 'Dance' : 'Idle';
    const action = actions[anim];
    if (action) {
      action.reset().fadeIn(0.5).play();
      return () => action.fadeOut(0.5);
    }
  }, [hovered, actions]);

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    <group ref={group} {...props}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Body} />
          <primitive object={nodes.Head} />
          <group name="Cactoro_Blob">
            <skinnedMesh
              name="Cube146"
              geometry={nodes.Cube146.geometry}
              material={materials.Cactoro_Main}
              skeleton={nodes.Cube146.skeleton}
            />
            <skinnedMesh
              name="Cube146_1"
              geometry={nodes.Cube146_1.geometry}
              material={materials.Cactoro_Secondary}
              skeleton={nodes.Cube146_1.skeleton}
            />
          </group>
          <group name="Cactoro_Blob001">
            <skinnedMesh
              name="Cube000"
              geometry={nodes.Cube000.geometry}
              material={materials.Cactoro_Main}
              skeleton={nodes.Cube000.skeleton}
            />
            <skinnedMesh
              name="Cube000_1"
              geometry={nodes.Cube000_1.geometry}
              material={materials.Cactoro_Secondary}
              skeleton={nodes.Cube000_1.skeleton}
            />
            <skinnedMesh
              name="Cube000_2"
              geometry={nodes.Cube000_2.geometry}
              material={materials.Cactoro_Red}
              skeleton={nodes.Cube000_2.skeleton}
            />
            <skinnedMesh
              name="Cube000_3"
              geometry={nodes.Cube000_3.geometry}
              material={materials.Eye_Black}
              skeleton={nodes.Cube000_3.skeleton}
            />
            <skinnedMesh
              name="Cube000_4"
              geometry={nodes.Cube000_4.geometry}
              material={materials.Eye_White}
              skeleton={nodes.Cube000_4.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
};

useGLTF.preload('/models/Cactoro.gltf');
