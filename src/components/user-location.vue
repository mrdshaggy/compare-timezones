<template>
    <div>
        <div v-if="show">
            <p>Your location: {{ user.location }}</p>
            <p>Your timezone: {{ user.timezone }}</p>
            <p>Your current time: {{ userCurrentTime() }}</p>
        </div>
        <button @click="getMyLocation">Get my location</button>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                text: 'Your location',
                user: {
                    latitud: '',
                    longitud: '',
                    location: '',
                    timezone: '',
                    currentTime: '',
                },
                customer: {
                    location: '',
                    timezone: '',
                    currentTime: '',
                },
                show: false,
            }
        },
        mounted: function () {
            this.checkLocation();
//            this.checkTimezone();
        },
        methods: {
            getMyLocation() {
                this.checkTimezone();
                this.show = true;
            },
            checkLocation() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(this.getLocation, this.locationFailed);
                    console.log('Location found');
                }
                else {
                    this.user.location = "You don't have geolocation";
                }
            },
            getLocation(position) {
                this.user.latitud = position.coords.latitude;
                this.user.longitud = position.coords.longitude;
                fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.user.latitud + ',' + this.user.longitud + '&sensor=false')
                    .then(data => {
                    return data.json();
                }).then(json => {
//                    console.log(json);
                    var city = json.results[0].address_components[3].long_name,
                        country = json.results[7].formatted_address,
                        userLocation = (city + ', ' + country);
                    this.user.location = userLocation;
                });
            },
            locationFailed() {
                document.write("We didn't get your location. Please check your settings");
            },
            checkTimezone() {
                var lat = this.user.latitud,
                    long = this.user.longitud;

                console.log(lat, long, 'a');
                fetch('https://maps.googleapis.com/maps/api/timezone/json?location=' + lat + ',' + long + '&timestamp=' + (Math.round((new Date().getTime())/1000)).toString() + '&sensor=false')
                    .then(data => {
                        return data.json();
                    }).then(json => {
//                        console.log(json);
                        this.user.timezone = json.timeZoneName + ' (' + json.timeZoneId + ')';
                });
            },
            userCurrentTime() {
                var t = new Date();
                return t.getTime();
            },
        }
    }

</script>