import { Canvas, useFrame } from '@react-three/fiber'
import React, { useMemo, useRef } from 'react'
import * as THREE from 'three'

function Petals({ count = 10200 }) {
  const pointsRef = useRef<THREE.Points>(null)
  const geometry = useMemo(() => new THREE.BufferGeometry(), [])
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 22
      pos[i * 3 + 1] = Math.random() * 16
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12
    }
    return pos
  }, [count])
  const seed = useMemo(() => Float32Array.from({ length: count }, () => Math.random()), [count])
  const speed = useMemo(() => Float32Array.from({ length: count }, () => 0.02 + Math.random() * 0.05), [count])
  const rot = useMemo(() => Float32Array.from({ length: count }, () => Math.random() * Math.PI * 10), [count])
  const rotSpeed = useMemo(() => Float32Array.from({ length: count }, () => (Math.random() * 0.8 - 0.4) * 0.6), [count])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uGoldA: { value: new THREE.Color('#f5c86a') },
      uGoldB: { value: new THREE.Color('#ffd9a8') },
      uRim: { value: new THREE.Color('#fff3cf') },
      uSize: { value: 40.0 },
    }),
    []
  )

  const vertex = /* glsl */ `
    uniform float uTime;
    uniform float uSize;
    attribute float aSeed;
    attribute float aSpeed;
    attribute float aRot;
    attribute float aRotSpeed;
    varying float vAngle;
    void main() {
      vec3 pos = position;
      float t = uTime * (0.8 + aSpeed * 22.0) + aSeed * 12.0;
      pos.y -= aSpeed * (uTime * 2.6 + aSeed * 12.0);   // gravity stronger
      pos.x += sin(t) * 0.09;                            // wind sway
      pos.z += cos(t * 0.7) * 0.06;
      if (pos.y < -2.0) pos.y = 16.0;
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      float pSize = uSize * (1.0 / -mvPosition.z);
      gl_PointSize = min(pSize, 60.0);
      vAngle = aRot + uTime * aRotSpeed;
    }
  `

  const fragment = /* glsl */ `
    precision mediump float;
    uniform vec3 uGoldA;
    uniform vec3 uGoldB;
    uniform vec3 uRim;
    varying float vAngle;
    // Signed Distance for a petal-like shape
    float sdPetal(vec2 p) {
      p.y *= 1.25;               // stretch
      p.x *= 0.8;                // squash
      float r = length(p);
      float heart = r - (0.55 - 0.25 * (1.0 - abs(p.x)));
      return heart;
    }
    void main() {
      vec2 uv = gl_PointCoord.xy * 2.0 - 1.0;
      // rotate by varying angle per petal
      float ang = vAngle;
      mat2 R = mat2(cos(ang), -sin(ang), sin(ang), cos(ang));
      vec2 p = R * uv;
      float d = sdPetal(p);
      float alpha = smoothstep(0.12, -0.02, d);
      if (alpha <= 0.0) discard;
      float rim = smoothstep(0.15, 0.0, abs(d));
      vec3 base = mix(uGoldA, uGoldB, 0.5 + 0.5 * p.y);
      vec3 color = base + uRim * pow(rim, 1.8) * 0.9;
      gl_FragColor = vec4(color, alpha * 0.95);
    }
  `

  const material = useMemo(() => new THREE.ShaderMaterial({
    uniforms,
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), [])

  useMemo(() => {
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1))
    geometry.setAttribute('aSpeed', new THREE.BufferAttribute(speed, 1))
    geometry.setAttribute('aRot', new THREE.BufferAttribute(rot, 1))
    geometry.setAttribute('aRotSpeed', new THREE.BufferAttribute(rotSpeed, 1))
  }, [geometry, positions, seed, speed, rot, rotSpeed])

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime
    const p = pointsRef.current
    if (!p) return
    p.geometry.attributes.position.needsUpdate = true
  })

  return <points ref={pointsRef} geometry={geometry} material={material} frustumCulled />
}

export default function ParticlesScene() {
  const isSmall = typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches
  const density = isSmall ? 2600 : 5200
  const camZ = isSmall ? 5.8 : 5
  return (
    <div className="absolute inset-0 -z-5 pointer-events-none">
      <Canvas camera={{ position: [0, 1.5, camZ], fov: 60 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 10, 5]} intensity={0.9} />
        <Petals count={density} />
      </Canvas>
    </div>
  )
}


