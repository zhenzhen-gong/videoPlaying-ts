import './main.css' // 引入css文件
import popup from './components/popup/popup' // 引入ts文件

let listIterm = document.querySelectorAll('#list li')

for (let i = 0; i < listIterm.length; i++) {
    listIterm[i].addEventListener('click', function(){
        let url = this.dataset.url
        let title = this.dataset.title
        popup({
            width: '880px',
            height: '556px',
            title
        })
    })
}