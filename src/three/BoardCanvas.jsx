import { Component, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import BoardScene from './BoardScene';

class SceneBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { failed: false };
    }

    static getDerivedStateFromError() {
        return { failed: true };
    }

    componentDidCatch() {
        // Silently fall back to the static background — the content stays usable.
    }

    render() {
        return this.state.failed ? null : this.props.children;
    }
}

function supportsWebGL() {
    try {
        const canvas = document.createElement('canvas');
        return Boolean(
            (window.WebGL2RenderingContext && canvas.getContext('webgl2'))
            || canvas.getContext('webgl')
            || canvas.getContext('experimental-webgl'),
        );
    } catch {
        return false;
    }
}

export default function BoardCanvas() {
    const ok = useMemo(supportsWebGL, []);

    if (!ok) {
        return <div className="board-fallback" aria-hidden="true" />;
    }

    return (
        <div className="board-canvas" aria-hidden="true">
            <SceneBoundary>
                <Canvas
                    dpr={[1, 1.75]}
                    camera={{ fov: 38, position: [-30, 13.5, 18], near: 0.1, far: 160 }}
                    gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
                >
                    <BoardScene />
                </Canvas>
            </SceneBoundary>
        </div>
    );
}
