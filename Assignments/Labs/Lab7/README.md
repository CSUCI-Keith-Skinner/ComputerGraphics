# Lab 7 - Phong Lighting

1. Download [lightingDemo.zip][lightingDemo.zip]
2. In the "materials" folder, complete both "uvmaterial.js" and "rgbmaterial.js".
   - Be sure you refer to the corresponding shaders for variable names when getting uniform locations!
3. In the "shaders" folder, complete the "main" methods in both fragment shaders ("frag.rgb.glsl" and "frag.uv.glsl") to adhere to the Phong lighting model discussed in class.
   - DO NOT change anything outside of the main methods
   - Note that while the UV shader's reflection constants are type float, whereas the RGB shader's reflection constants are type vec3, the two shaders will be nearly identical.
   - You need to loop through the array of directions lights and the array of point lights and calculate the total illumination of the fragment, then combine that illumination with the frag's material color.
   - You may find the following formula sheet useful [lightingFormulas.pdf][lightingFormulas.pdf]
4. Once all 4 files are done, you should be able to see 2 models (the earth and an emerald Suzy head) being circled by 2 mini suzy heads which are also serving as light sources. Use the LightManager (provided, and instantiated in the demo script) to edit the lighting in the scene and ensure that the display adjusts accordingly).
5. Zip up the entire complete project and submit (I should not need to add anything to your submission to host it on a local server and see the results.

[lightingDemo.zip]: https://cilearn.csuci.edu/courses/8815/files/1239533/download?wrap=1

[lightingFormulas.pdf]: https://cilearn.csuci.edu/courses/8815/files/1239899/download?wrap=1