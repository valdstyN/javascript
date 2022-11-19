/*
My solution to the "integer to roman" problem on LeetCode.
A bit ugly but a treat for regex lovers :)
*/

function intToRoman(num) {
    let s = num.toString();
    let r = s.replace(/1(.{3})$/,'M$1').replace(/2(.{3})$/,'MM$1').replace(/3(.{3})$/,'MMM$1').replace(/4(.{3})$/,'MMMM$1');
    r = r.replace(/1(.{2})$/,'C$1').replace(/2(.{2})$/,'CC$1').replace(/3(.{2})$/,'CCC$1').replace(/4(.{2})$/,'CD$1').replace(/5(.{2})$/,'D$1').replace(/6(.{2})$/,'DC$1').replace(/7(.{2})$/,'DCC$1').replace(/8(.{2})$/,'DCCC$1').replace(/9(.{2})$/,'CM$1');
    r = r.replace(/1(.{1})$/,'X$1').replace(/2(.{1})$/,'XX$1').replace(/3(.{1})$/,'XXX$1').replace(/4(.{1})$/,'XL$1').replace(/5(.{1})$/,'L$1').replace(/6(.{1})$/,'LX$1').replace(/7(.{1})$/,'LXX$1').replace(/8(.{1})$/,'LXXX$1').replace(/9(.{1})$/,'XC$1');
		r = r.replace(/1$/,'I').replace(/2$/,'II').replace(/3$/,'III').replace(/4$/,'IV').replace(/5$/,'V').replace(/6$/,'VI').replace(/7$/,'VII').replace(/8$/,'VIII').replace(/9$/,'IX');
		r = r.replaceAll(/0+/gm,"");
    return r;
};

console.log(intToRoman(1992));
