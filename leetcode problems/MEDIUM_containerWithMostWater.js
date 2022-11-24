/*
https://leetcode.com/problems/container-with-most-water/description/

Work in progress
Code is technically correct but too slow to validate the solution
*/

var maxArea = function(height) {
    let maxVolume = 0;
    //let currentMaxHeight = 0;
    for(let g=0;g<height.length;g++){
    //  if(height[g]>currentMaxHeight)currentMaxHeight=height[g]; while not accurate, trying to find the max like this so avoid doing another loop
    //  let absMax = (g+1) * currentMaxHeight; calculate the possible max volume
        for(let d=height.length-1;d>g;d--){
            let c = (d-g) * (Math.min(height[g],height[d]));
            maxVolume = c>maxVolume?c:maxVolume;
        //  if(maxVolume>absMax){
        //    continue;
        //  }
        }
    }
    return maxVolume;
};
