<template>
    <div>
        <h2>{{ text }}</h2>
        <input ref="citySearch" class="controls" type="text" placeholder="Enter a location">
        <p>{{ customer.location }}</p>
        <p>{{ customer.currentTime }}</p>
        <!--<button @click="getCustomerTime">aaa</button>-->
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                text: 'Choose location you want to compare',
                customer: {
                    coords: [],
                    location: '',
                    currentTime: '',
                },
            }
        },
        mounted() {
            google.maps.event.addDomListener(window, 'load', this.initialize);
        },
        methods: {
            initialize() {
                var $this = this;
                var address = this.$refs.citySearch;
                var autocomplete = new google.maps.places.Autocomplete(address);
                autocomplete.setTypes(['geocode']);
                google.maps.event.addListener(autocomplete, 'place_changed', function () {
                    var place = autocomplete.getPlace();
                    if (!place.geometry) {
                        return;
                    }
                    $this.customer.coords = place.geometry.location.toString().replace(/[ )(]/g,'').split(',');
                    console.log($this.customer.coords);

                    $this.customer.currentTime = $this.getTime($this.customer.coords);
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
                    $this.customer.currentTime = localdate.toLocaleString();
                });
            },
        }
    }
</script>