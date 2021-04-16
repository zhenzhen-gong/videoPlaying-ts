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
        this.settings = Object.assign({
            width: '100%',
            height: '100%',
            autoplay: false
        }, this.settings)
        this.init()
    }

    init() {
      this.template()
      this.handle()
    }

    template() {
      this.tempContainer = document.createElement('div')
      this.tempContainer.className = styles.video
      this.tempContainer.style.width = this.settings.width
      this.tempContainer.style.height = this.settings.height
      this.tempContainer.innerHTML = `
        <video class="${styles['video-content']}"></video>
        <div class="${styles['video-controls']}">
          <div class="${styles['video-progress']}">
            <div class="${styles['video-progress-now']}"></div>
            <div class="${styles['video-progress-suc']}"></div>
            <div class="${styles['video-progress-bar']}"></div>
          </div>
          <div class="${styles['video-play']}">
            <i class="iconfont icon-bofang"></i>
          </div>
          <div class="${styles['video-time']}">
             <span>00:00</span> / <span>00:00</span>
          </div>
          <div class="${styles['video-full']}">
            <i class="iconfont icon-quanping1"></i>
          </div>
          <div class="${styles['video-volume']}">
            <i class="iconfont icon-yinliang"></i>
          </div>
        </div>
      `

    }

    handle() {

    }
}

export default Video