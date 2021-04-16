// import a from './a' // 引入a.ts文件
import './main.css' // 引入a.css文件

let listIterm = document.querySelectorAll('#list li')

for (let i = 0; i < listIterm.length; i++) {
    listIterm[i].addEventListener('click', function(){
        let url = this.dataset.url
        let title = this.dataset.title

        console.log(url, title)
    })
}