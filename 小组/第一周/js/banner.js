
// 轮播图

// 获取需要操作的dom元素
const imgs = document.querySelectorAll('.imgs .img-container');
const dots = document.querySelectorAll('.main .box-top .banner-box .dot-box .dot');
const leftBtn = document.querySelector(".main .box-top .banner-box .left");
const rightBtn = document.querySelector(".main .box-top .banner-box .right");
let index = 0;

// 点击切换图片
const left = () => {
    // 停止自动播放
    clearInterval(autoPlayTimer);
    for (let i = 0; i < imgs.length; i++) {
        if (imgs[i].classList.contains('selected')) {
            index = i;
            imgs[i].classList.remove('selected');
            dots[i].classList.remove('selected')
        }
    }
    index--;
    if (index < 0) {
        index = imgs.length - 1;
    }
    imgs[index].classList.add('selected');
    dots[index].classList.add('selected');
    // 重新开始自动播放
    autoPlayTimer = setInterval(right, 3000);
}



const right = () => {
    clearInterval(autoPlayTimer);
    for (let i = 0; i < imgs.length; i++) {
        if (imgs[i].classList.contains('selected')) {
            index = i;
            imgs[i].classList.remove('selected');
            dots[i].classList.remove('selected')
        }
    }
    index++;
    if (index > imgs.length - 1) {
        index = 0;
    }
    imgs[index].classList.add('selected');
    dots[index].classList.add('selected');
    autoPlayTimer = setInterval(right, 3000);
}
// 添加事件监听
leftBtn.addEventListener('click', left);
rightBtn.addEventListener('click', right);

// 自动播放
autoPlayTimer = setInterval(right, 3000);

for(let [index,dot] of dots.entries()){
    dot.addEventListener('click',()=>{
        // 停止自动播放
        clearInterval(autoPlayTimer);
        // 移除所有选中状态
        for(let i=0;i<imgs.length;i++){
            if(imgs[i].classList.contains('selected')){
                imgs[i].classList.remove('selected');
                dots[i].classList.remove('selected');
            }
        }
        // 选中当前点击的dot以及对应的图片
        dot.classList.add('selected');
        imgs[index].classList.add('selected');
        // 重新开始自动播放
        autoPlayTimer=setInterval(right,3000);
    });
}