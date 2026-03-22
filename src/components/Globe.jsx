import createGlobe from "cobe";
import { useEffect, useRef } from "react";

export default function Globe() {
  const canvasRef = useRef();
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);

  useEffect(() => {
    let phi = 0;
    let width = 0;
    const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth)
    window.addEventListener('resize', onResize)
    onResize()

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.15,
      dark: 1,
      diffuse: 2, // Rend le globe plus "solide"
      mapSamples: 25000, // Extrêmement dense et détaillé
      mapBrightness: 4,
      baseColor: [0.1, 0.1, 0.1], // Gris très sombre pour la base
      markerColor: [1, 1, 1], // Inutilisé car pas de marqueurs
      glowColor: [0.05, 0.05, 0.08], // Halo gris-bleuté très subtil
      markers: [], // Plus de points/cercles blancs
      onRender: (state) => {
        // Rotation très lente pour un effet majestueux
        if (!pointerInteracting.current) {
          phi += 0.001; 
        }
        state.phi = phi + pointerInteractionMovement.current;
        state.width = width * 2;
        state.height = width * 2;
      }
    });

    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-auto" style={{ perspective: '1200px' }}>
      {/* Taille massive (1400px), positionné légèrement vers le bas pour l'effet "planète en dessous" */}
      <div className="w-full max-w-[1400px] aspect-square relative translate-y-[30%] sm:translate-y-[40%] transition-transform duration-1000 ease-out">
        <canvas
          ref={canvasRef}
          onPointerDown={(e) => {
            pointerInteracting.current = e.clientX - pointerInteractionMovement.current * 200;
          }}
          onPointerUp={() => {
            pointerInteracting.current = null;
          }}
          onPointerOut={() => {
            pointerInteracting.current = null;
          }}
          onMouseMove={(e) => {
            if (pointerInteracting.current !== null) {
              const delta = e.clientX - pointerInteracting.current;
              pointerInteractionMovement.current = delta / 200;
            }
          }}
          onTouchMove={(e) => {
            if (pointerInteracting.current !== null && e.touches[0]) {
              const delta = e.touches[0].clientX - pointerInteracting.current;
              pointerInteractionMovement.current = delta / 200;
            }
          }}
          style={{
            width: '100%',
            height: '100%',
            cursor: 'auto',
            contain: 'layout paint size',
            opacity: 1,
            transition: 'opacity 1s ease',
          }}
        />
      </div>
    </div>
  );
}
