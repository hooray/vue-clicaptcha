<template>
    <button type="button" @click="captcha()">点击我</button>
</template>

<script>
import Clicaptcha from "@/components/index.js";

export default {
    methods: {
        captcha() {
            Clicaptcha({
                src: "http://localhost/clicaptcha-server/clicaptcha.php",
                callback: () => {
                    alert("yes");
                }
            });
        }
    }
};
</script>
