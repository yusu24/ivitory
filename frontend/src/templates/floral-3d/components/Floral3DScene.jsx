import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Create a soft glowing circular particle texture on an offscreen canvas
 */
function createSparkleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255, 250, 240, 1)');
  grad.addColorStop(0.3, 'rgba(248, 200, 212, 0.85)');
  grad.addColorStop(0.7, 'rgba(212, 175, 55, 0.25)');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * Create a realistic 3D Rose / Cherry Blossom Petal geometry
 */
function createPetalGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(0.22, 0.12, 0.36, 0.42, 0.18, 0.68);
  shape.bezierCurveTo(0.08, 0.8, 0.02, 0.72, 0, 0.62);
  shape.bezierCurveTo(-0.02, 0.72, -0.08, 0.8, -0.18, 0.68);
  shape.bezierCurveTo(-0.36, 0.42, -0.22, 0.12, 0, 0);

  const geom = new THREE.ShapeGeometry(shape, 12);
  // Bend the vertices slightly to give it a 3D curved petal cup shape
  const pos = geom.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const curveZ = Math.sin(y * Math.PI) * 0.08 - (x * x) * 0.35;
    pos.setZ(i, curveZ);
  }
  geom.computeVertexNormals();
  geom.center();
  return geom;
}

/**
 * Build a 3D Blooming Rose/Peony flower group from layered petals
 */
function create3DBloomingFlower(petalGeom, colorHex, goldMaterial) {
  const flowerGroup = new THREE.Group();

  const outerMat = new THREE.MeshStandardMaterial({
    color: colorHex,
    roughness: 0.45,
    metalness: 0.08,
    side: THREE.DoubleSide,
  });

  const innerMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(colorHex).lerp(new THREE.Color('#ffffff'), 0.35),
    roughness: 0.4,
    metalness: 0.1,
    side: THREE.DoubleSide,
  });

  // Outer ring of 6 petals
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const petalPivot = new THREE.Group();
    petalPivot.rotation.z = angle;

    const mesh = new THREE.Mesh(petalGeom, outerMat);
    mesh.position.y = 0.26;
    mesh.rotation.x = 0.45;
    mesh.scale.set(1.15, 1.15, 1.15);
    petalPivot.add(mesh);
    flowerGroup.add(petalPivot);
  }

  // Inner ring of 5 cupped petals
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2 + 0.3;
    const petalPivot = new THREE.Group();
    petalPivot.rotation.z = angle;

    const mesh = new THREE.Mesh(petalGeom, innerMat);
    mesh.position.y = 0.18;
    mesh.position.z = 0.05;
    mesh.rotation.x = 0.78;
    mesh.scale.set(0.82, 0.82, 0.82);
    petalPivot.add(mesh);
    flowerGroup.add(petalPivot);
  }

  // Golden stamen pearl center
  const centerGeom = new THREE.SphereGeometry(0.09, 16, 16);
  const centerMesh = new THREE.Mesh(centerGeom, goldMaterial);
  centerMesh.position.z = 0.08;
  flowerGroup.add(centerMesh);

  return flowerGroup;
}

export default function Floral3DScene({ isCover = false, animate: shouldAnimate = true }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xfdf4f6, 0.055);

    // 2. Camera
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.2, isCover ? 5.8 : 6.5);

    // 3. Renderer
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Romantic Lighting
    const ambientLight = new THREE.AmbientLight(0xfff0f5, 1.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffe4e9, 2.6);
    dirLight1.position.set(5, 8, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xd4af37, 1.8);
    dirLight2.position.set(-6, -4, 4);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffb6c1, 2.2, 15);
    pointLight.position.set(0, 1.5, 3);
    scene.add(pointLight);

    // 5. Materials
    const roseGoldMaterial = new THREE.MeshStandardMaterial({
      color: 0xe6b89c,
      metalness: 0.88,
      roughness: 0.18,
    });

    const champagneGoldMaterial = new THREE.MeshStandardMaterial({
      color: 0xd9b36c,
      metalness: 0.9,
      roughness: 0.15,
    });

    const diamondMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.9,
      ior: 2.4,
      reflectivity: 1,
    });

    // 6. Centerpiece: Interlocked 3D Wedding Rings + Floral Wreath Arch
    const centerGroup = new THREE.Group();
    scene.add(centerGroup);

    // Groom Ring (Champagne Gold)
    const ring1Geom = new THREE.TorusGeometry(0.78, 0.065, 32, 100);
    const ring1 = new THREE.Mesh(ring1Geom, champagneGoldMaterial);
    ring1.position.set(-0.32, 0.15, 0);
    ring1.rotation.set(0.45, 0.35, -0.2);
    centerGroup.add(ring1);

    // Bride Ring (Rose Gold + 3D Diamond Solitaire)
    const ring2Group = new THREE.Group();
    const ring2Geom = new THREE.TorusGeometry(0.72, 0.055, 32, 100);
    const ring2 = new THREE.Mesh(ring2Geom, roseGoldMaterial);
    ring2Group.add(ring2);

    // Diamond solitaire on top of Bride's ring
    const diamondGeom = new THREE.OctahedronGeometry(0.13, 1);
    const diamond = new THREE.Mesh(diamondGeom, diamondMaterial);
    diamond.position.set(0, 0.78, 0);
    diamond.scale.set(1, 0.75, 1);
    ring2Group.add(diamond);

    ring2Group.position.set(0.32, -0.05, 0.12);
    ring2Group.rotation.set(-0.35, -0.4, 0.25);
    centerGroup.add(ring2Group);

    // Outer Golden Floral Halo Arch
    const haloGeom = new THREE.TorusGeometry(2.35, 0.018, 16, 120);
    const haloMesh = new THREE.Mesh(haloGeom, champagneGoldMaterial);
    haloMesh.position.set(0, 0.05, -0.8);
    centerGroup.add(haloMesh);

    const halo2Geom = new THREE.TorusGeometry(2.5, 0.01, 16, 120);
    const halo2Mesh = new THREE.Mesh(halo2Geom, roseGoldMaterial);
    halo2Mesh.position.set(0, 0.05, -0.9);
    halo2Mesh.rotation.z = 0.3;
    centerGroup.add(halo2Mesh);

    // 7. 3D Blooming Flowers arranged along the Golden Arch & floating in 3D space
    const petalGeom = createPetalGeometry();
    const flowerPalette = ['#f4a7b9', '#f8c3cd', '#e87a90', '#fadadd', '#f5b0bd', '#fff0f3'];
    const flowers = [];

    // Arch flowers (8 flowers along the golden ring)
    const archPositions = [
      { angle: 0.25, radius: 2.35 },
      { angle: 0.55, radius: 2.35 },
      { angle: 0.85, radius: 2.35 },
      { angle: 2.35, radius: 2.35 },
      { angle: 2.65, radius: 2.35 },
      { angle: 2.95, radius: 2.35 },
      { angle: -0.9, radius: 2.35 },
      { angle: -2.2, radius: 2.35 },
    ];

    archPositions.forEach((pos, idx) => {
      const color = flowerPalette[idx % flowerPalette.length];
      const flower = create3DBloomingFlower(petalGeom, color, champagneGoldMaterial);
      flower.position.set(
        Math.cos(pos.angle) * pos.radius,
        Math.sin(pos.angle) * pos.radius + 0.05,
        -0.72 + (idx % 2) * 0.12
      );
      const scale = 0.42 + (idx % 3) * 0.12;
      flower.scale.set(scale, scale, scale);
      flower.rotation.set(
        (Math.random() - 0.5) * 0.4,
        (Math.random() - 0.5) * 0.4,
        pos.angle
      );
      centerGroup.add(flower);
      flowers.push({ mesh: flower, speed: 0.4 + Math.random() * 0.5, phase: idx });
    });

    // Floating 3D Flowers in foreground/background depth
    for (let i = 0; i < 10; i++) {
      const color = flowerPalette[i % flowerPalette.length];
      const flower = create3DBloomingFlower(petalGeom, color, roseGoldMaterial);
      const side = i % 2 === 0 ? 1 : -1;
      flower.position.set(
        side * (1.8 + Math.random() * 2.5),
        (Math.random() - 0.5) * 5.5,
        -2.5 + Math.random() * 3.5
      );
      const s = 0.28 + Math.random() * 0.24;
      flower.scale.set(s, s, s);
      flower.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      scene.add(flower);
      flowers.push({
        mesh: flower,
        speed: 0.3 + Math.random() * 0.4,
        phase: i * 1.3,
        floating: true,
        baseY: flower.position.y,
      });
    }

    // 8. 65 Falling & Swirling 3D Rose Petals
    const petalMaterials = flowerPalette.map(
      (hex) =>
        new THREE.MeshStandardMaterial({
          color: hex,
          roughness: 0.5,
          metalness: 0.05,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.9,
        })
    );

    const petals = [];
    const petalCount = 65;
    for (let i = 0; i < petalCount; i++) {
      const mat = petalMaterials[i % petalMaterials.length];
      const mesh = new THREE.Mesh(petalGeom, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 11,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6
      );
      const s = 0.22 + Math.random() * 0.32;
      mesh.scale.set(s, s, s);
      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );
      scene.add(mesh);
      petals.push({
        mesh,
        fallSpeed: 0.006 + Math.random() * 0.012,
        swaySpeed: 0.6 + Math.random() * 1.2,
        swayAmp: 0.005 + Math.random() * 0.01,
        rotSpeedX: (Math.random() - 0.5) * 0.02,
        rotSpeedY: (Math.random() - 0.5) * 0.025,
        rotSpeedZ: (Math.random() - 0.5) * 0.018,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // 9. Golden Fairy Sparkle Dust Particles in 3D Space
    const sparkleCount = 120;
    const sparkleGeom = new THREE.BufferGeometry();
    const sparklePositions = new Float32Array(sparkleCount * 3);
    for (let i = 0; i < sparkleCount; i++) {
      sparklePositions[i * 3] = (Math.random() - 0.5) * 12;
      sparklePositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      sparklePositions[i * 3 + 2] = (Math.random() - 0.5) * 7;
    }
    sparkleGeom.setAttribute('position', new THREE.BufferAttribute(sparklePositions, 3));
    const sparkleTexture = createSparkleTexture();
    const sparkleMat = new THREE.PointsMaterial({
      size: 0.22,
      map: sparkleTexture,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const sparklePoints = new THREE.Points(sparkleGeom, sparkleMat);
    scene.add(sparklePoints);

    // 10. Mouse / Touch Parallax & Scroll Camera Fly-Through
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollY = window.scrollY || 0;

    const handlePointerMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      pointer.targetX = (clientX / window.innerWidth - 0.5) * 2;
      pointer.targetY = -(clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      scrollY = window.scrollY || 0;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      if (!shouldAnimate) {
        camera.lookAt(0, 0.1, 0);
        renderer.render(scene, camera);
      }
    };
    window.addEventListener('resize', handleResize);

    // 11. Animation Loop (only runs when invitation is opened / shouldAnimate is true)
    let frameId;
    const clock = new THREE.Clock();

    if (!shouldAnimate) {
      camera.lookAt(0, 0.1, 0);
      renderer.render(scene, camera);
      return () => {
        window.removeEventListener('mousemove', handlePointerMove);
        window.removeEventListener('touchmove', handlePointerMove);
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        renderer.dispose();
      };
    }

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth pointer interpolation
      pointer.x += (pointer.targetX - pointer.x) * 0.05;
      pointer.y += (pointer.targetY - pointer.y) * 0.05;

      // Rotate interlocked 3D wedding rings
      ring1.rotation.y = elapsed * 0.35 + pointer.x * 0.3;
      ring1.rotation.x = 0.45 + Math.sin(elapsed * 0.6) * 0.12;

      ring2Group.rotation.y = -elapsed * 0.32 + pointer.x * 0.3;
      ring2Group.rotation.x = -0.35 + Math.cos(elapsed * 0.55) * 0.12;
      diamond.rotation.y = elapsed * 1.4;

      // Gentle float & tilt of centerpiece group
      const scrollProgress = Math.min(scrollY / 2500, 1);
      centerGroup.position.y = Math.sin(elapsed * 0.8) * 0.12 + scrollProgress * 1.4;
      centerGroup.rotation.y = pointer.x * 0.28 + Math.sin(elapsed * 0.3) * 0.08;
      centerGroup.rotation.x = -pointer.y * 0.18;

      // Animate 3D blooming flowers
      flowers.forEach((f) => {
        f.mesh.rotation.z += Math.sin(elapsed * f.speed + f.phase) * 0.002;
        if (f.floating) {
          f.mesh.position.y = f.baseY + Math.sin(elapsed * f.speed + f.phase) * 0.25;
          f.mesh.rotation.y += 0.003;
        }
      });

      // Animate falling & swirling 3D rose petals
      petals.forEach((p) => {
        p.mesh.position.y -= p.fallSpeed;
        p.mesh.position.x += Math.sin(elapsed * p.swaySpeed + p.phase) * p.swayAmp;
        p.mesh.rotation.x += p.rotSpeedX;
        p.mesh.rotation.y += p.rotSpeedY;
        p.mesh.rotation.z += p.rotSpeedZ;

        if (p.mesh.position.y < -5.2) {
          p.mesh.position.y = 5.2;
          p.mesh.position.x = (Math.random() - 0.5) * 11;
        }
      });

      // Sparkle dust gentle rotation
      sparklePoints.rotation.y = elapsed * 0.04;
      sparklePoints.position.y = Math.sin(elapsed * 0.4) * 0.2;

      // Camera subtle parallax + scroll depth fly-through
      const baseZ = isCover ? 5.6 : 6.4;
      camera.position.x = pointer.x * 0.45;
      camera.position.y = 0.15 + pointer.y * 0.3 - scrollProgress * 0.6;
      camera.position.z = baseZ - Math.sin(scrollProgress * Math.PI) * 1.1;
      camera.lookAt(0, 0.1, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [isCover, shouldAnimate]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
