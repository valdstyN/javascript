<h2>2022-10-25</h2>
<ul>
<li>Added collision system. An array lists the walkable textures. Everytime the player moves, we check if the ground layer (gameMap) has a "walkable" texture. If not, we check the textures of the top layer (gameMapL2). Using this combination, we can for example walk under the corner of the roof.</li>
<li>Improved performances by fixing drawing loop (debug information and character were redrawn for each X/Y</li>
<li>Added a new character sprite and now manage character directions (facing up, right, bottom and left)</li>
<li>Added function changeGameTileSize() to resize properly and adapt charGameX and charGameY. Can be used in the first section (not after scrolling)</li>
<li>Updated CSS to center game and remove outline (focus)</li>
<li>Added a little path along the house :-)</li>
<li>Next: smooth character movement + GUI (message, inventory...)</li>
</ul>
<img src="https://user-images.githubusercontent.com/4015046/197858162-288142b7-33b0-4ede-beeb-f4dd929f89a4.JPG" width=50% height=50%>
<h2>2022-10-23</h2>
<ul>
<li>reshapes maps and perspective: top down rpg</li>
<li>added tilemap system</li>
<li>new functions: changeFramerate(n), resizeGame(w,h),drawDebug() (toggle via F10)</li>
<li>suggestion to move character : create a charMap (same size as map) and use it to move CHARACTER. can then be surimposed to world map to test collision</li>
</ul>
<img src="https://user-images.githubusercontent.com/4015046/197404656-7497e484-c0c8-4c96-93c0-05def9b2d47e.JPG" width=50% height=50%>
<h2>2022-10-22</h2>
<ul>
<li>first draft</li>
<li>rendering functions</li>
<li>2D platformer</li>
</ul>
