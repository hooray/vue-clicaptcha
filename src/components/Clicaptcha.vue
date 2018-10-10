<template>
    <div>
        <div id="clicaptcha-box">
            <img class="clicaptcha-img" :src="imgSrc" @load="setTitle" @click.prevent="record($event)" alt="验证码加载失败，请点击刷新按钮">
            <div class="clicaptcha-title" v-if="tip">
                {{tip}}
            </div>
            <div class="clicaptcha-title" v-else>
                请依次点击
                <span v-for="(text, index) in text" :key="index" :class="xy.length > index ? 'clicaptcha-clicked' : ''">{{text}}</span>
            </div>
            <div class="clicaptcha-refresh-box">
                <div class="clicaptcha-refresh-line clicaptcha-refresh-line-l"></div>
                <a href="javascript:;" class="clicaptcha-refresh-btn" title="刷新" @click="reset"></a>
                <div class="clicaptcha-refresh-line clicaptcha-refresh-line-r"></div>
            </div>
        </div>
        <div id="clicaptcha-mask" @click="close"></div>
    </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

axios.defaults.withCredentials = true;

export default {
    data() {
        return {
            src: "",
            imgSrc: "",
            success: "验证成功！",
            error: "未点中正确区域，请重试！",
            tip: "",
            isCheck: false,
            xy: [],
            text: [],
            callback: function() {}
        };
    },
    created() {
        this.loadImg();
    },
    methods: {
        loadImg() {
            this.imgSrc = this.src + "?" + new Date().getTime();
        },
        setTitle() {
            this.tip = "";
            this.text = window.$cookies.get("clicaptcha_text").split(",");
            this.xy = [];
        },
        record(event) {
            this.xy.push(event.offsetX + "," + event.offsetY);
            if (this.xy.length == this.text.length) {
                let captchainfo = [
                    this.xy.join("-"),
                    event.target.width,
                    event.target.height
                ].join(";");
                axios
                    .post(
                        this.src,
                        qs.stringify({
                            do: "check",
                            info: captchainfo
                        })
                    )
                    .then(cb => {
                        let that = this;
                        if (cb.data == 1) {
                            that.tip = that.success;
                            setTimeout(() => {
                                that.close();
                                that.callback();
                            }, 1500);
                        } else {
                            that.tip = that.error;
                            setTimeout(() => {
                                that.reset();
                            }, 1500);
                        }
                    });
            }
        },
        reset() {
            this.loadImg();
        },
        close() {
            this.$destroy(true);
            this.$el.parentNode.removeChild(this.$el);
        }
    }
};
</script>

<style lang="scss" scoped>
#clicaptcha-box {
    width: 350px;
    height: 290px;
    padding: 15px;
    border: 1px solid #b1b3b8;
    background-color: #f5f6f7;
    position: fixed;
    z-index: 10000;
    left: 50%;
    top: 50%;
    margin-left: -191px;
    margin-top: -161px;
    border-radius: 10px;
    box-shadow: 0 0 0 1px hsla(0, 0%, 100%, 0.3) inset,
        0 0.5em 1em rgba(0, 0, 0, 0.6);
    .clicaptcha-img {
        width: 350px;
        height: 200px;
        border: none;
    }
    .clicaptcha-title {
        font-family: "Microsoft YaHei";
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        text-align: center;
        color: #333;
        span {
            margin-left: 10px;
            font-size: 18px;
            font-weight: bold;
            color: #c00;
            &.clicaptcha-clicked {
                color: #069;
            }
        }
    }
    .clicaptcha-refresh-box {
        position: relative;
        margin-top: 10px;
    }
    .clicaptcha-refresh-line {
        position: absolute;
        top: 16px;
        width: 140px;
        height: 1px;
        background-color: #ccc;
    }
    .clicaptcha-refresh-line-l {
        left: 5px;
    }
    .clicaptcha-refresh-line-r {
        right: 5px;
    }
    .clicaptcha-refresh-btn {
        display: block;
        margin: 0 auto;
        width: 32px;
        height: 32px;
        background: url(../assets/refresh.png) no-repeat;
        &:hover {
            background-position: -32px 0;
        }
    }
}
#clicaptcha-mask {
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background-color: rgb(0, 0, 0);
}
</style>