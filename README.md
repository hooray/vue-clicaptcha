# vue-clicaptcha

## 安装

### 1. 安装 vue-clicaptcha

```
npm install vue-clicaptcha
```

### 2. 部署后端环境

移步至 [clicaptcha-server](https://github.com/hooray/clicaptcha-server) 项目

## 使用

```javascript
import VueClicaptcha from 'vue-clicaptcha'
VueClicaptcha({
    src: 'http://localhost/clicaptcha.php',  // 后端地址
    success: '验证成功！',  // 成功提示，默认为“验证成功！”
    error: '未点中正确区域，请重试！',  // 错误提示，默认为“未点中正确区域，请重试！”
    callback: () => {
        // 校验成功后执行后续业务
    }
});
```

## 预览效果

![](https://i.loli.net/2018/10/10/5bbdb7ca30961.png)
![](https://i.loli.net/2018/10/10/5bbdba619fc92.png)
![](https://i.loli.net/2018/10/10/5bbdba4132cab.png)