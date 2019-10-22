# Lab 5 - Texturing and Spheres

1. Download [uvMeshDemo.zip][uvMeshDemo.zip] and follow the example in class to complete the UVMesh class and a corresponding shaders.
2. Copy your Cube class from the previous lab into shapes.js. Edit the Cube.create method to work with RGB or UV cubes. Replace the arrays and UVMesh creations in demo.js with calls to Cube.create. Change one of the two cubes in the initial demo to an RGB cube, so you have one of each type of cube.
3. Create a Sphere class. Populate it with static methods to get the position, index, normal, color and uv arrays for a sphere given a number of latitude bands and longitude bands. You may find this [link][link1] helpful for making the arrays, and this [link][link2] helpful for visualizing what's being done.
4. Use these arrays to create and display a textured sphere. You may use the provided spherical texture of the earth's surface, or find your own spherical texture.
5. Make the Sphere.create static method, which should mirror the Cube.create method but for spheres.
6. Replace your spheres created in step 4 calls to "Sphere.create".
7. Zip the whole project and submit. Your demo should have 1 RGB cube, 1 textured cube, 1 RGB sphere, and 1 textured sphere.


[uvMeshDemo.zip]: https://cilearn.csuci.edu/courses/8815/files/1208985/download?wrap=1
[link1]: https://bl.ocks.org/camargo/649e5903c4584a21a568972d4a2c16d3
[link2]: https://threejs.org/docs/#api/en/geometries/SphereGeometry
