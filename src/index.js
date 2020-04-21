/*
 * @Author: 夏夏夏
 * @Date: 2020-04-16 11:52:23
 * @LastEditors: 夏夏夏
 * @LastEditTime: 2020-04-17 10:35:27
 * @Description: file content
 */
import Vue from 'vue'
import App from './app.vue'
import './assets/styles/global.styl'


const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  render: (h) => h(App)
}).$mount(root)