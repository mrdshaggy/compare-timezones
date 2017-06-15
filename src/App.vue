<template>
    <div class="container">
        <h1>{{ msg }}</h1>
        <user-location></user-location>
        <choose-location></choose-location>
        <watch></watch>
        <timezone-map></timezone-map>


    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                msg: 'Welcome to CompareTimeZone App'
            }
        },
        methods: {

        }
    }
</script>

<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
    .container {
        max-width: 80%;
        margin: 0 auto;
    }
</style>
