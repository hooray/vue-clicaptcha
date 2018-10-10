# vue-clicaptcha

## 安装

### 0. 安装 axios 和 vue-cookies

vue-clicaptcha 运行依赖 axios 和 vue-cookies 包，如果项目本身有使用可以忽略这步

```
npm install axios -S
npm install vue-cookies -S
```

### 1. 安装 vue-clicaptcha

```
npm install vue-clicaptcha -S
```

### 2. 部署后端环境

移步至 [clicaptcha-server](https://github.com/hooray/clicaptcha-server) 项目

## 使用

```javascript
// 在 main.js 里增加
import VueCookies from "vue-cookies";
Vue.use(VueCookies);

// 调用 vue-clicaptcha
import VueClicaptcha from "vue-clicaptcha";
VueClicaptcha({
    src: "http://localhost/clicaptcha.php",  // 后端地址
    success: "",  // 成功提示，默认为“验证成功！”
    error: "",  // 错误提示，默认为“未点中正确区域，请重试！”
    callback: () => {
        // 校验成功后执行后续业务
    }
});
```

## 预览效果

![](https://i.loli.net/2018/10/10/5bbdb7ca30961.png)
![](https://i.loli.net/2018/10/10/5bbdba619fc92.png)
![](https://i.loli.net/2018/10/10/5bbdba4132cab.png)