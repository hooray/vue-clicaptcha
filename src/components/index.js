import Vue from 'vue'

let ClicaptchaConstructor = Vue.extend(require('./Clicaptcha.vue').default)

let instance;

const Clicaptcha = (options) => {
	options = options || {}
	instance = new ClicaptchaConstructor({
		data: options
	})
	instance.vm = instance.$mount()
	instance.dom = instance.vm.$el
	document.body.appendChild(instance.dom)
	return instance.vm
}

export default Clicaptcha