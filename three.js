
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("three-container");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Lighting
    const light = new THREE.AmbientLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    // Retrieve data from localStorage
    const layoutData = JSON.parse(localStorage.getItem("canvasData")) || [];
    console.log(layoutData)

    // Convert 2D elements into 3D objects
    layoutData.forEach(item => {
        const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
        const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
        const box = new THREE.Mesh(boxGeometry, boxMaterial);

        // Convert 2D canvas coordinates to 3D space
        box.position.set(parseInt(item.x) / 100, 0.5, parseInt(item.y) / 100);
        scene.add(box);
    });

    const storedObjects = JSON.parse(localStorage.getItem("objects")) || [];

    storedObjects.forEach(obj => {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
        const mesh = new THREE.Mesh(geometry, material);

        // Convert 2D position to 3D space
        mesh.position.set(obj.position.x / 100, 0, obj.position.y / 100);

        scene.add(mesh);
    });

console.log("Loaded objects in 3D:", scene.children);
    camera.position.set(0, 2, 5);
    camera.lookAt(scene.position);

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
    console.log(scene.children)
});
