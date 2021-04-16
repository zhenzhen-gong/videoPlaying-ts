// import './popup.css' // 引入全局的css文件 ---ts的引用方式
let styles = require('./popup.css').default  // 用nodes引入组件的css，只在组件内生效 ---webpack的引用方式
// import styles from './popup.css' // 需配合popup.css.d.ts声明文件使用才会生效

interface Ipopup {
    width?: string,
    height?: string,
    title?: string,
    position?: string,
    mask?: boolean, // 是否有遮罩层 
    content?: () => void // 要显示的内容，可能是图片、文字或视频等，故不限制（void）
}

interface Icomponent { // 组件方法的接口
    tempContainer: HTMLElement, //模板容器
    init: () => void, // 初始化组件
    template: () => void, // 创建模板
    handle: () => void // 事件
}

function popup (options: Ipopup) {
  return new Popup(options)
}

class Popup implements Icomponent {
  tempContainer;
  constructor ( private settings: Ipopup) {
     this.settings = Object.assign({
       // 默认值
       width: '100%',
       height: '100%',
       title: '',
       position: 'center',
       mask: true,
       content: function() {}
     }, this.settings)
     this.init()
  }
  init() {
     this.template()
  }
  template() {
     this.tempContainer = document.createElement('div')
     this.tempContainer.style.width = this.settings.width
     this.tempContainer.style.height = this.settings.height
     this.tempContainer.className = styles.popup
     this.tempContainer.innerHTML = `
        <div class="${styles['popup-title']}">
           <h3>${this.settings.title}</h3>
           <i class="iconfont icon-guanbi"></i>
        </div>
        <div class="${styles['popup-content']}"></div>
     `
     document.body.appendChild(this.tempContainer)
  }
  handle() {

  }
}

export default popup;