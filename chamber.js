(function () {
  var mount = document.querySelector("[data-chamber]");
  if (!mount || !window.THREE) return;

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  } catch (error) {
    return;
  }

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setClearColor(0x101613, 1);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.domElement.setAttribute("aria-hidden", "true");
  mount.appendChild(renderer.domElement);

  var scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x101613, 0.075);
  var camera = new THREE.PerspectiveCamera(34, 1, 0.1, 40);
  camera.position.set(0, 0, 8.4);

  var group = new THREE.Group();
  scene.add(group);
  scene.add(new THREE.AmbientLight(0xb7c3bb, 0.75));

  var key = new THREE.DirectionalLight(0xfff4e6, 1.35);
  key.position.set(-3.5, 4.5, 6);
  scene.add(key);

  var rim = new THREE.DirectionalLight(0xc4a574, 0.35);
  rim.position.set(5, -1.5, 3);
  scene.add(rim);

  var count = 72;
  var sheet = document.createElement("canvas");
  sheet.width = 128;
  sheet.height = 176;
  var draw = sheet.getContext("2d");
  draw.fillStyle = "#f6f1e6";
  draw.fillRect(0, 0, 128, 176);
  draw.strokeStyle = "rgba(30, 77, 60, 0.2)";
  draw.lineWidth = 1.5;
  var rule;
  for (rule = 28; rule < 156; rule += 14) {
    draw.beginPath();
    draw.moveTo(16, rule);
    draw.lineTo(rule % 28 === 0 ? 96 : 112, rule);
    draw.stroke();
  }
  draw.strokeStyle = "rgba(196, 165, 116, 0.85)";
  draw.lineWidth = 3;
  draw.strokeRect(8, 8, 112, 160);
  var texture = new THREE.CanvasTexture(sheet);

  var papers = new THREE.InstancedMesh(
    new THREE.PlaneGeometry(0.58, 0.8),
    new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.82,
      metalness: 0,
      transparent: true,
      side: THREE.DoubleSide
    }),
    count
  );

  var home = [];
  var ring = [];
  var index;
  var spanX = 2.4;
  var spanY = 1.32;
  var lift = -0.08;

  function ellipsePoint(radius, angle) {
    return {
      x: Math.cos(angle) * spanX * radius,
      y: Math.sin(angle) * spanY * radius + lift
    };
  }

  function ellipsePolar(x, y) {
    var dx = x / spanX;
    var dy = (y - lift) / spanY;
    return {
      radius: Math.sqrt(dx * dx + dy * dy),
      angle: Math.atan2(dy, dx)
    };
  }

  for (index = 0; index < count; index += 1) {
    var wander = (index / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.22;
    var reach = 1.18 + ((index * 5) % count) / count * 0.62;
    var spot = ellipsePoint(reach, wander);
    var homePolar = ellipsePolar(spot.x, spot.y);
    home.push({
      x: spot.x,
      y: spot.y,
      z: ((index % 4) - 1.5) * 0.32,
      radius: homePolar.radius,
      angle: homePolar.angle,
      rx: (Math.random() - 0.5) * 0.35,
      ry: (Math.random() - 0.5) * 0.5,
      spin: 0.35 + Math.random() * 0.45
    });
    var sealAngle = ((index + 0.5) / count) * Math.PI * 2;
    var sealPoint = {
      x: Math.cos(sealAngle) * 2.62,
      y: Math.sin(sealAngle) * 1.5 + lift
    };
    var sealPolar = ellipsePolar(sealPoint.x, sealPoint.y);
    ring.push({
      x: sealPoint.x,
      y: sealPoint.y,
      z: Math.sin(sealAngle * 2) * 0.28,
      radius: sealPolar.radius,
      angle: sealPolar.angle,
      ry: Math.sin(sealAngle) * 0.4
    });
    var tone = new THREE.Color(index % 3 === 0 ? 0xe7dfd0 : 0xf7f2e8);
    papers.setColorAt(index, tone);
  }
  group.add(papers);

  var pointPositions = new Float32Array(count * 3);
  var pointGeo = new THREE.BufferGeometry();
  pointGeo.setAttribute("position", new THREE.BufferAttribute(pointPositions, 3));
  var points = new THREE.Points(pointGeo, new THREE.PointsMaterial({
    color: 0xc4a574,
    size: 0.055,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    sizeAttenuation: true
  }));
  group.add(points);

  var linePositions = new Float32Array(count * 4 * 3);
  var lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
  lineGeo.setDrawRange(0, 0);
  var threads = new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({
    color: 0xc4a574,
    transparent: true,
    opacity: 0,
    depthWrite: false
  }));
  group.add(threads);

  var nowPositions = [];
  for (index = 0; index < count; index += 1) nowPositions.push({ x: 0, y: 0, z: 0 });

  var dummy = new THREE.Object3D();
  var look = new THREE.Vector3(0, 0, 0);

  function aim(seconds, mix) {
    var loose = mix.drift;
    camera.position.x = Math.sin(seconds * 0.08) * 0.12 * loose;
    camera.position.y = Math.sin(seconds * 0.05) * 0.05 * loose;
    camera.lookAt(look);
    camera.updateMatrixWorld();
  }

  function lerpAngle(from, to, amount) {
    var delta = to - from;
    while (delta > Math.PI) delta -= Math.PI * 2;
    while (delta < -Math.PI) delta += Math.PI * 2;
    return from + delta * amount;
  }

  function smooth(value) {
    var clamped = Math.max(0, Math.min(1, value));
    return clamped * clamped * (3 - 2 * clamped);
  }

  function weights(seconds) {
    var local = seconds % 18;
    if (local < 6) return { drift: 1, ring: 0 };
    if (local < 10) {
      var toRing = smooth((local - 6) / 4);
      return { drift: 1 - toRing, ring: toRing };
    }
    if (local < 14) return { drift: 0, ring: 1 };
    var back = smooth((local - 14) / 4);
    return { drift: back, ring: 1 - back };
  }

  function place(mix, seconds) {
    for (index = 0; index < count; index += 1) {
      var from = home[index];
      var seal = ring[index];
      var loose = 1 - mix.ring;
      var radius = from.radius + (seal.radius - from.radius) * mix.ring;
      radius += Math.sin(seconds * 0.55 + index) * 0.045 * mix.drift;
      if (radius < 1.08) radius = 1.08;
      var angle = lerpAngle(from.angle, seal.angle, mix.ring);
      var spot = ellipsePoint(radius, angle);
      var x = spot.x;
      var y = spot.y;
      var z = from.z + (seal.z - from.z) * mix.ring;
      nowPositions[index].x = x;
      nowPositions[index].y = y;
      nowPositions[index].z = z;
      pointPositions[index * 3] = x;
      pointPositions[index * 3 + 1] = y;
      pointPositions[index * 3 + 2] = z;

      var scale = mix.drift + 0.92 * mix.ring;
      var yaw = Math.sin(seconds * from.spin + from.ry) * 0.35 * mix.drift + seal.ry * mix.ring;
      dummy.position.set(x, y, z);
      dummy.rotation.set(from.rx * loose, yaw, 0);
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      papers.setMatrixAt(index, dummy.matrix);
    }
    papers.instanceMatrix.needsUpdate = true;
    lineGeo.setDrawRange(0, 0);
    papers.material.opacity = 1;
    points.material.opacity = 0;
    threads.material.opacity = 0;
  }

  function resize() {
    var width = mount.clientWidth || 1;
    var height = mount.clientHeight || 1;
    renderer.setSize(width, height, false);
    camera.aspect = width / Math.max(height, 1);
    camera.updateProjectionMatrix();
  }

  resize();
  window.addEventListener("resize", resize);

  var visible = true;
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
    });
    observer.observe(mount);
  }

  function frame(now) {
    var seconds = now * 0.001;
    if (visible) {
      var mix = reduce ? { drift: 1, ring: 0 } : weights(seconds);
      aim(seconds, mix);
      place(mix, reduce ? 0 : seconds);
      renderer.render(scene, camera);
    }
    if (!reduce) window.requestAnimationFrame(frame);
  }

  aim(0, { drift: 1, ring: 0 });
  place({ drift: 1, ring: 0 }, 0);
  renderer.render(scene, camera);
  if (!reduce) window.requestAnimationFrame(frame);
})();
