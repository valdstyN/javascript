<h2>2022-10-26</h2>
<ul>
<li>Now possible to display messages. This will freeze the character movement. Up to 3 lines will be displayed, else the user has to press the action key (Space bar)./li>
<li>Wrote a function to return which mapL2 item (texture) the character is currently facing.</li>
<li>Added functions to load, play and stop sounds/music. Added a background music (currently doesn't play automatically)</li>
</ul>
<img src="https://user-images.githubusercontent.com/4015046/198344778-3fdc5f17-78e8-4967-8362-eeffd2408297.gif" width=50% height=50%>
<h2>2022-10-26</h2>
<ul>
<li>Added smooth walk movement with animation. Moving beyond the initial screen scope is however too rough. The issue is that within the screen, the character can move pixel by pixel (walking animation), however map tiles are drawn by units (gameTileSize). </li>
</ul>
<img src="https://user-images.githubusercontent.com/4015046/198011269-7c68a346-a674-4402-8a59-69ce15c91c07.gif" width=50% height=50%>
<h2>2022-10-25</h2>
<ul>
<li>Added collision system. An array lists the walkable textures. Everytime the player moves, we check if the ground layer (gameMap) has a "walkable" texture. If not, we check the textures of the top layer (gameMapL2). Using this combination, we can for example walk under the corner of the roof.</li>
<li>Improved performances by fixing drawing loop (debug information and character were redrawn for each X/Y</li>
<li>Added a new character sprite and now manage character directions (facing up, right, bottom and left)</li>
<li>Added function changeGameTileSize() to resize properly and adapt charGameX and charGameY. Can be used in the first section (not after scrolling)</li>
<li>Added a filter to simulate night time (between 9pm and 6am)</li> 
<li>Updated CSS to center game and remove outline (focus)</li> 
<li>Added a little path along the house :-)</li>
<li>Next: smooth character movement + GUI (message, inventory...)</li>
</ul>
<img src="https://user-images.githubusercontent.com/4015046/197858162-288142b7-33b0-4ede-beeb-f4dd929f89a4.JPG" width=50% height=50%><br/>
<img src="https://user-images.githubusercontent.com/4015046/197878637-bc70aa7d-3a14-4c36-991e-b1316bc58690.JPG" width=50% height=50%>
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
