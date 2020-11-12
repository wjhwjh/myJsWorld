/*
 封装一个其tab切换功能，其中包括增加、删除、切换
 感受一下封装对象的思想
 主要是对DOM的操作，事件的注册、DOM的获取创建删除
 其中的逻辑

*/
/*
分类这个思维方式，很棒。
*/
/*
问题：
1. that 的定义，定义为全局变量吗？如何使用，为什么要这样做
2. 事件函数也是一种函数和声明式函数相同


为DOM插入元素时使用的内置方法，显的很高级的样子
insertAdjacentText(position, string);
insertAdjacentHTML(position, htmlstring);
insertAdjacentElement(position, element);

beforebegin
afterbegin
beforeend
afterend

*/
let that; // 这是一个全局变量
class Tab{
  constructor(id) {
    that = this; 
    this.domId = document.querySelector(id);
    this.nav = this.domId.querySelector(".nav");
    // this.navList = this.domId.querySelectorAll('li');
    this.add = this.domId.querySelector('.add');
    this.content=this.domId.querySelector('.content-wrapper');
    //this.contentDiv=this.domId.querySelectorAll('.content-wrapper > div');
    // console.log('内容元素--',this.contentDiv);
    this.init();
  }
  // 对DOM进行初始化，注册默认的事件
  init(){
    this.upDateDom();
    let len = this.navList.length;
    for(let i=0; i<len; i++){
      // console.log(this)
      this.navList[i].index=i;
      this.navList[i].onclick=this.toggleTab;
      this.deleteDiv[i].onclick=this.deleteTab;
      this.editNav[i].ondblclick=this.editTab;
      this.contentDiv[i].ondblclick=this.editTab;
    }
    // 添加操作
    this.add.onclick = this.addTab;
    // console.log(that)
  }
  // 清楚DOM类
  clearClass(){
    this.upDateDom();
    for(let i=0; i<this.navList.length; i++){
      this.navList[i].className='';
      this.contentDiv[i].className='';
    }
  }
  // 更新DOM, 每次创建DOM添加到对应位置，都应该重新获取创建后的DOM
  // 如果不重新获取，则代表是初始获取的
  upDateDom(){
    this.navList = this.domId.querySelectorAll('li');
    this.contentDiv=this.domId.querySelectorAll('.content-wrapper > div');
    this.deleteDiv = this.domId.querySelectorAll('.tabDelete');
    this.editNav = this.nav.querySelectorAll('span');
    this.editContent = this.content.querySelectorAll('span');
  }
  // 添加
  addTab(){
    // console.log('添加操作');
    let random = Math.random();
    
    that.clearClass();
    // 添加切换的li
    let li = '<li class="active"><span>新添加</span><a class="tabDelete" href="javascript:void(0)">-</a></li>';
    that.nav.insertAdjacentHTML('beforeend',li)

    // 添加切换li对应的内容
    let div = '<div class="active"><span>新添加的内容'+random+'</span></div>';
    that.content.insertAdjacentHTML('beforeend', div);

    // 对于新添加的元素没有注册的事件
    that.init();
  }
  // 删除
  deleteTab(e){
    // 阻止事件冒泡
    e.stopPropagation();
    let parent = this.parentNode;
    let index = parent.index;
    //console.log('父级元素--', parent.getAttribute('class'))
    
    // 先执行删除操作
    parent.remove();
    that.contentDiv[index].remove();

    // console.log(that.nav.querySelector('.active'))
    
    //console.log('父级元素',parent);
    // 删除以后，DOM并没有更新，所有还是能获取到父级元素的 
    // 这是一种实现方法
    if(parent.getAttribute('class')==='active'){
      // 判断当前点击的是否是第一个，
      index===0? index:index--;
      //index--;
      // console.log(index);
      // index<0?index=0:index;
      //console.log('索引',index);
      //更新DOM，这里必须更新DOM
      that.upDateDom();
      that.init();
      // 重置DOM的样式，这里必须得判断是否存在，如果把最后一个删除掉，就会报错
      that.navList[index]&&that.navList[index].click();
      that.contentDiv[index]&&(that.contentDiv[index].className='active');
      return true
     }
     that.init();
  }
  // 切换
  toggleTab(){
    // console.log('这是一个点击事件',this);
    // 这里的this指的是点击的当前DOM。并不是这个构造函数生成的对象
    // 要想调用构造函数中其它方法和属性，不能使用this调用，而是使用that
    // console.log(this.index, that.contentDiv[0]);
    that.clearClass();
    this.className='active';
    that.contentDiv[this.index].className='active'; 
  }
  editTab(){
    // 编辑功能
    let str = this.innerText;

    // window.getSelection?window.getSelection().removeAllRanges:document.select.empty();
    console.log(str);
    this.innerHTML = `<input type="text">`;
    let input = this.children[0];
    input.value = str;
    input.select();
    input.onblur=function(){
      //console.log(input.value)
      this.parentNode.innerHTML = this.value;
    }
    input.onkeyup=function(e){
      if(e.keyCode===13){
        // console.log('键盘事件', e);
        this.blur();
      }
    } 
    // let value = input.value;
   // console.log('这是一个DOM', this, input);
  
  }
}
new Tab('#tabWrapper')