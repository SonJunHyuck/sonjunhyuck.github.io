import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const instances = new Map();

function mount(root) {
  if (instances.has(root)) return;
  const canvas = root.querySelector('canvas');
  const status = root.querySelector('.character-status');
  const stage = root.querySelector('.character-stage');
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  } catch {
    status.textContent = '이 환경에서는 3D 캐릭터를 표시할 수 없습니다.';
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.01, 100);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x777777, 2.5));
  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(3, 5, 4);
  scene.add(light);
  const world = new THREE.Group();
  scene.add(world);
  const tileMaterials = [new THREE.MeshStandardMaterial({ roughness: 1 }), new THREE.MeshStandardMaterial({ roughness: 1 })];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let disposed = false;
  let frame = 0;
  let yaw = 0;
  let targetYaw = 0;
  let distance = 4;
  let targetHeight = 0.7;
  let stageSize = 2;
  const render = () => {
    if (disposed) return;
    world.rotation.y = yaw;
    renderer.render(scene, camera);
  };
  const animate = () => {
    yaw = reducedMotion.matches ? targetYaw : THREE.MathUtils.lerp(yaw, targetYaw, 0.2);
    if (Math.abs(yaw - targetYaw) < 0.001) yaw = targetYaw;
    render();
    frame = yaw === targetYaw ? 0 : requestAnimationFrame(animate);
  };
  const rotate = (amount) => {
    targetYaw += amount;
    if (!frame) frame = requestAnimationFrame(animate);
  };
  const resize = () => {
    const { width, height } = stage.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    // Keep responsive framing while showing the character and floor slightly larger.
    distance = Math.max(3.7, stageSize * 0.8 / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) / Math.min(camera.aspect, 1)) / 1.1;
    camera.position.set(0, targetHeight + distance * 0.43, distance);
    camera.lookAt(0, targetHeight, 0);
    camera.updateProjectionMatrix();
    render();
  };
  const theme = () => {
    const styles = getComputedStyle(root);
    tileMaterials[0].color.set(styles.getPropertyValue('--surface').trim());
    tileMaterials[1].color.set(styles.getPropertyValue('--line').trim());
    render();
  };
  const themeObserver = new MutationObserver(theme);
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(stage);
  let pointer = null;
  const down = (event) => { if (event.isPrimary && event.button === 0) pointer = { id: event.pointerId, x: event.clientX, y: event.clientY }; };
  const move = (event) => {
    if (!pointer || pointer.id !== event.pointerId) return;
    const dx = event.clientX - pointer.x;
    const dy = event.clientY - pointer.y;
    // Leave vertical gestures to page scrolling; rotate only horizontal drags.
    if (Math.abs(dy) > Math.abs(dx)) { pointer = null; return; }
    rotate(dx * 0.012);
    pointer.x = event.clientX;
    pointer.y = event.clientY;
  };
  const up = () => { pointer = null; };
  const key = (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    rotate(event.key === 'ArrowLeft' ? -Math.PI / 12 : Math.PI / 12);
  };
  canvas.addEventListener('pointerdown', down);
  canvas.addEventListener('pointermove', move);
  window.addEventListener('pointerup', up);
  canvas.addEventListener('pointercancel', up);
  canvas.addEventListener('keydown', key);
  const disposeObject = (object) => object.traverse((child) => {
    child.geometry?.dispose();
    const materials = Array.isArray(child.material) ? child.material : [child.material];
    materials.filter(Boolean).forEach((material) => {
      Object.values(material).forEach((value) => { if (value?.isTexture) value.dispose(); });
      material.dispose();
    });
  });
  const load = () => new GLTFLoader().load('/models/blue-cap-buddy.glb', (gltf) => {
    if (disposed) { disposeObject(gltf.scene); return; }
    const model = gltf.scene;
    const bounds = new THREE.Box3().setFromObject(model);
    const size = bounds.getSize(new THREE.Vector3());
    const scale = 2 / size.y;
    model.scale.multiplyScalar(scale);
    const center = bounds.getCenter(new THREE.Vector3());
    model.position.set(-center.x * scale, -bounds.min.y * scale + 0.005, -center.z * scale);
    world.add(model);
    stageSize = Math.max(2.5, Math.max(size.x, size.z) * scale * 1.6);
    const tileSize = stageSize / 8;
    const tileGeometry = new THREE.PlaneGeometry(tileSize, tileSize);
    for (let x = 0; x < 8; x++) for (let z = 0; z < 8; z++) {
      const tile = new THREE.Mesh(tileGeometry, tileMaterials[(x + z) % 2]);
      tile.rotation.x = -Math.PI / 2;
      tile.position.set((x - 3.5) * tileSize, 0, (z - 3.5) * tileSize);
      world.add(tile);
    }
    targetHeight = 1;
    status.hidden = true;
    theme();
    resize();
  }, undefined, () => {
    if (!disposed) status.textContent = '3D 캐릭터를 불러오지 못했습니다.';
  });
  const visibilityObserver = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) { visibilityObserver.disconnect(); load(); }
  }, { rootMargin: '200px' });
  if (canvas.dataset.eager === 'true') load();
  else visibilityObserver.observe(root);
  theme();
  instances.set(root, () => {
    disposed = true;
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    themeObserver.disconnect();
    visibilityObserver.disconnect();
    canvas.removeEventListener('pointerdown', down);
    canvas.removeEventListener('pointermove', move);
    window.removeEventListener('pointerup', up);
    canvas.removeEventListener('pointercancel', up);
    canvas.removeEventListener('keydown', key);
    disposeObject(scene);
    tileMaterials.forEach((material) => material.dispose());
    renderer.dispose();
  });
}
function init() { document.querySelectorAll('[data-profile-character]').forEach(mount); }
document.addEventListener('astro:before-swap', () => { instances.forEach((dispose) => dispose()); instances.clear(); });
document.addEventListener('astro:page-load', init);
init();
