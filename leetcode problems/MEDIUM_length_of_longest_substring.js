/*
Given a string s, find the length of the longest substring without repeating characters.
Note: quite slow and high memory usage.
*/

var lengthOfLongestSubstring = function(s) {
    let str = "";
    let candidates = [];
    let e = 0;
    while(e<s.length){
        str = "";
        for(let i=e;i<s.length;i++){
            if(str.indexOf(s.substring(i,i+1))==-1){
                str += s.substring(i,i+1);
            }else{
                candidates.push(str.length);
                e++;
                break;
            }
        if(i==s.length-1){
            candidates.push(str.length);
            e=s.length;
		}
        }
    }
    let c = 0;
    for(let j=0;j<candidates.length;j++){
        if(candidates[j]>=c)c=candidates[j];
    }
    return c;
};
