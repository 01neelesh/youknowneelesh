import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const WaveBackground = () => {
  const mountRef = useRef(null);
  const frameId = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    // Responsive sizing
    const updateRendererSize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    updateRendererSize();
    mountRef.current.appendChild(renderer.domElement);

    // Create wave layers
    const createWave = (color, yPosition, amplitude) => {
      const geometry = new THREE.PlaneGeometry(200, 100, 100, 50);
      const material = new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity: 0.15,
      });
      const wave = new THREE.Mesh(geometry, material);
      wave.position.y = yPosition;
      wave.rotation.x = -Math.PI / 4;
      wave.userData = { amplitude };
      return wave;
    };

    const waves = [
      createWave(0x4a90e2, 0, 5),    // Blue wave
      createWave(0x50E3C2, -5, 1.5), // Cyan wave
      createWave(0x9B51E0, -10, 1),  // Purple wave
    ];
    waves.forEach(wave => scene.add(wave));
    camera.position.z = 50;

    // Enhanced circular particle system
    const particleCount = 150; // Increased for more density
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 2); // x, y velocities for circular motion
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const centers = new Float32Array(particleCount * 3); // Center points for circular paths

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 20 + Math.random() * 30; // Vary radius for circular paths
      const centerX = (Math.random() - 0.5) * 150;
      const centerY = (Math.random() - 0.5) * 50;
      const centerZ = (Math.random() - 0.5) * 30;

      positions[i * 3] = centerX + Math.cos(angle) * radius;     // x
      positions[i * 3 + 1] = centerY + Math.sin(angle) * radius; // y
      positions[i * 3 + 2] = centerZ;                            // z

      centers[i * 3] = centerX;
      centers[i * 3 + 1] = centerY;
      centers[i * 3 + 2] = centerZ;

      velocities[i * 2] = 0.05 + Math.random() * 0.1; // Speed variation
      velocities[i * 2 + 1] = Math.random() < 0.5 ? 1 : -1; // Direction

      // Neon sci-fi colors
      const color = new THREE.Color();
      color.setHSL((Math.random() * 0.3 + 0.5), 0.9, 0.7); // Blue-purple-green spectrum
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = 1 + Math.random() * 3; // Varied sizes for depth
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    particlesGeometry.setAttribute('center', new THREE.BufferAttribute(centers, 3)); // Store center for circular motion

    const particlesMaterial = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending, // Glow effect
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Animation
    let time = 0;
    const animate = () => {
      frameId.current = requestAnimationFrame(animate);
      time += 0.02;

      // Wave animation
      waves.forEach((wave, index) => {
        const vertices = wave.geometry.attributes.position.array;
        for (let i = 0; i < vertices.length; i += 3) {
          vertices[i + 2] = Math.sin((vertices[i] * 0.05) + (time + index)) *
                           Math.sin((vertices[i + 1] * 0.05) + time) *
                           wave.userData.amplitude;
        }
        wave.geometry.attributes.position.needsUpdate = true;
        wave.rotation.z = Math.sin(time * 0.1) * 0.05;
      });

      // Circular particle animation
      const particlePositions = particles.geometry.attributes.position.array;
      const centersAttr = particles.geometry.attributes.center.array;
      for (let i = 0; i < particleCount; i++) {
        const angle = time * velocities[i * 2] + (i * 0.1);
        particlePositions[i * 3] = centersAttr[i * 3] + Math.cos(angle) * 20; // Circular radius
        particlePositions[i * 3 + 1] = centersAttr[i * 3 + 1] + Math.sin(angle) * 20;
        particlePositions[i * 3 + 2] = centersAttr[i * 3 + 2] + Math.sin(time * 0.5) * 5; // Vertical pulse

        // Pulsing size
        sizes[i] = 1 + Math.sin(time + i) * 1.5;
      }
      particles.geometry.attributes.position.needsUpdate = true;
      particles.geometry.attributes.size.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    // Mouse interaction
    const handleMouseMove = (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      waves.forEach(wave => {
        wave.rotation.x = -Math.PI / 4 + mouseY * 0.1;
        wave.rotation.y = mouseX * 0.1;
      });
      particles.rotation.x = mouseY * 0.05;
      particles.rotation.y = mouseX * 0.05;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', updateRendererSize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateRendererSize);
      cancelAnimationFrame(frameId.current);
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed top-0 left-0 w-full h-full z-[-10]"
    />
  );
};

export default WaveBackground;