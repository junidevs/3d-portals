import { CameraControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { RefObject, useEffect } from 'react';
import * as THREE from 'three';

import { MonsterName } from '../types.ts';

export const useCameraFocus = (
  active: MonsterName | null,
  controlsRef: RefObject<CameraControls>
) => {
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    if (!controlsRef.current) return;

    if (active) {
      const targetPosition = new THREE.Vector3();
      const targetObject = scene.getObjectByName(active);
      if (targetObject) {
        targetObject.getWorldPosition(targetPosition);
        controlsRef.current.setLookAt(
          0,
          0,
          5,
          targetPosition.x,
          targetPosition.y,
          targetPosition.z,
          true
        );
      }
    } else {
      controlsRef.current.setLookAt(0, 0, 10, 0, 0, 0, true);
    }
  }, [active, controlsRef, scene]);
};
