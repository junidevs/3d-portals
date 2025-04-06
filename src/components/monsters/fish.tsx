import { useAnimations, useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Group, SkinnedMesh } from 'three';
import { GLTF } from 'three-stdlib';

import { MonsterProps } from '../../types.ts';

type GLTFResult = GLTF & {
  nodes: {
    Root: THREE.Bone;
    Sphere026: SkinnedMesh;
    Sphere026_1: SkinnedMesh;
    Sphere026_2: SkinnedMesh;
    Sphere026_3: SkinnedMesh;
    Sphere026_4: SkinnedMesh;
    Sphere026_5: SkinnedMesh;
  };
  materials: {
    Fish_Main: THREE.Material;
    Fish_Secondary: THREE.Material;
    Eye_Black: THREE.Material;
    Eye_White: THREE.Material;
    Mouth: THREE.Material;
    Fish_Flaps: THREE.Material;
  };
};

export const Fish = ({ hovered, ...props }: MonsterProps) => {
  const group = useRef<Group>(null!);
  const { nodes, materials, animations } = useGLTF('/models/Fish.gltf') as unknown as GLTFResult;
  const { actions } = useAnimations(animations, group);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  useEffect(() => {
    const anim = hovered ? 'Wave' : 'Idle';
    const action = actions?.[anim];
    if (action) {
      action.reset().fadeIn(0.5).play();
      return () => action.fadeOut(0.5);
    }
  }, [hovered, actions]);

  return (
    <group ref={group} {...props}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <group name="Fish">
            <skinnedMesh
              name="Sphere026"
              geometry={nodes.Sphere026.geometry}
              material={materials.Fish_Main}
              skeleton={nodes.Sphere026.skeleton}
            />
            <skinnedMesh
              name="Sphere026_1"
              geometry={nodes.Sphere026_1.geometry}
              material={materials.Fish_Secondary}
              skeleton={nodes.Sphere026_1.skeleton}
            />
            <skinnedMesh
              name="Sphere026_2"
              geometry={nodes.Sphere026_2.geometry}
              material={materials.Eye_Black}
              skeleton={nodes.Sphere026_2.skeleton}
            />
            <skinnedMesh
              name="Sphere026_3"
              geometry={nodes.Sphere026_3.geometry}
              material={materials.Eye_White}
              skeleton={nodes.Sphere026_3.skeleton}
            />
            <skinnedMesh
              name="Sphere026_4"
              geometry={nodes.Sphere026_4.geometry}
              material={materials.Mouth}
              skeleton={nodes.Sphere026_4.skeleton}
            />
            <skinnedMesh
              name="Sphere026_5"
              geometry={nodes.Sphere026_5.geometry}
              material={materials.Fish_Flaps}
              skeleton={nodes.Sphere026_5.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
};

useGLTF.preload('/models/Fish.gltf');
