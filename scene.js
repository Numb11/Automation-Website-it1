import * as THREE from "three";

const stage = document.querySelector("[data-stage]");
const notes = document.querySelector("[data-notes]");
if (!stage || !notes) {
  /* The picture is only on the home page. */
} else {
  const canvas = stage.querySelector("canvas");
  const fallback = stage.querySelector("[data-fallback]");
  const items = Array.from(notes.querySelectorAll("[data-step]"));
  const buttons = Array.from(document.querySelectorAll("[data-step-btn]"));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  } catch (error) {
    canvas.hidden = true;
    if (fallback) fallback.hidden = false;
    renderer = null;
  }

  if (!renderer) {
    notes.dataset.ready = "true";
    if (items[0]) items[0].classList.add("is-active");
  } else {
    renderer.setClearColor(0x101613, 1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 40);
    camera.position.set(3.05, 1.9, 6.15);

    scene.add(new THREE.AmbientLight(0xf3efe6, 0.55));
    const key = new THREE.DirectionalLight(0xfff6ea, 1.6);
    key.position.set(4, 6, 5);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x9cbcab, 0.35);
    fill.position.set(-4, 2, -2);
    scene.add(fill);

    const bone = () => new THREE.MeshStandardMaterial({
      color: 0xf3efe6,
      roughness: 0.72,
      metalness: 0.02,
      emissive: 0xf3efe6,
      emissiveIntensity: 0.04
    });
    const brass = () => new THREE.MeshStandardMaterial({
      color: 0xc4a574,
      roughness: 0.4,
      metalness: 0.25,
      emissive: 0xc4a574,
      emissiveIntensity: 0.08
    });
    const sage = () => new THREE.MeshStandardMaterial({
      color: 0x8fbfa8,
      roughness: 0.38,
      metalness: 0.08,
      emissive: 0x1e4d3c,
      emissiveIntensity: 0.35
    });

    const room = new THREE.Group();
    scene.add(room);

    const boxGeo = new THREE.BoxGeometry(3.05, 2.05, 2.05);
    const glass = new THREE.Mesh(
      boxGeo,
      new THREE.MeshStandardMaterial({
        color: 0x1e4d3c,
        transparent: true,
        opacity: 0.08,
        roughness: 0.15,
        metalness: 0,
        depthWrite: false
      })
    );
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(boxGeo),
      new THREE.LineBasicMaterial({ color: 0xc4a574, transparent: true, opacity: 0.85 })
    );
    room.add(glass, edges);

    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(1.55, 40),
      new THREE.MeshBasicMaterial({ color: 0x0c100e })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.12;
    scene.add(floor);

    const records = new THREE.Group();
    records.position.set(-0.78, -0.28, 0.05);
    for (let i = 0; i < 4; i += 1) {
      const sheet = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.62, 0.025), bone());
      sheet.position.set((i - 1.5) * 0.34, 0, (i - 1.5) * -0.05);
      sheet.rotation.y = 0.42;
      const rule = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.012, 0.028), brass());
      rule.position.set(0, 0.18, 0.016);
      sheet.add(rule);
      records.add(sheet);
    }
    room.add(records);

    const model = new THREE.Group();
    model.position.set(0.12, 0.12, 0.02);
    model.add(new THREE.Mesh(new THREE.OctahedronGeometry(0.28, 0), sage()));
    model.add(new THREE.Mesh(
      new THREE.OctahedronGeometry(0.4, 0),
      new THREE.MeshBasicMaterial({ color: 0xc4a574, wireframe: true, transparent: true, opacity: 0.55 })
    ));
    const halo = new THREE.Mesh(
      new THREE.TorusGeometry(0.34, 0.008, 8, 40),
      brass()
    );
    halo.rotation.x = Math.PI / 2;
    halo.position.y = -0.42;
    model.add(halo);
    room.add(model);

    const person = new THREE.Group();
    person.position.set(0.9, -0.98, 0.12);
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.72, 12), brass());
    pole.position.y = 0.36;
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.1, 20, 16), bone());
    head.position.y = 0.8;
    const base = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.012, 8, 28), brass());
    base.rotation.x = Math.PI / 2;
    person.add(pole, head, base);
    room.add(person);

    const outside = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.26, 0),
      new THREE.MeshBasicMaterial({ color: 0x8a938e, wireframe: true, transparent: true, opacity: 0.7 })
    );
    outside.position.set(1.15, 1.58, 0.15);
    scene.add(outside);

    const rodMat = () => new THREE.MeshBasicMaterial({ color: 0xf0d7a6 });
    const cite = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 1, 8), rodMat());
    const handoff = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 1, 8), rodMat());
    const blocked = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 1, 8), rodMat());
    const stop = new THREE.Mesh(
      new THREE.SphereGeometry(0.045, 16, 12),
      brass()
    );
    cite.visible = false;
    handoff.visible = false;
    blocked.visible = false;
    stop.visible = false;
    scene.add(cite, handoff, blocked, stop);

    const up = new THREE.Vector3(0, 1, 0);
    const dir = new THREE.Vector3();
    const from = new THREE.Vector3();
    const to = new THREE.Vector3();

    function pointRod(mesh, a, b) {
      dir.subVectors(b, a);
      const length = dir.length();
      if (length < 0.001) return;
      mesh.visible = true;
      mesh.scale.set(1, length, 1);
      mesh.position.copy(a).add(b).multiplyScalar(0.5);
      mesh.quaternion.setFromUnitVectors(up, dir.normalize());
    }

    function dim(object, amount) {
      object.traverse((child) => {
        const materials = child.material ? [].concat(child.material) : [];
        materials.forEach((material) => {
          if (!material.userData.base) {
            material.userData.base = material.color.clone();
            material.userData.baseEmissive = material.emissiveIntensity || 0;
            material.userData.baseOpacity = material.opacity;
          }
          material.color.copy(material.userData.base).lerp(new THREE.Color(0x24302c), amount);
          if (material.emissiveIntensity !== undefined) {
            material.emissiveIntensity = material.userData.baseEmissive * (1 - amount * 0.85);
          }
          if (material.transparent && material !== glass.material) {
            material.opacity = material.userData.baseOpacity * (1 - amount * 0.45);
          }
        });
      });
    }

    const focus = [
      { records: 0, model: 0.72, person: 0.72, outside: 0.35, room: 0.25, link: "none" },
      { records: 0.55, model: 0, person: 0.7, outside: 0.35, room: 0.2, link: "none" },
      { records: 0.05, model: 0, person: 0.75, outside: 0.35, room: 0.25, link: "cite" },
      { records: 0.6, model: 0.15, person: 0, outside: 0.35, room: 0.25, link: "person" },
      { records: 0.35, model: 0.4, person: 0.45, outside: 0, room: 0, link: "block" }
    ];

    let step = 0;

    function apply(index) {
      step = index;
      const state = focus[index];
      dim(records, state.records);
      dim(model, state.model);
      dim(person, state.person);
      dim(outside, state.outside);
      dim(edges, state.room);
      cite.visible = false;
      handoff.visible = false;
      blocked.visible = false;
      stop.visible = false;
      items.forEach((item, i) => item.classList.toggle("is-active", i === index));
      buttons.forEach((button, i) => {
        const on = i === index;
        button.setAttribute("aria-pressed", on ? "true" : "false");
        button.setAttribute("aria-selected", on ? "true" : "false");
      });
    }

    notes.dataset.ready = "true";
    buttons.forEach((button, index) => {
      button.addEventListener("click", () => apply(index));
    });
    apply(0);

    const sheet = records.children[2];
    const half = new THREE.Vector3(1.52, 1.02, 1.02);
    const aim = new THREE.Vector3();
    let locked = false;
    let hovering = false;
    buttons.forEach((button) => {
      button.addEventListener("click", () => { locked = true; });
    });
    if (!reduce) {
      window.setInterval(() => {
        if (!locked && !hovering) apply((step + 1) % items.length);
      }, 5600);
      const grid = stage.closest(".instrument-grid");
      grid.addEventListener("mouseenter", () => { hovering = true; });
      grid.addEventListener("mouseleave", () => { hovering = false; });
    }

    function frame(now) {
      const t = reduce ? 0 : now * 0.001;
      model.rotation.y = t * 0.35;
      outside.rotation.y = -t * 0.4;
      if (!reduce) {
        records.position.y = -0.28 + Math.sin(t * 0.8) * 0.02;
        person.position.y = -0.98 + Math.sin(t * 0.8 + 1) * 0.015;
      }
      camera.position.x = 3.05 + Math.sin(t * 0.15) * 0.06;
      camera.lookAt(0.05, 0.08, 0);

      if (focus[step].link === "cite") {
        sheet.getWorldPosition(from);
        model.getWorldPosition(to);
        to.y -= 0.05;
        pointRod(cite, from, to);
      } else if (focus[step].link === "person") {
        model.getWorldPosition(from);
        person.getWorldPosition(to);
        to.y += 0.45;
        pointRod(handoff, from, to);
      } else if (focus[step].link === "block") {
        records.getWorldPosition(from);
        from.y += 0.15;
        outside.getWorldPosition(aim);
        dir.subVectors(aim, from);
        let travel = 1;
        ["x", "y", "z"].forEach((axis) => {
          if (Math.abs(dir[axis]) < 0.0001) return;
          const bound = dir[axis] > 0 ? half[axis] : -half[axis];
          const hit = (bound - from[axis]) / dir[axis];
          if (hit > 0 && hit < travel) travel = hit;
        });
        aim.copy(from).addScaledVector(dir, travel * 0.96);
        pointRod(blocked, from, aim);
        stop.visible = true;
        stop.position.copy(aim);
      }

      renderer.render(scene, camera);
      requestAnimationFrame(frame);
    }

    function resize() {
      const width = stage.clientWidth;
      const height = stage.clientHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    }

    resize();
    window.addEventListener("resize", resize);
    requestAnimationFrame(frame);
  }
}
