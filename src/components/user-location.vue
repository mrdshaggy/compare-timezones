<template>
    <div>
        <div v-if="show">
            <!--<p v-for="key in user.coords">{{key}}</p>-->
            <p>Your location: {{ user.location }}</p>
            <p>Your time: {{ user.currentTime }}</p>
            <p></p>
        </div>

    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                text: 'Your location',
                user: {
                    coords: [],
                    location: '',
                    currentTime: '',
                },
                show: true,
            }
        },
        created: function () {
            this.getUserCoords();
        },
        mounted: function () {
            var $this = this;
            setTimeout(function () {
                $this.getUserLocation();
            },1000);


        },
        methods: {
            getUserLocation() {
                var uc = this.user.coords.toString();
                this.user.location = this.getCity(uc);
                this.user.currentTime = this.getTime(uc);
            },
            getUserCoords() {
                var arr = this.user.coords;
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showCoords);
                } else {
                    alert("Geolocation is not supported by this browser.");
                }
                function showCoords(position) {
                    arr.push(position.coords.latitude, position.coords.longitude);
                }
            },
            getCity(coords) {
                var $this = this;
                fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + coords + '&sensor=false')
                    .then(data => {
                        return data.json();
                    }).then(json => {
                        var city = json.results[0].address_components[3].long_name,
                            country = json.results[7].formatted_address,
                            location = (city + ', ' + country);
                        $this.user.location = location;
                });
            },
            getTime(coords) {
                var $this = this;
                var targetDate = new Date(),
                    timestamp = targetDate.getTime() / 1000 + targetDate.getTimezoneOffset() * 60,
                    apicall = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + coords + '&timestamp=' + timestamp + '&sensor=false';

                fetch(apicall)
                    .then(data => {
                        return data.json();
                    }).then(json => {
                        var offsets = json.dstOffset * 1000 + json.rawOffset * 1000,
                            localdate = new Date(timestamp * 1000 + offsets);
                        $this.user.currentTime = localdate.toLocaleString();
                });
            },
        }
    }

</script>