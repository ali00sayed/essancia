'use client';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

interface ProductViewerProps {
  productType: 'tshirt' | 'hoodie' | 'sweatshirt';
  color: string;
  logo?: string;
  customText?: string;
  textColor?: string;
}

const ProductViewer: React.FC<ProductViewerProps> = ({
  productType,
  color,
  logo,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene>(new THREE.Scene());
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  // Combined setup and model loading
  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = sceneRef.current;
    scene.background = new THREE.Color(0xffffff);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 4);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true, // Important for Vercel deployment
    });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for better performance
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 1.8;
    controls.minPolarAngle = Math.PI / 2.2;
    controls.enableZoom = true;
    controls.maxDistance = 5;
    controls.minDistance = 3.5;
    controls.target.set(0, 0, 0);
    controls.enablePan = false; // Disable panning for consistent view
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const frontLight = new THREE.DirectionalLight(0xffffff, 1);
    frontLight.position.set(0, 1, 3);
    scene.add(frontLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.7);
    backLight.position.set(0, 1, -3);
    scene.add(backLight);

    const topLight = new THREE.DirectionalLight(0xffffff, 0.5);
    topLight.position.set(0, 3, 0);
    scene.add(topLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect =
        containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []); // Initial setup only runs once

  // Combined model loading and color updating
  useEffect(() => {
    if (!sceneRef.current) return;

    // Only load model if it's a t-shirt
    if (productType !== 'tshirt') {
      return;
    }

    console.log(
      'Logo received:',
      logo ? 'Yes (length: ' + logo.length + ')' : 'No'
    );

    const loader = new GLTFLoader();
    loader.setMeshoptDecoder(MeshoptDecoder);
    loader.setDRACOLoader(new DRACOLoader().setDecoderPath('/draco/'));
    loader.load(`/models/${productType}Model.glb`, gltf => {
      // Remove existing model if it exists
      if (modelRef.current) {
        sceneRef.current.remove(modelRef.current);
      }

      const newModel = gltf.scene;
      newModel.scale.setScalar(0.038);

      // Reset and center model
      newModel.position.set(0, 0, 0);
      newModel.rotation.set(0, Math.PI, 0);

      // Calculate bounding box and center
      const box = new THREE.Box3().setFromObject(newModel);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      // Ensure model is centered in world space
      newModel.position.sub(center);

      // Force model update
      newModel.updateMatrix();
      newModel.updateMatrixWorld(true);

      // Update camera and controls with more robust positioning
      if (cameraRef.current) {
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = cameraRef.current.fov * (Math.PI / 180);
        const cameraDistance = (maxDim / 2 / Math.tan(fov / 2)) * 2.2;

        // Ensure camera is properly positioned
        cameraRef.current.position.set(0, 0, cameraDistance);
        cameraRef.current.lookAt(0, 0, 0);
        cameraRef.current.updateProjectionMatrix();

        if (controlsRef.current) {
          controlsRef.current.target.set(0, 0, 0);
          controlsRef.current.minDistance = cameraDistance * 0.85;
          controlsRef.current.maxDistance = cameraDistance * 1.2;
          controlsRef.current.update();
        }
      }

      // Force a few frames of rendering to ensure proper initialization
      for (let i = 0; i < 3; i++) {
        if (rendererRef.current && cameraRef.current && sceneRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
      }

      // Apply material with current color and logo
      newModel.traverse(child => {
        if (child instanceof THREE.Mesh) {
          console.log(`Processing mesh: ${child.name}`);

          // Create base material
          const material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(color),
            metalness: 0.1,
            roughness: 0.85,
            side: THREE.DoubleSide,
            emissive: new THREE.Color(color),
            emissiveIntensity: 0.02,
          });

          // If we have a logo, try to apply it
          if (logo) {
            console.log('Attempting to apply logo to mesh:', child.name);

            try {
              // Load and apply texture directly
              new THREE.TextureLoader().load(
                logo,
                loadedTexture => {
                  console.log('Logo texture loaded successfully');
                  loadedTexture.flipY = false;
                  loadedTexture.needsUpdate = true;

                  // Create a new material for the logo
                  const logoMaterial = new THREE.MeshStandardMaterial({
                    map: loadedTexture,
                    transparent: true,
                    side: THREE.DoubleSide,
                    color: 0xffffff, // White color to show logo properly
                  });

                  // Apply the logo material
                  child.material = logoMaterial;
                  child.material.needsUpdate = true;
                },
                undefined,
                error => {
                  console.error('Error loading logo texture:', error);
                }
              );
            } catch (error) {
              console.error('Error applying logo:', error);
            }
          } else {
            // Apply the base material to other parts
            child.material = material;
          }

          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      modelRef.current = newModel;
      sceneRef.current.add(newModel);

      // Log the entire model structure
      console.log('Model structure:', newModel);

      // Add texture settings for better performance
      THREE.TextureLoader.prototype.crossOrigin = 'anonymous';
      if (rendererRef.current) {
        rendererRef.current.outputColorSpace = THREE.SRGBColorSpace;
      }

      // Optimize textures when loading model
      newModel.traverse(child => {
        if (child instanceof THREE.Mesh && child.material) {
          if (child.material.map) {
            child.material.map.anisotropy =
              rendererRef.current?.capabilities.getMaxAnisotropy() || 1;
            child.material.map.minFilter = THREE.LinearMipmapLinearFilter;
          }
        }
      });
    });
  }, [productType, color, logo]);

  return (
    <div
      ref={containerRef}
      className="w-full aspect-square rounded-2xl overflow-hidden shadow-lg bg-white"
    />
  );
};

export default ProductViewer;
