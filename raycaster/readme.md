<b>2022-10-30 #3</b></br>
-Fixed fish-eye effect (TBC if all good)</br>
-Externalized the FOV as a variable</br>
-Created a degree to rad function (d2r)</br>
-Movement is still an issue. For now, I implemented WASD movement + left/right to turn camera.
-Fixed shading issue (RGB low values sometimes exceeded)

![fez1](https://user-images.githubusercontent.com/4015046/198890071-919a645a-7ccc-43e3-b939-33ea614f5e05.png)

<b>2022-10-30 #2</b></br>
-Implemented system to move both in x and y based on view angle (not working quite right but good enough for testing at the moment)</br>
-Added a createBlock function to draw 4 segments at once</br>
-Improved a bit the rendering</br>

![20221030b](https://user-images.githubusercontent.com/4015046/198876456-f27025b1-2661-46f3-bd90-cbd544dc3df1.png)

<b>2022-10-30</b></br>
-Added a player that can move up and down.</br>
-Rays are only projected for a limited viewscope.</br>
-Progressed on the "3D" rendering. Side-by-side viewports now implemented.</br>
-Issue to be fixed: fish-eye effect. Also distances seem a bit off.</br>
-To be added: the camera can move forwards/backwards but only the viewport turns (the camera stays on the same Y-axis).</br>

![20221030](https://user-images.githubusercontent.com/4015046/198857045-f0bf6db9-b364-443c-8d9d-8fece3d768e7.png)

<b>2022-10-29</b></br>
-Code cleaned up</br>
-Now handle 360 rays</br>
-Vertices are now used to properly define the coordinates at which the rays collide with the walls. All rays are now drawn.</br>

![2](https://user-images.githubusercontent.com/4015046/198852853-2e7690a1-2d81-4292-bb6f-414f9e9bc839.png)

![3](https://user-images.githubusercontent.com/4015046/198852854-46edecee-6669-410d-9860-57676219bdcc.png)

<b>2022-03-03</b></br>
-1st draft of ray caster.</br>
-The script only draws two randoms lines (walls) and projects a couple of rays (not 360). When it a ray meets a wall, it is not drawn.</br>
-Next step is to define a viewscope and renders a 1st person view.</br>
-Project went dormant.</br>

![firstDraft](https://user-images.githubusercontent.com/4015046/198876642-0fc7a6fb-eb12-4173-8dd1-5df024bc4c9a.jpg)
