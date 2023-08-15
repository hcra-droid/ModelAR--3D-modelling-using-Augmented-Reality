document.addEventListener('DOMContentLoaded', function () {
  const marker = document.querySelector('a-marker');
  const defaultCube = document.getElementById('defaultCube');
  const cubesGroup = document.getElementById('cubesGroup');
  const cubeSize = { x: 0.2, y: 0.2, z: 0.2 }; // Adjust cube size
  const cubes = [];

  // Add direction buttons
  const directionButtons = document.querySelectorAll('.directionButton');
  directionButtons.forEach(button => {
    button.addEventListener('click', () => {
      addCubeToSurface(button.dataset.direction);
    });
  });

  function addCubeToSurface(direction) {
    const newCube = createCube();
    let position;

    if (cubes.length === 0) {
      position = defaultCube.object3D.position.clone();
    } else {
      const lastCube = cubes[cubes.length - 1];
      const lastCubePosition = lastCube.getAttribute('position');
      position = calculateNewCubePosition(lastCubePosition, direction);
    }

    newCube.setAttribute('position', `${position.x} ${position.y} ${position.z}`);
    cubes.push(newCube);
    defaultCube.appendChild(newCube);
  }

  function createCube() {
    const newCube = document.createElement('a-box');
    newCube.setAttribute('scale', `${cubeSize.x} ${cubeSize.y} ${cubeSize.z}`);
    newCube.setAttribute('color', 'blue');
    newCube.setAttribute('grabbable', '');
    newCube.setAttribute('dynamic-body', 'mass: 0.2');
    newCube.addEventListener('drag-start', function () {
      this.setAttribute('dynamic-body', 'mass: 5');
    });
    newCube.addEventListener('drag-end', function () {
      this.setAttribute('dynamic-body', 'mass: 0.2');
    });
    return newCube;
  }

  function calculateNewCubePosition(lastCubePosition, direction) {
    const distance = 0.2; // Adjust distance between cubes
    switch (direction) {
      case 'right':
        return new THREE.Vector3(lastCubePosition.x + distance, lastCubePosition.y, lastCubePosition.z);
      case 'left':
        return new THREE.Vector3(lastCubePosition.x - distance, lastCubePosition.y, lastCubePosition.z);
      case 'top':
        return new THREE.Vector3(lastCubePosition.x, lastCubePosition.y + distance, lastCubePosition.z);
      case 'bottom':
        return new THREE.Vector3(lastCubePosition.x, lastCubePosition.y - distance, lastCubePosition.z);
      case 'front':
        return new THREE.Vector3(lastCubePosition.x, lastCubePosition.y, lastCubePosition.z + distance);
      case 'back':
        return new THREE.Vector3(lastCubePosition.x, lastCubePosition.y, lastCubePosition.z - distance);
      default:
        return lastCubePosition;
    }
  }
});
