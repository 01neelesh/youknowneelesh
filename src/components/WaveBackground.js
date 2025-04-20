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

    // Create wave layers (grid)
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

    // Add subtle beam lights traveling through the grid
    const createBeamLight = (color, startPosition, direction, speed) => {
      // Create a thin, elongated beam
      const geometry = new THREE.CylinderGeometry(0.1, 0.1, 40, 8);
      geometry.rotateX(Math.PI / 2);
      
      const material = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending
      });
      
      const beam = new THREE.Mesh(geometry, material);
      beam.position.copy(startPosition);
      beam.lookAt(direction);
      
      return {
        mesh: beam,
        speed,
        direction: new THREE.Vector3().subVectors(direction, startPosition).normalize(),
        lifespan: 0,
        maxLife: 100 + Math.random() * 100
      };
    };

    // Create a few beams that will travel along the grid
    const beams = [];
    const beamColors = [0x4a90e2, 0x50E3C2, 0x9B51E0, 0x18CCFC];
    
    for (let i = 0; i < 6; i++) {
      const startPosition = new THREE.Vector3(
        -100 + Math.random() * 50,
        -30 + Math.random() * 30,
        -10 + Math.random() * 20
      );
      
      const endPosition = new THREE.Vector3(
        100,
        -10 + Math.random() * 20,
        -5 + Math.random() * 10
      );
      
      const beam = createBeamLight(
        beamColors[Math.floor(Math.random() * beamColors.length)],
        startPosition,
        endPosition,
        0.5 + Math.random() * 0.5
      );
      
      beams.push(beam);
      scene.add(beam.mesh);
    }

    // Enhanced circular particle system
    const particleCount = 150;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 2);
    const particleColors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const centers = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 20 + Math.random() * 30;
      const centerX = (Math.random() - 0.5) * 150;
      const centerY = (Math.random() - 0.5) * 50;
      const centerZ = (Math.random() - 0.5) * 30;

      positions[i * 3] = centerX + Math.cos(angle) * radius;
      positions[i * 3 + 1] = centerY + Math.sin(angle) * radius;
      positions[i * 3 + 2] = centerZ;

      centers[i * 3] = centerX;
      centers[i * 3 + 1] = centerY;
      centers[i * 3 + 2] = centerZ;

      velocities[i * 2] = 0.05 + Math.random() * 0.1;
      velocities[i * 2 + 1] = Math.random() < 0.5 ? 1 : -1;

      const color = new THREE.Color();
      color.setHSL((Math.random() * 0.3 + 0.5), 0.9, 0.7);
      particleColors[i * 3] = color.r;
      particleColors[i * 3 + 1] = color.g;
      particleColors[i * 3 + 2] = color.b;

      sizes[i] = 1 + Math.random() * 3;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    particlesGeometry.setAttribute('center', new THREE.BufferAttribute(centers, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
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

      // Beam animation - traveling along the grid
      beams.forEach((beam, index) => {
        // Move the beam along its direction
        beam.mesh.position.add(beam.direction.clone().multiplyScalar(beam.speed));
        beam.lifespan += 1;
        
        // Subtle pulsing effect
        const pulse = Math.sin(time * 2) * 0.2;
        beam.mesh.material.opacity = 0.3 + pulse;
        
        // If beam has reached its lifespan, reset it
        if (beam.lifespan > beam.maxLife) {
          // Reset beam to a new starting position
          const startPosition = new THREE.Vector3(
            -100 + Math.random() * 50,
            -30 + Math.random() * 30,
            -10 + Math.random() * 20
          );
          
          const endPosition = new THREE.Vector3(
            100,
            -10 + Math.random() * 20,
            -5 + Math.random() * 10
          );
          
          beam.mesh.position.copy(startPosition);
          beam.direction = new THREE.Vector3().subVectors(endPosition, startPosition).normalize();
          beam.lifespan = 0;
          beam.maxLife = 100 + Math.random() * 100;
          beam.mesh.material.color.set(beamColors[Math.floor(Math.random() * beamColors.length)]);
        }
      });

      // Circular particle animation
      const particlePositions = particles.geometry.attributes.position.array;
      const centersAttr = particles.geometry.attributes.center.array;
      for (let i = 0; i < particleCount; i++) {
        const angle = time * velocities[i * 2] + (i * 0.1);
        particlePositions[i * 3] = centersAttr[i * 3] + Math.cos(angle) * 20;
        particlePositions[i * 3 + 1] = centersAttr[i * 3 + 1] + Math.sin(angle) * 20;
        particlePositions[i * 3 + 2] = centersAttr[i * 3 + 2] + Math.sin(time * 0.5) * 5;

        // Subtle pulsing size
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
      
      // Gentle wave response to mouse
      waves.forEach(wave => {
        wave.rotation.x = -Math.PI / 4 + mouseY * 0.1;
        wave.rotation.y = mouseX * 0.1;
      });
      
      // Particle system response to mouse
      particles.rotation.x = mouseY * 0.05;
      particles.rotation.y = mouseX * 0.05;
      
      // Interactive effect: create a ripple in particles near mouse position
      const mousePos3D = new THREE.Vector3(mouseX * 50, mouseY * 25, 0);
      const particlePositions = particles.geometry.attributes.position.array;
      
      for (let i = 0; i < particleCount; i++) {
        const particlePos = new THREE.Vector3(
          particlePositions[i * 3],
          particlePositions[i * 3 + 1],
          particlePositions[i * 3 + 2]
        );
        
        // Calculate distance to mouse position (in 3D space)
        const distance = particlePos.distanceTo(mousePos3D);
        
        // If particle is close to mouse position, push it slightly away
        if (distance < 20) {
          const direction = particlePos.clone().sub(mousePos3D).normalize();
          particlePositions[i * 3] += direction.x * (20 - distance) * 0.05;
          particlePositions[i * 3 + 1] += direction.y * (20 - distance) * 0.05;
          particlePositions[i * 3 + 2] += direction.z * (20 - distance) * 0.05;
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;
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