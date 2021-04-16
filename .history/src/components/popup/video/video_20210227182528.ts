let styles = require('./video.css').default // 引入组件css文件

interface Ivideo {
    url: string,
    elem: string | HTMLElement,
    width?: string,
    height?: string,
    autoplay?: boolean
}

interface Icomponent { // 组件方法的接口
    tempContainer: HTMLElement, //模板容器
    init: () => void, // 初始化组件
    template: () => void, // 创建模板
    handle: () => void // 事件
}

function video ( options: Ivideo) {
    return new Video (options)
}

class Video implements Icomponent {
    tempContainer;
    constructor( private settings : Ivideo) {
        
    }
    init() {

    }
    template() {

    }
    handle() {

    }
}

export default Video