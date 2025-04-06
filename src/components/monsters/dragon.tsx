import { useAnimations, useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Group, SkinnedMesh } from 'three';
import { GLTF } from 'three-stdlib';

import { MonsterProps } from '../../types.ts';

type GLTFResult = GLTF & {
  nodes: {
    Root: THREE.Bone;
    Cube221: SkinnedMesh;
    Cube221_1: SkinnedMesh;
    Cube221_2: SkinnedMesh;
    Cube221_3: SkinnedMesh;
    Cube221_4: SkinnedMesh;
  };
  materials: {
    Dragon_Main: THREE.Material;
    Dragon_Secondary: THREE.Material;
    Dragon_Horn: THREE.Material;
    Eye_Black: THREE.Material;
    Eye_White: THREE.Material;
  };
};

export const DragonEvolved = ({ hovered, ...props }: MonsterProps) => {
  const group = useRef<Group>(null!);
  const { nodes, materials, animations } = useGLTF(
    '/models/Dragon_Evolved.gltf'
  ) as unknown as GLTFResult;
  const { actions } = useAnimations(animations, group);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  useEffect(() => {
    const anim = hovered ? 'Headbutt' : 'Flying_Idle';
    const action = actions?.[anim];
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
          <primitive object={nodes.Root} />
          <group name="Dragon">
            <skinnedMesh
              name="Cube221"
              geometry={nodes.Cube221.geometry}
              material={materials.Dragon_Main}
              skeleton={nodes.Cube221.skeleton}
            />
            <skinnedMesh
              name="Cube221_1"
              geometry={nodes.Cube221_1.geometry}
              material={materials.Dragon_Secondary}
              skeleton={nodes.Cube221_1.skeleton}
            />
            <skinnedMesh
              name="Cube221_2"
              geometry={nodes.Cube221_2.geometry}
              material={materials.Dragon_Horn}
              skeleton={nodes.Cube221_2.skeleton}
            />
            <skinnedMesh
              name="Cube221_3"
              geometry={nodes.Cube221_3.geometry}
              material={materials.Eye_Black}
              skeleton={nodes.Cube221_3.skeleton}
            />
            <skinnedMesh
              name="Cube221_4"
              geometry={nodes.Cube221_4.geometry}
              material={materials.Eye_White}
              skeleton={nodes.Cube221_4.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
};

useGLTF.preload('/models/Dragon_Evolved.gltf');
