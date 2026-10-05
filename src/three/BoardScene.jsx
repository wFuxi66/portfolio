import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { sceneState } from '../lib/sceneState';
import { BOARD_W, BOARD_D, TEX_W, TEX_H, paintBoard } from './boardTexture';

// Section anchors on the board (one zone per section, west → east) — camera
// keyframes below are aligned with the silkscreen zones painted on the PCB.

const KEYFRAMES = [
    { pos: [-20.6, 5.4, 9.2], look: [-13.0, 0, -2.2] }, // 00 hero
    { pos: [-12.4, 8.2, 8.6], look: [-9.8, 0, -1.2] }, // 01 profil
    { pos: [-7.3, 8.4, 9.0], look: [-5.0, 0, -1.2] }, // 02 formation
    { pos: [-2.3, 7.9, 8.6], look: [-0.3, 0, -1.2] }, // 03 expérience
    { pos: [2.6, 8.5, 9.2], look: [4.8, 0, -1.2] }, // 04 projets
    { pos: [7.5, 8.0, 8.7], look: [9.7, 0, -1.2] }, // 05 compétences
    { pos: [12.7, 6.4, 8.6], look: [15.6, 0, -1.8] }, // 06 contact
];

const CHIPS = [
    { x: -15, z: 2.6, w: 3.2, d: 2.4, h: 0.34, pins: 8 },
    { x: -10, z: -2.5, w: 2.6, d: 2.2, h: 0.3, pins: 7 },
    { x: -5, z: 2.2, w: 2.3, d: 2.0, h: 0.28, pins: 6 },
    { x: 0, z: -2.5, w: 2.8, d: 2.2, h: 0.3, pins: 7 },
    { x: 5, z: 2.2, w: 2.4, d: 2.0, h: 0.26, pins: 6 },
    { x: 10, z: -2.5, w: 2.6, d: 2.2, h: 0.3, pins: 7 },
    { x: 15, z: 2.4, w: 3.0, d: 2.4, h: 0.32, pins: 8 },
];

const CAPS = [
    [-16.4, 4.4], [-11.8, 6.2], [-6.4, -5.2], [-1.4, 4.6],
    [3.4, -5.4], [8.2, 4.2], [12.2, -4.6], [16.6, -3.2],
];

const BUS_A = [
    [-18, 8.9], [-16.6, 7.5], [-13.6, 7.5], [-11.1, 5.0], [-8.1, 5.0],
    [-5.6, 7.5], [-2.6, 7.5], [-0.1, 5.0], [2.9, 5.0], [5.4, 7.5],
    [8.4, 7.5], [10.9, 5.0], [13.9, 5.0], [16.2, 7.3], [18, 7.3],
];

const BUS_B = [
    [-18, -5.4], [-15.4, -5.4], [-13.2, -7.6], [-9.2, -7.6], [-7.0, -5.4],
    [-3.0, -5.4], [-0.8, -7.6], [3.2, -7.6], [5.4, -5.4], [9.4, -5.4],
    [11.6, -7.6], [15.6, -7.6], [17.2, -6.2], [18, -6.2],
];

const smooth = (t) => t * t * (3 - 2 * t);
const damp = (k, dt) => 1 - Math.exp(-k * dt);

function toCurve(points, y = 0.085) {
    return new THREE.CatmullRomCurve3(points.map(([x, z]) => new THREE.Vector3(x, y, z)));
}

const CURVE_A = toCurve(BUS_A);
const CURVE_B = toCurve(BUS_B);
const CURVE_A_PULSE = toCurve(BUS_A, 0.09);
const CURVE_B_PULSE = toCurve(BUS_B, 0.095);

function makeGlowTexture() {
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.25, 'rgba(255,228,190,0.5)');
    grad.addColorStop(1, 'rgba(255,200,140,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
}

function useBoardTexture() {
    const { gl } = useThree();
    const canvas = useMemo(() => {
        const c = document.createElement('canvas');
        c.width = TEX_W;
        c.height = TEX_H;
        return c;
    }, []);

    const texture = useMemo(() => {
        const t = new THREE.CanvasTexture(canvas);
        t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy());
        return t;
    }, [canvas, gl]);

    useEffect(() => {
        let cancelled = false;
        const draw = () => {
            paintBoard(canvas);
            texture.needsUpdate = true;
        };
        draw();
        if (document.fonts?.ready) {
            document.fonts.ready.then(() => {
                if (!cancelled) draw();
            });
        }
        return () => {
            cancelled = true;
        };
    }, [canvas, texture]);

    return texture;
}

function Trace({ curve }) {
    return (
        <mesh>
            <tubeGeometry args={[curve, 260, 0.06, 8, false]} />
            <meshStandardMaterial
                color="#c07a3e"
                metalness={0.72}
                roughness={0.34}
                emissive="#54290d"
                emissiveIntensity={0.42}
            />
        </mesh>
    );
}

function Pulses({ curve, count, speed, phase = 0, size = 0.62 }) {
    const group = useRef();
    const texture = useMemo(() => makeGlowTexture(), []);

    useFrame(({ clock }) => {
        if (!group.current) return;
        const t = sceneState.reducedMotion ? phase : clock.getElapsedTime() * speed + phase;
        group.current.children.forEach((child, i) => {
            const u = (((t + i / count) % 1) + 1) % 1;
            curve.getPointAt(u, child.position);
            const flicker = 0.8 + Math.sin((u * 6 + phase) * Math.PI) * 0.2;
            child.scale.setScalar(size * flicker);
        });
    });

    return (
        <group ref={group}>
            {Array.from({ length: count }).map((_, i) => (
                <sprite key={i} position={[0, 0.085, 0]}>
                    <spriteMaterial
                        map={texture}
                        color="#ffd9a8"
                        transparent
                        opacity={0.85}
                        depthWrite={false}
                        blending={THREE.AdditiveBlending}
                    />
                </sprite>
            ))}
        </group>
    );
}

function Chip({ x, z, w, d, h, pins }) {
    const bodyY = h / 2 + 0.02;
    const pinSpacing = (w - 0.5) / Math.max(1, pins - 1);
    const pinX = (i) => x - w / 2 + 0.25 + i * pinSpacing;

    return (
        <group>
            <mesh position={[x, bodyY, z]}>
                <boxGeometry args={[w, h, d]} />
                <meshStandardMaterial color="#15181d" metalness={0.42} roughness={0.42} />
            </mesh>
            {Array.from({ length: pins }).map((_, i) => (
                <group key={i}>
                    <mesh position={[pinX(i), 0.05, z - d / 2 - 0.18]}>
                        <boxGeometry args={[0.15, 0.06, 0.44]} />
                        <meshStandardMaterial color="#c8a05a" metalness={0.85} roughness={0.3} />
                    </mesh>
                    <mesh position={[pinX(i), 0.05, z + d / 2 + 0.18]}>
                        <boxGeometry args={[0.15, 0.06, 0.44]} />
                        <meshStandardMaterial color="#c8a05a" metalness={0.85} roughness={0.3} />
                    </mesh>
                </group>
            ))}
            {/* Pin-1 marker */}
            <mesh position={[x - w / 2 + 0.32, h + 0.035, z - d / 2 + 0.32]}>
                <cylinderGeometry args={[0.09, 0.09, 0.03, 16]} />
                <meshStandardMaterial color="#d8b06a" metalness={0.8} roughness={0.3} />
            </mesh>
        </group>
    );
}

function Capacitor({ x, z }) {
    return (
        <group position={[x, 0, z]}>
            <mesh position={[0, 0.27, 0]}>
                <cylinderGeometry args={[0.32, 0.32, 0.52, 20]} />
                <meshStandardMaterial color="#191d23" metalness={0.5} roughness={0.42} />
            </mesh>
            <mesh position={[0, 0.545, 0]}>
                <cylinderGeometry args={[0.29, 0.29, 0.05, 20]} />
                <meshStandardMaterial color="#b98a4c" metalness={0.8} roughness={0.32} />
            </mesh>
        </group>
    );
}

function Crystal() {
    return (
        <group position={[-3.3, 0, 0.6]}>
            <mesh position={[0, 0.14, 0]}>
                <cylinderGeometry args={[0.5, 0.5, 0.26, 24]} />
                <meshStandardMaterial color="#b9bdc4" metalness={0.92} roughness={0.24} />
            </mesh>
        </group>
    );
}

function Header() {
    return (
        <group position={[17.55, 0, 0]}>
            <mesh position={[0, 0.24, 0]}>
                <boxGeometry args={[0.9, 0.48, 3.6]} />
                <meshStandardMaterial color="#14161b" metalness={0.35} roughness={0.5} />
            </mesh>
            {Array.from({ length: 8 }).map((_, i) => (
                <mesh
                    key={i}
                    position={[(i % 2 ? 0.22 : -0.22), 0.56, -1.2 + Math.floor(i / 2) * 0.8]}
                >
                    <cylinderGeometry args={[0.09, 0.09, 0.5, 10]} />
                    <meshStandardMaterial color="#d8b06a" metalness={0.88} roughness={0.28} />
                </mesh>
            ))}
        </group>
    );
}

function Screws() {
    return (
        <group>
            {[[-17.2, -10.2], [-17.2, 10.2], [17.2, -10.2], [17.2, 10.2]].map(([x, z]) => (
                <group key={`${x}:${z}`} position={[x, 0, z]}>
                    <mesh position={[0, 0.05, 0]}>
                        <cylinderGeometry args={[0.62, 0.62, 0.1, 28]} />
                        <meshStandardMaterial color="#8f6432" metalness={0.85} roughness={0.35} />
                    </mesh>
                    <mesh position={[0, 0.11, 0]}>
                        <cylinderGeometry args={[0.38, 0.38, 0.06, 24]} />
                        <meshStandardMaterial color="#05060a" metalness={0.2} roughness={0.9} />
                    </mesh>
                </group>
            ))}
        </group>
    );
}

function Board() {
    const texture = useBoardTexture();

    return (
        <group>
            {/* FR-4 slab */}
            <mesh position={[0, -0.25, 0]}>
                <boxGeometry args={[BOARD_W, 0.5, BOARD_D]} />
                <meshStandardMaterial color="#0b0d10" metalness={0.3} roughness={0.62} />
            </mesh>
            {/* Artwork surface */}
            <mesh position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[BOARD_W, BOARD_D]} />
                <meshStandardMaterial map={texture} metalness={0.22} roughness={0.56} />
            </mesh>

            {CHIPS.map((chip, i) => (
                <Chip key={i} {...chip} />
            ))}
            {CAPS.map(([x, z], i) => (
                <Capacitor key={i} x={x} z={z} />
            ))}
            <Crystal />
            <Header />
            <Screws />

            {/* Copper buses + travelling signal */}
            <Trace curve={CURVE_A} />
            <Trace curve={CURVE_B} />
            <Pulses curve={CURVE_A_PULSE} count={9} speed={0.055} phase={0.0} />
            <Pulses curve={CURVE_B_PULSE} count={7} speed={0.045} phase={0.4} size={0.55} />
        </group>
    );
}

function CameraRig() {
    const { camera } = useThree();
    const targetPos = useRef(new THREE.Vector3(-20.6, 5.4, 9.2));
    const targetLook = useRef(new THREE.Vector3(-13.0, 0, -2.2));
    const currentLook = useRef(new THREE.Vector3(-10, 0, 0));
    const started = useRef(false);

    useFrame((_, delta) => {
        const dt = Math.min(delta, 0.05);
        const idx = THREE.MathUtils.clamp(sceneState.index, 0, KEYFRAMES.length - 1);
        const i = Math.floor(idx);
        const j = Math.min(KEYFRAMES.length - 1, i + 1);
        const t = smooth(idx - i);
        const a = KEYFRAMES[i];
        const b = KEYFRAMES[j];

        const mx = sceneState.reducedMotion ? 0 : sceneState.mouseX;
        const my = sceneState.reducedMotion ? 0 : sceneState.mouseY;

        targetPos.current.set(
            THREE.MathUtils.lerp(a.pos[0], b.pos[0], t) + mx * 0.85,
            THREE.MathUtils.lerp(a.pos[1], b.pos[1], t) - my * 0.5,
            THREE.MathUtils.lerp(a.pos[2], b.pos[2], t),
        );
        targetLook.current.set(
            THREE.MathUtils.lerp(a.look[0], b.look[0], t) + mx * 0.4,
            THREE.MathUtils.lerp(a.look[1], b.look[1], t) - my * 0.3,
            THREE.MathUtils.lerp(a.look[2], b.look[2], t),
        );

        // First frames: start from a wider establishing shot.
        if (!started.current) {
            started.current = true;
            camera.position.set(-30, 13.5, 18);
            currentLook.current.set(-8, 0, -2);
        }

        const k = damp(2.3, dt);
        camera.position.lerp(targetPos.current, k);
        currentLook.current.lerp(targetLook.current, k);
        camera.lookAt(currentLook.current);
    });

    return null;
}

export default function BoardScene() {
    return (
        <>
            <color attach="background" args={['#07080b']} />
            <fog attach="fog" args={['#07080b', 26, 64]} />

            <ambientLight intensity={0.42} color="#ffe9cc" />
            <directionalLight position={[10, 15, 8]} intensity={1.55} color="#fff1dd" />
            <directionalLight position={[-14, 8, -10]} intensity={0.5} color="#93a7ff" />
            <pointLight position={[-16, 3, 6]} intensity={13} distance={16} color="#ff9a4d" />
            <pointLight position={[14, 3.5, -4]} intensity={10} distance={16} color="#ffb066" />

            <Board />
            <CameraRig />
        </>
    );
}
