        // 获取元素
        var box = document.querySelector('.box');
        var screen = document.querySelector('.screen');
        // 图片
        var ul = screen.querySelector('ul');
        // 序号
        var ol = document.querySelector('ol');
        // 箭头
        var arr = document.querySelector('.arr');
        var arrLeft = arr.children[0];
        var arrRight = arr.children[1];
        // 1 动态生成序号
        // 页面上总共有多少张图片
        var count = ul.children.length;
        var index = 0;//第一张图片的索引
        for (var i = 0; i < count; i++) {
            // 创建元素
            var li = document.createElement('li');
            // 给ol添加元素
            // ol.appendChild(li)
            ol.appendChild(li).innerText = i + 1;
            // setInnerText(li, i+1);
            // 让序号1高亮显示
            if (i == 0){
                li.className = 'bg';
            }
            // 当前li记录他的索引 设置属性
            li.setAttribute('index', i)
            // 2 点击序号 动画的方式切换图片
            li.onclick = liClick;
        }
        // 让序号1高亮显示
        // ol.children[0].className = 'bg';
        // 2 点击序号 动画的方式切换图片
        var timeId = null;
        function liClick() {
            // 2.1 取消其他li的高亮显示，当前li高亮显示
            for (var i = 0; i < ol.children.length; i++){
                var li = ol.children[i];
                li.className = ''
            }
            this.className = 'bg'
            // 2.2 点击序号，动画方式切换到当前点击的图片的位置
            //图片的宽度
            var imgWidth = screen.offsetWidth;
            // 找到序号相应的图片
            var liIndex = parseInt(this.getAttribute('index'));
            index = liIndex;
            console.log(index);
            animate(ul, -liIndex*imgWidth)
        }
        // 3 鼠标放到盒子上显示箭头
        box.onmouseenter = function() {
            arrLeft.style.display = 'block';
            arrRight.style.display = 'block';
            clearInterval(timeID)
        }
        box.onmouseleave = function() {
            arrLeft.style.display = 'none';
            arrRight.style.display = 'none';
            timeID = setInterval(() => {
            // 切换到下一张图片
            arrRight.click()
        }, 2000);
            // var timeID = setInterval(() => {
            //     arrRight.click();
            // }, 2000);
        }
        // 4 实现上一张和下一张的功能
        //给箭头注册点击事件
        console.log(count);
        var imgWidth = screen.offsetWidth;
        // // 下一张
        // var index = 0; 
        arrRight.onclick = function() {
            // 判断是否是克隆的第一张 如果是克隆的第一张，ul的坐标就设为真正的第一张
            if (index == count){
                // ul.style.top = '0px';
                ul.style.left = '0px';
                index = 0;
            }
            index++;
            if (index < count ) {
            //     console.log(index);
            //     for (var i = 0; i < ol.children.length; i++){
            //     var li = ol.children[i];
            //     li.className = ''
            // }
            // ol.children[index].className = 'bg';
            // animate(ul, -index*imgWidth)
            // 获取图片序号 让序号点击
            ol.children[index].click();
            } else {
                // 以动画得到方式 移动到克隆的最后一张
                animate(ul, -index*imgWidth)
                // 取消所有序号的高亮显示 让第一张高亮显示
                // index = 0;
                for (var i = 0; i < ol.children.length; i++){
                var li = ol.children[i];
                li.className = ''
            }
            ol.children[0].className = 'bg';
            }
            // console.log(index);
        }
        // 无缝滚动
        // 获取ul中的第一个li
        var firstLi = ul.children[0];
        var lastLi = ul.children[4];
        // 克隆li
        // cloneNode() 复制节点
        // 参数 true 复制节点和内容
        // false 复制节点
        var cloneLi = firstLi.cloneNode(true);
        ul.appendChild(cloneLi);
        // console.log(ul.children.length);
        // console.log(ul.children[0].offsetWidth);
        ul.style.width = (ul.children.length ) * ul.children[0].offsetWidth + 'px';
        // console.log(ul.style.width);
        // 上一张
        arrLeft.onclick = function() {
            // 如果是第一张图片也就是克隆的图片
            if (index == 0){
                // ul.style.top = '0px';
                index = count;
                ul.style.left = -index * imgWidth + 'px';
            }
            //如果不是第一张的话 index--
            index--;
            ol.children[index].click();
        }
        // 5 自动切换图片
        var timeID = setInterval(() => {
            // 切换到下一张图片
            arrRight.click()
        }, 2000);