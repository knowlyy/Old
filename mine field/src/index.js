//扫雷
//1.点击开始游戏，获取#level中的当前数据（注意：①可能需要判断游戏状态）
//2.根据数据生成对应二维数组，并随机挑选num个数字当雷，并对周边格子进行累加
//3.根据上一步生成的二维数组在雷区#filde中创建dom元素（内容，类名，#filde的宽度大小）
//4.在雷区上绑定事件委托，监听左右键动作（执行添加或去除class）
//5.制作胜利或失败条件



// 现有问题
// 自定义难度下 3个参数必须有 少填或错填 没有提示
// 添加 自动标雷和 自动掀格子 的功能

var	residue = document.getElementsByClassName('residue')[0],//显示剩余地雷的个数
	olevel = document.getElementById('level'),//雷区级别
	filde = document.getElementById('filde'),//雷区
	time = document.getElementsByClassName('time')[0],
	start = document.getElementById('startGame');//开始游戏按钮

var oActive, fHeight, fWidth, fNum, coverNum, win, timer, ofHeight, ofWidth, ofNum;

var fildeArr = [];
var oWidth = 31;// 一个格子的宽度（带右边线的宽度）

// 取消双击选中文本（好像没用，不知道啥原因）
filde.onselect = function (){
	return false;
};

// 取消鼠标右键菜单
document.oncontextmenu = function () {
	return false;
};

// num代表随机数的个数，range代表随机数范围的上限 下限默认为0
function noRepeatRandom(num,range){
	var newArr = [];
	var count = 0;
	var ranNum,flag;
	// 严谨性判断 确认 num 和 range均是数字
	if(Number(num).toString() === 'NaN'){
		console.log('num is not a number');
		return false;
	}
	if(Number(range).toString() === 'NaN'){
		console.log('range is not a number');
		return false;
	}
	while(count < num){
		ranNum = Math.floor(Math.random()*range);
		if(count==0){
			newArr.push(ranNum);
			count++;
		} else {
			flag = true;
			for(var i = 0; i < newArr.length; i++){
				if(ranNum == newArr[i]){
					flag = false;
					break;
				}
			}
			if(flag){
				newArr.push(ranNum);
				count++;
			}
		}
	}
	newArr.sort(function(a,b){
		return a-b;
	});
	return newArr;
}


// 初始化雷区对应的二维数组 雷对应NaN 其他的对应0(NaN加任何数都等于NaN)
function initFildeArr(){
	var lei = noRepeatRandom(fNum,fHeight*fWidth);
	var number = 0;
	var k = 0;
	var temp;
	for(var i = 0; i < fHeight; i++){
		fildeArr[i] = new Array(fWidth);
		for(var j = 0; j < fWidth; j++){
			temp = document.createElement('li');
			temp.classList.add('cover');
			if(number == lei[k]){
				k++;
				temp.num = NaN;
			} else {
				temp.num = 0;
			}
			temp.col = j;
			temp.row = i;
			fildeArr[i][j] = temp;
			number++;
		}
	}
	// 将雷的周围九格的数字加1
	for(var m = 0; m < fHeight; m++){
		for(var n = 0; n < fWidth; n++){
			if(fildeArr[m][n].num.toString() === 'NaN'){
				if(m > 0){
					if(n > 0){
						fildeArr[m-1][n-1].num += 1;
					}
					fildeArr[m-1][n].num += 1;
					if(n < fWidth-1){
						fildeArr[m-1][n+1].num += 1;
					}
				}
				if(n > 0){fildeArr[m][n-1].num += 1;}
				if(n < fWidth-1){fildeArr[m][n+1].num += 1;}
				if(m < fHeight-1){
					if(n > 0){
						fildeArr[m+1][n-1].num += 1;
					}
					fildeArr[m+1][n].num += 1;
					if(n < fWidth-1){
						fildeArr[m+1][n+1].num += 1;
					}
				}
			}
		}
	}
}

// 将雷区的二维数组渲染到页面中
function renderFilde(){
	filde.innerHTML = '';
	for(var i = 0; i < fHeight; i++){
		for(var j = 0; j < fWidth; j++){
			if(fildeArr[i][j].num.toString() === 'NaN'){
				fildeArr[i][j].num = 9;
				fildeArr[i][j].innerHTML = '<img src="src/mine.png">';
			} else if(fildeArr[i][j].num){
				fildeArr[i][j].innerHTML = fildeArr[i][j].num;
				// if(fildeArr[i][j].num == 1){
				// 	fildeArr.style.color = '#0101FF';
				// } else if(fildeArr[i][j].num == 2){
				// 	fildeArr[i][j].style.color = '#007F00';
				// } else if(fildeArr[i][j].num == 3){
				// 	fildeArr[i][j].style.color = '#FF0101';
				// } else if(fildeArr[i][j].num == 4){
				// 	fildeArr[i][j].style.color = '#01017F';
				// } else if(fildeArr[i][j].num == 5){
				// 	fildeArr[i][j].style.color = '#800101';
				// } else if(fildeArr[i][j].num == 6){
				// 	fildeArr[i][j].style.color = '#018080';
				// } else if(fildeArr[i][j].num == 7){
				// 	fildeArr[i][j].style.color = '#010101';
				// } else if(fildeArr[i][j].num == 8){
				// 	fildeArr[i][j].style.color = '#AC0809';
				// }
			}
			filde.appendChild(fildeArr[i][j]);
		}
	}
}

// 切换级别选择
function levelChange(){
	var odd = olevel.getElementsByTagName('dd');
	for(var i = 0; i < odd.length; i++){
		(function (i){
			odd[i].onclick = function (){
				for(var j = 0; j < odd.length; j++){
					odd[j].className = '';
					this.className = 'active';
				}
			};
		})(i);
	}
}
levelChange();

// 扩散算法 掀开空格周围的8个格子
function checkedSpread(ele){
	if(ele){
		if(ele.num == 0){
			spread(ele);
		} else if(ele.classList.contains('cover')) {
			ele.classList.remove('cover');
			coverNum--;
		}
	}
}
function spread(ele){
	if(ele.classList.contains('cover')){
		ele.classList.remove('cover');
		coverNum--;
		if(ele.num == 0){
			if(ele.row > 0){
				checkedSpread(fildeArr[ele.row-1][ele.col-1]);
				checkedSpread(fildeArr[ele.row-1][ele.col]);
				checkedSpread(fildeArr[ele.row-1][ele.col+1]);
			}
			checkedSpread(fildeArr[ele.row][ele.col-1]);
			checkedSpread(fildeArr[ele.row][ele.col+1]);
			if(ele.row < fHeight-1){
				checkedSpread(fildeArr[ele.row+1][ele.col-1]);
				checkedSpread(fildeArr[ele.row+1][ele.col]);
				checkedSpread(fildeArr[ele.row+1][ele.col+1]);
			}
		}
	} else {
		return;
	}
}

// 计算游戏时间
function clock(){
	var timeNum = 0;
	clearInterval(timer);
	timer = setInterval(function(){
		time.innerHTML = timeNum;
		timeNum++;
	}, 1000);
}

function showFilde(){
	for(var i = 0; i < fHeight; i++){
		for(var j = 0; j < fWidth; j++){
			if(fildeArr[i][j].num == 9){
				fildeArr[i][j].classList.remove('cover');
			}
		}
	}
}

// 判断输赢 并展示所有的雷
function winner(){
	if(win && !coverNum){
		win = false;
		clearInterval(timer);
		setTimeout(function(){
			showFilde();
		}, 100);
		residue.innerHTML = 0;
		start.innerHTML = '开始游戏';
		setTimeout(function(){alert('你赢了');}, 1500);
	} else if(!win) {
		clearInterval(timer);
		setTimeout(function(){
			showFilde();
		}, 100);
		start.innerHTML = '开始游戏';
		setTimeout(function(){alert('你输了');}, 1500);
	}
}

function checkconfig(a, b, c){
	if(Number(a) && Number(b) && Number(c)){
		if(c < 10 || c > Math.floor(a*b*0.9)){
			alert('最大雷数不能超过'+Math.floor(a*b*0.9));
			return false;
		}
		return true;
	} else {
		alert('请输入有效的数字');
		return false;
	}
}

// 开始游戏按钮事件绑定
start.onclick = function (){
	win = true;
	oActive = olevel.getElementsByClassName('active')[0];//当前选中的雷区级别
	ofHeight = oActive.getElementsByClassName('fildeHeight')[0],
	ofWidth = oActive.getElementsByClassName('fildeWidth')[0],
	ofNum = oActive.getElementsByClassName('fildeNum')[0];
	fHeight = +ofHeight.value;//雷区高度
	fWidth = +ofWidth.value;//雷区宽度
	fNum = +ofNum.value;//雷区雷数
	if(checkconfig(fHeight, fWidth, fNum)){
		this.innerHTML = '重新开始';
		residue.innerHTML = fNum;
		coverNum = fHeight*fWidth - fNum;
		initFildeArr();
		renderFilde();
		filde.style.width = fWidth*oWidth + 'px';
		clock();
	}
};

// 雷区点击事件绑定
filde.onmousedown = function (e) {
	var ev = e || window.event;
	var target = ev.target || ev.srcElement;
	if(win){
		if(ev.which == 1){
			if(!target.classList.contains('flag') && target.classList.contains('cover')){
				spread(target);
				target.onmousedown = null;
				if(target.num == 9){
					win = false;
					target.style.backgroundColor = '#f00';
				}
				winner();
			}
		} else if(ev.which == 3){
			if(target.classList.contains('cover')){
				if(target.classList.contains('flag')){
					target.classList.remove('flag');
					residue.innerHTML = +residue.innerHTML + 1;
				} else {
					target.classList.add('flag');
					residue.innerHTML = +residue.innerHTML - 1;
				}
			} else {
				return false;
			}
		}
	} else {
		alert('请重新开始吧');
	}
};

function refresh(min, max, self) {
		self.value = self.value <= min ? min : self.value;
		self.value = self.value >= max ? max : self.value;
}