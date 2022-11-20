/*
My solution to the "integer to roman" problem on LeetCode.
A bit ugly but a treat for regex lovers :)
*/

function intToRoman(num) {
	let s = num.toString();
	let r = s.replace(/1(...)$/,'M$1').replace(/2(...)$/,'MM$1').replace(/3(...)$/,'MMM$1').replace(/4(...)$/,'MMMM$1');
	r = r.replace(/1(..)$/,'C$1').replace(/2(..)$/,'CC$1').replace(/3(..)$/,'CCC$1').replace(/4(..)$/,'CD$1').replace(/5(..)$/,'D$1').replace(/6(..)$/,'DC$1').replace(/7(..)$/,'DCC$1').replace(/8(..)$/,'DCCC$1').replace(/9(..)$/,'CM$1');
	r = r.replace(/1(.)$/,'X$1').replace(/2(.)$/,'XX$1').replace(/3(.)$/,'XXX$1').replace(/4(.)$/,'XL$1').replace(/5(.)$/,'L$1').replace(/6(.)$/,'LX$1').replace(/7(.)$/,'LXX$1').replace(/8(.)$/,'LXXX$1').replace(/9(.)$/,'XC$1');
	r = r.replace(/1$/,'I').replace(/2$/,'II').replace(/3$/,'III').replace(/4$/,'IV').replace(/5$/,'V').replace(/6$/,'VI').replace(/7$/,'VII').replace(/8$/,'VIII').replace(/9$/,'IX');
	r = r.replaceAll(/0+/gm,"");
	return r;
};

console.log(intToRoman(1992));
