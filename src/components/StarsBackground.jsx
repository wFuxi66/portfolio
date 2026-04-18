import React, { useRef, useEffect } from 'react';

export const StarsBackground = ({ starColor = '#ffffff', className = '' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let mouse = { x: null, y: null };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => { mouse.x = null; mouse.y = null; };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const stars = Array.from({ length: 250 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      baseX: Math.random() * canvas.width,
      baseY: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.1,
      alpha: Math.random() * 0.7 + 0.1,
      alphaChange: (Math.random() * 0.02 + 0.005) * (Math.random() < 0.5 ? 1 : -1),
    }));

    if (reducedMotion) {
      ctx.fillStyle = starColor;
      stars.forEach(star => {
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      return () => window.removeEventListener('resize', resize);
    }

    window.addEventListener('mousemove', handleMouseMove);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = starColor;
      stars.forEach(star => {
        star.alpha += star.alphaChange;
        if (star.alpha <= 0.1) { star.alpha = 0.1; star.alphaChange = Math.abs(star.alphaChange); }
        else if (star.alpha >= 0.8) { star.alpha = 0.8; star.alphaChange = -Math.abs(star.alphaChange); }
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - star.x;
          const dy = mouse.y - star.y;
          if (dx * dx + dy * dy < 10000) { star.x -= dx * 0.03; star.y -= dy * 0.03; }
        }
        star.x += (star.baseX - star.x) * 0.02;
        star.y += (star.baseY - star.y) * 0.02;
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) { cancelAnimationFrame(animationFrameId); }
      else { draw(); }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, [starColor]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 z-0 pointer-events-none ${className}`}
    />
  );
};
