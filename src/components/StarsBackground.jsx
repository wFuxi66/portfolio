import React, { useRef, useEffect } from 'react';

export const StarsBackground = ({ starColor = '#ffffff', className = '' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let mouse = { x: null, y: null };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    // Generate static stars
    const numStars = 250;
    const stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        baseX: Math.random() * canvas.width,
        baseY: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.1,
        alpha: Math.random(),
        alphaChange: (Math.random() * 0.02 + 0.005) * (Math.random() < 0.5 ? 1 : -1)
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = starColor;

      stars.forEach(star => {
        // Twinkle effect
        star.alpha += star.alphaChange;
        if (star.alpha <= 0.1) {
          star.alpha = 0.1;
          star.alphaChange = Math.abs(star.alphaChange);
        } else if (star.alpha >= 0.8) {
          star.alpha = 0.8;
          star.alphaChange = -Math.abs(star.alphaChange);
        }

        // Mouse interaction (repel effect)
        let dx = 0;
        let dy = 0;
        if (mouse.x !== null && mouse.y !== null) {
          dx = mouse.x - star.x;
          dy = mouse.y - star.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            // Push stars away from the cursor
            star.x -= dx * 0.03;
            star.y -= dy * 0.03;
          }
        }

        // Gently return to base position
        star.x += (star.baseX - star.x) * 0.02;
        star.y += (star.baseY - star.y) * 0.02;

        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [starColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 z-0 pointer-events-none ${className}`}
    />
  );
};
