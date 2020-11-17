function animate(element,target) {
    // 保证页面只有一个定时器
    if(element.timerId) {
        clearInterval(element.timerId);
        timerId = null;
    }
    element.timerId = setInterval(() => {
        // var target = 500;
        // 步进
        var step = 20;
        var current = element.offsetLeft;
        if (current > target) {
            step = - Math.abs(step);
        }
        // Math.abs(current - target) < Math.abs(step)
        if (Math.abs(current - target) < Math.abs(step)) {
            // 停止定时器
            clearInterval(timeId);
            // 设置坐标为500
            element.style.left = target + 'px';
            console.log(element.style.left);
            // 退出函数
            return;
        }
        element.style.left = current + step + 'px';
        console.log(element.offsetLeft);
    }, 30);
}