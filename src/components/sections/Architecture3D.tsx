import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Sun, Moon, Box, Home, Loader2 } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

type ViewMode = 'exterior' | 'interior';
type LightingMode = 'day' | 'night';

function ModernHouse({ view }: { view: ViewMode }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y +=
        (state.clock.elapsedTime * 0.05 - groupRef.current.rotation.y) * 0;
    }
  });

  if (view === 'interior') {
    return (
      <group ref={groupRef} position={[0, -1, 0]}>
        {/* Floor */}
        <mesh receiveShadow position={[0, 0, 0]}>
          <boxGeometry args={[6, 0.05, 5]} />
          <meshStandardMaterial color="#2a2520" roughness={0.8} />
        </mesh>
        {/* Back wall */}
        <mesh position={[0, 1.5, -2.5]}>
          <boxGeometry args={[6, 3, 0.05]} />
          <meshStandardMaterial color="#3a3530" roughness={0.9} />
        </mesh>
        {/* Left wall with window cutout feel */}
        <mesh position={[-3, 1.5, 0]}>
          <boxGeometry args={[0.05, 3, 5]} />
          <meshStandardMaterial color="#332e28" roughness={0.9} />
        </mesh>
        {/* Sofa base */}
        <mesh position={[0, 0.3, -1.5]} castShadow>
          <boxGeometry args={[2.5, 0.6, 0.9]} />
          <meshStandardMaterial color="#5a4a38" roughness={0.7} />
        </mesh>
        {/* Sofa back */}
        <mesh position={[0, 0.75, -1.9]} castShadow>
          <boxGeometry args={[2.5, 0.8, 0.2]} />
          <meshStandardMaterial color="#6a5a48" roughness={0.7} />
        </mesh>
        {/* Coffee table */}
        <mesh position={[0, 0.25, 0]} castShadow>
          <boxGeometry args={[1.2, 0.05, 0.6]} />
          <meshStandardMaterial color="#8a7a65" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Table legs */}
        {[
          [-0.5, -0.5],
          [0.5, -0.5],
          [-0.5, 0.5],
          [0.5, 0.5],
        ].map(([x, z], i) => (
          <mesh key={i} position={[x, 0.12, z]}>
            <boxGeometry args={[0.04, 0.25, 0.04]} />
            <meshStandardMaterial color="#5a4a38" metalness={0.5} />
          </mesh>
        ))}
        {/* Floor lamp */}
        <mesh position={[2.2, 0, 1.8]}>
          <cylinderGeometry args={[0.15, 0.15, 0.03, 16]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
        <mesh position={[2.2, 1, 1.8]}>
          <cylinderGeometry args={[0.02, 0.02, 2, 8]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.6} />
        </mesh>
        <mesh position={[2.2, 2, 1.8]}>
          <coneGeometry args={[0.25, 0.4, 16]} />
          <meshStandardMaterial
            color="#edca7a"
            emissive="#d4a049"
            emissiveIntensity={0.6}
          />
        </mesh>
        {/* Wall art */}
        <mesh position={[0, 1.6, -2.47]}>
          <boxGeometry args={[1, 0.7, 0.02]} />
          <meshStandardMaterial color="#6a5a48" roughness={0.5} />
        </mesh>
        {/* Rug */}
        <mesh position={[0, 0.03, 0]}>
          <boxGeometry args={[3, 0.01, 2]} />
          <meshStandardMaterial color="#4a3a28" roughness={0.95} />
        </mesh>
      </group>
    );
  }

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Ground floor base */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[4, 1.5, 3]} />
        <meshStandardMaterial color="#e8e4dc" roughness={0.8} />
      </mesh>

      {/* Upper floor */}
      <mesh castShadow receiveShadow position={[0.5, 1.5, -0.3]}>
        <boxGeometry args={[3, 1.2, 2.4]} />
        <meshStandardMaterial color="#2c2825" roughness={0.7} />
      </mesh>

      {/* Flat roof overhang */}
      <mesh castShadow position={[0, 2.2, 0]}>
        <boxGeometry args={[4.6, 0.08, 3.4]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
      </mesh>

      {/* Large glass windows - ground floor front */}
      <mesh position={[0, 0.3, 1.51]}>
        <boxGeometry args={[3.2, 0.9, 0.02]} />
        <meshStandardMaterial
          color="#88bbdd"
          transparent
          opacity={0.3}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Glass windows - upper floor */}
      <mesh position={[0.5, 1.5, 0.91]}>
        <boxGeometry args={[2, 0.8, 0.02]} />
        <meshStandardMaterial
          color="#88bbdd"
          transparent
          opacity={0.25}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Side glass strip */}
      <mesh position={[2.01, 0.3, 0]}>
        <boxGeometry args={[0.02, 0.9, 2]} />
        <meshStandardMaterial
          color="#88bbdd"
          transparent
          opacity={0.3}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Entrance door */}
      <mesh position={[-1.3, 0.3, 1.51]}>
        <boxGeometry args={[0.7, 1.1, 0.03]} />
        <meshStandardMaterial color="#3a2820" roughness={0.4} metalness={0.3} />
      </mesh>

      {/* Door handle */}
      <mesh position={[-1, 0.3, 1.53]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#d4a049" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Balcony on upper floor */}
      <mesh castShadow position={[0.5, 0.95, 0.7]}>
        <boxGeometry args={[3, 0.06, 0.8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Balcony railing */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={`rail-${i}`} position={[-0.9 + i * 0.3, 1.15, 1.08]}>
          <boxGeometry args={[0.03, 0.4, 0.03]} />
          <meshStandardMaterial color="#3a3a3a" metalness={0.6} />
        </mesh>
      ))}
      <mesh position={[0.5, 1.35, 1.08]}>
        <boxGeometry args={[3, 0.03, 0.03]} />
        <meshStandardMaterial color="#3a3a3a" metalness={0.6} />
      </mesh>

      {/* Landscaping - tree trunks */}
      {[
        [-2.5, 0.8, 1.8],
        [2.5, 0.5, -1.5],
      ].map(([x, h, z], i) => (
        <group key={`tree-${i}`} position={[x, 0, z]}>
          <mesh castShadow position={[0, h / 2, 0]}>
            <cylinderGeometry args={[0.05, 0.08, h, 8]} />
            <meshStandardMaterial color="#4a3520" roughness={0.9} />
          </mesh>
          <mesh castShadow position={[0, h + 0.3, 0]}>
            <sphereGeometry args={[0.4, 16, 16]} />
            <meshStandardMaterial color="#3a5a30" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Pathway stones */}
      {[-0.3, 0.6, 1.5, 2.4].map((z, i) => (
        <mesh key={`stone-${i}`} position={[0, -0.74, z]} receiveShadow>
          <boxGeometry args={[0.8, 0.02, 0.5]} />
          <meshStandardMaterial color="#6a6a6a" roughness={0.9} />
        </mesh>
      ))}

      {/* Accent gold trim under roof */}
      <mesh position={[0, 2.12, 0]}>
        <boxGeometry args={[4.3, 0.02, 3.1]} />
        <meshStandardMaterial
          color="#d4a049"
          metalness={0.7}
          roughness={0.3}
          emissive="#946830"
          emissiveIntensity={0.1}
        />
      </mesh>
    </group>
  );
}

function Scene({ view, lighting }: { view: ViewMode; lighting: LightingMode }) {
  const ambientIntensity = lighting === 'day' ? 0.6 : 0.15;
  const dirIntensity = lighting === 'day' ? 1.2 : 0.2;
  const dirColor = lighting === 'day' ? '#fff5e0' : '#4466aa';

  return (
    <>
      <ambientLight intensity={ambientIntensity} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={dirIntensity}
        color={dirColor}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      {lighting === 'night' && (
        <>
          <pointLight position={[0, 1, 2]} intensity={2} color="#edca7a" distance={8} />
          <pointLight position={[-2, 2, -1]} intensity={1} color="#d4a049" distance={6} />
          <pointLight position={[2, 1, 1]} intensity={1.5} color="#edca7a" distance={5} />
        </>
      )}
      <Suspense fallback={null}>
        <ModernHouse view={view} />
        {lighting === 'day' && <Environment preset="sunset" />}
      </Suspense>
      <ContactShadows
        position={[0, -1.3, 0]}
        opacity={lighting === 'day' ? 0.4 : 0.6}
        scale={12}
        blur={2.5}
        far={4}
        color={lighting === 'day' ? '#000000' : '#000000'}
      />
      <OrbitControls
        enablePan={false}
        minDistance={4}
        maxDistance={12}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.1}
        autoRotate
        autoRotateSpeed={0.5}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  );
}

function CanvasLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Loader2 className="animate-spin text-gold-400" size={32} />
    </div>
  );
}

export function Architecture3D() {
  const { ref, visible } = useScrollReveal();
  const [view, setView] = useState<ViewMode>('exterior');
  const [lighting, setLighting] = useState<LightingMode>('day');

  return (
    <section
      id="3d-experience"
      ref={ref}
      className="relative py-24 md:py-32 bg-ink-950 overflow-hidden"
    >
      <div className="blueprint-grid absolute inset-0 opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-transparent to-ink-950" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-[10px] tracking-[0.35em] text-gold-400 uppercase mb-4">
            Interactive Experience
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-cream-100">
            Step Inside Our Designs
          </h2>
          <p className="mt-4 text-sm md:text-base text-cream-300/60 max-w-xl mx-auto leading-relaxed">
            Explore a modern residence in 3D. Rotate, zoom and switch between
            day and night views to experience the space.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={visible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden glass"
          data-cursor="explore"
        >
          <div className="relative h-[400px] md:h-[560px] bg-gradient-to-b from-ink-850 to-ink-900">
            <Canvas
              shadows
              camera={{ position: [6, 4, 7], fov: 45 }}
              dpr={[1, 2]}
              gl={{ antialias: true, alpha: true }}
            >
              <Suspense fallback={<CanvasLoader />}>
                <Scene view={view} lighting={lighting} />
              </Suspense>
            </Canvas>

            {/* View controls overlay */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2">
              <ToggleButton
                active={view === 'exterior'}
                onClick={() => setView('exterior')}
                icon={<Box size={14} />}
                label="Exterior"
              />
              <ToggleButton
                active={view === 'interior'}
                onClick={() => setView('interior')}
                icon={<Home size={14} />}
                label="Interior"
              />
            </div>

            <div className="absolute top-4 right-4 flex gap-2">
              <ToggleButton
                active={lighting === 'day'}
                onClick={() => setLighting('day')}
                icon={<Sun size={14} />}
                label="Day"
              />
              <ToggleButton
                active={lighting === 'night'}
                onClick={() => setLighting('night')}
                icon={<Moon size={14} />}
                label="Night"
              />
            </div>

            {/* Hint */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.2em] uppercase text-cream-300/40">
              Drag to rotate &bull; Scroll to zoom
            </div>
          </div>
        </motion.div>

        {/* Feature labels */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          {['Modern Facade', 'Large Glass Windows', 'Landscape', 'Entrance', 'Balcony'].map(
            (label) => (
              <span
                key={label}
                className="text-xs tracking-[0.1em] uppercase text-cream-300/50 border border-cream-300/10 px-4 py-2 rounded-full"
              >
                {label}
              </span>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}

function ToggleButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs tracking-[0.1em] uppercase transition-all ${
        active
          ? 'bg-gold-500 text-ink-950 font-medium'
          : 'glass-light text-cream-300/70 hover:text-gold-400'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
