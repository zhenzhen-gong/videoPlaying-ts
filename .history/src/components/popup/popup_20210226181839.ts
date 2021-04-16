import './popup.css'

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
     this.tempContainer.innerHTML = `<h1 class = "popup">hello</h1>`
     document.body.appendChild(this.tempContainer)
  }
  handle() {

  }
}

export default popup;