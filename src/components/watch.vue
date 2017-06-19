<template>
    <div>
        <h2>{{ text }}</h2>
        <div class="timeline user-timeline">
            <span></span>
            <ul>
                <li v-for="t in 12">{{ t }}AM</li>
                <li v-for="t in 12">{{ t }}PM</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                text: 'Watch component'
            }
        },
        methods: {

        }
    }

</script>

<style lang="scss">
    .timeline {
        width: 100%;
        height: 15px;
        border: 1px solid #9c9c9c;
        position: relative;
        span {
            position: absolute;
            height: 100%;
            width: 40%;
            left: 34%;
            background-color: red;
        }
        ul {
            padding: 0;
            margin: 25px -18px 0;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
            li {
                display: inline-block;
                position: relative;
                &:before {
                     content: '';
                     position: absolute;
                     bottom: 102%;
                     left: 50%;
                     width: 1px;
                     height: 25px;
                     background-color: #9c9c9c;
                }
                 &:first-child, &:last-child {
                    &:before {
                         display: none;
                     }
                }
            }
        }
    }
</style>