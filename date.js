/**
 * Created by flow state on 2017/9/27.
 */
//先写上面的定时器  时间和日期
var todayTime = document.querySelector('.time');
var bigTime = document.querySelector('.bigTime');
//上部分
function nowTime(){
    window.requestAnimationFrame(nowTime);
    var second = new Date().getSeconds();
    var minute = new Date().getMinutes();
    var hour = new Date().getHours();
    todayTime.innerHTML =add0(hour)+':'+add0(minute)+':'+add0(second);
    var year = new Date().getFullYear();
    var month = new Date().getMonth()+1;
    var nowDay = new Date().getDate();
    bigTime.innerHTML = year+'年'+month+'月'+nowDay+'日';
    todayClass();
}
nowTime();
function add0(T){
    if(T<10){
        return '0'+T;
    }else{
        return T+'';
    }
}
//下半部分  生成格子  添加点击事件
//声明 Atitle YM  up  down  days
var Atitle = document.querySelector('.Atitle');
var YM = document.querySelector('.YM');
var up = document.querySelector('.up');
var down = document.querySelector('.down');
var days  =document.querySelector('.days');
var FDay = document.querySelector('.FDay');
//显示当月日期
var year = new Date().getFullYear();
var month = new Date().getMonth()+1;

//初始化  生成格子  并显示出当月的内容
function init(){
    start(year,month);
}
init();
//生成天
//参数是要显示的月份
function start(y,m){
    YM.innerHTML =y+'年'+m+'月';
    var str = '';
    //声明上一个月最后一天是星期几  向前加这个数+1个的daysDay daysPast
    var lastDay =new Date(y,(m-1),0);//上个月的最后一天
    var lastDaynow = new Date(y,m,0);//这个月的最后一天
    for(var i =0;i<lastDay.getDay();i++){
        str =`<span class="daysDay daysPast">${lastDay.getDate()-i}</span>`+str;
    }
    //生成当月的日期
    for(var j =0;j<lastDaynow.getDate();j++) {
        str +=`<span class="daysDay daysIng">${j+1}</span>`
    }
    FDay.innerHTML = str;
    //生成下月的日期
    var addSpanLength = FDay.querySelectorAll('span').length;
    console.log(addSpanLength);
    for(var k =0;k<(42-addSpanLength);k++){
        str +=`<span class="daysDay daysPast">${k+1}</span>`
    }
    FDay.innerHTML = str;
    todayClass(y,m);
    //给所有添加点击事件
    (function(){
        for(var i =0,allS =FDay.querySelectorAll('span');i<allS.length;i++){
            (function(j){
                allS[j].onclick =function () {
                    for(var k =0,allS =FDay.querySelectorAll('span');k<allS.length;k++){
                        allS[k].classList.remove('active');
                    }
                    allS[j].classList.add('active');
                }
            })(i);
        }
    })();
}
//点击上下按钮 改变year和month值重复调用start
down.onclick = function () {
    month++;
    if(month ===13){
        year++;
        month = 1;
    }
    start(year,month);
};
up.onclick = function () {
    month--;
    if(month ===0){
        year--;
        month = 12;
    }
    start(year,month);
};
//给当天添加背景
function todayClass(y,m){
    if(y==new Date().getFullYear() && m==new Date().getMonth()+1){
        var AllIng =FDay.querySelectorAll('.daysIng');
        AllIng[new Date().getDate()-2].classList.remove('now');
        AllIng[new Date().getDate()-1].classList.add('now');
    }
}
