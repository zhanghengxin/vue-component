<template>
	<div> 
        <svg xmlns="http://www.w3.org/200/svg" height="110" width="110">
            <circle cx="55" cy="55" r="50" fill="none" stroke="grey" stroke-width="5" stroke-linecap="round"></circle>
            <circle class="demo2" id="J_demo2" cx="55" cy="55" r="50" fill="none" stroke="red" stroke-width="5" stroke-dasharray="0,10000"></circle>
            <text x="55" y="55" fill="red">30%</text>
        </svg>
	</div>
</template>

<script>
	export default {
		name: 'bwCircle',
		props: {
			radius: {//半径
				type: String,
				default: '50'
			},
			strokew: {//环宽
				type: String,
				default: '5'
			},
			strokec: {//圆环颜色
				type: String,
				default: 'grey'
			},
			percent: {//百分数
				type: Number,
				default: '30'
			}
		},
		data() {
			return {
				
			}
		},
		mounted() {
			var demo2 =  document.querySelector("#J_demo2");
			var circleLength = Math.floor(2 * Math.PI * demo2.getAttribute("r"));
			function rotateCircle (jd) {
				demo2.setAttribute("stroke-dasharray","" + 0 + ",10000");
			    jd = Math.max(0,jd);
			    jd = Math.min(100,jd);
			    demo2.setAttribute("stroke-dasharray","" + circleLength * jd / 100 + ",10000");
			}
			rotateCircle (30)
		}
	}
</script>

<style>
.demo2{
    transform-origin: 55px 55px;
    transform: rotate(-90deg);
    transition: stroke-dasharray .3s ease-in;
}
text{
	text-anchor: middle;/*水平居中*/
    dominant-baseline: middle;/*垂直居中*/
}
</style>