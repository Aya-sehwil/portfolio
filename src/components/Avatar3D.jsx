import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  RoundedBox,
  ContactShadows,
  useTexture,
  useGLTF,
} from "@react-three/drei";
import { MathUtils } from "three";

/** Wraps children and tilts them smoothly toward the cursor. */
function Tilt({ children }) {
  const g = useRef();
  useFrame(({ pointer }, dt) => {
    g.current.rotation.y = MathUtils.damp(
      g.current.rotation.y,
      pointer.x * 0.45,
      4,
      dt,
    );
    g.current.rotation.x = MathUtils.damp(
      g.current.rotation.x,
      -pointer.y * 0.25,
      4,
      dt,
    );
  });
  return <group ref={g}>{children}</group>;
}

/** Floating photo frame (default). */
function PhotoFrame({ src }) {
  const tex = useTexture(src);
  return (
    <Tilt>
      <RoundedBox args={[2.6, 3.4, 0.14]} radius={0.12} smoothness={4}>
        <meshStandardMaterial color="#EFEAE0" roughness={0.55} />
      </RoundedBox>
      <mesh position={[0, 0, 0.08]}>
        <planeGeometry args={[2.35, 3.15]} />
        <meshStandardMaterial map={tex} roughness={0.85} />
      </mesh>
    </Tilt>
  );
}

/** Optional .glb avatar – set profile.avatarGlb in content.js. */
function GlbAvatar({ src }) {
  const { scene } = useGLTF(src);
  return (
    <Tilt>
      <primitive object={scene} scale={1.6} position={[0, -1.4, 0]} />
    </Tilt>
  );
}

export default function Avatar3D({ image, glb }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6.5], fov: 35 }}
      className="!h-[420px] md:!h-[520px]"
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} />
      <Suspense fallback={null}>
        <Float speed={1.4} floatIntensity={0.6} rotationIntensity={0.08}>
          {glb ? <GlbAvatar src={glb} /> : <PhotoFrame src={image} />}
        </Float>
        <ContactShadows
          position={[0, -2.3, 0]}
          opacity={0.3}
          scale={6}
          blur={2.6}
          far={3}
        />
      </Suspense>
    </Canvas>
  );
}
