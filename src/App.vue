<template>
  <div id="yandex-map__container" class="yandex-map__container">
  </div>
</template>

<script>
import ymaps from 'ymaps';
export default {
  name: 'App',
  mounted() {
    ymaps
        .load('https://api-maps.yandex.ru/2.1/?lang=ru_RU')
        .then(maps => {
          console.log(maps)
          // eslint-disable-next-line no-unused-vars
          const map = new maps.Map('yandex-map__container', {
            center: [-8.369326, 115.166023],
            zoom: 7
          });
          console.log(map)
          maps.borders.load('RU',{
            lang: "ru",
            quality: 2
          }).then(function (geojson) {
            var resultRegion = { ...geojson }; // клонируем результат
            var objectRussia = new maps.ObjectManager(); // создаем коллекцию всех регионов кроме актуального
            var objectRegion = new maps.ObjectManager(); // аналогично но для нашего региона
            // eslint-disable-next-line no-unused-vars
            var regions = geojson.features.reduce(function (acc, feature) {
              var iso = feature.properties.iso3166;
              feature.id = iso;
              if(iso === 'RU-AMU')
                feature.options = {
                  fillColor: '#F8E174',
                  fillOpacity: 0,
                  strokeColor: '#000',
                  strokeOpacity: 0.3,
                  strokeWidth: 5,
                }
              else
                feature.options = {
                  fillColor: '#000',
                  fillOpacity: 0.1,
                  strokeColor: '#000',
                  strokeOpacity: 0.3,
                  strokeWidth: 1,
                }
              acc[iso] = feature;
              return acc;
            }, {});
            geojson.features = [];
            resultRegion.features = [];
            for (var reg in regions) {
              if(reg === 'RU-AMU')
                resultRegion.features.push(regions[reg]);
              else
                geojson.features.push(regions[reg]);
            }
            console.log(geojson,resultRegion)
            objectRussia.add(geojson);
            objectRegion.add(resultRegion);
            map.geoObjects.add(objectRussia);
            map.geoObjects.add(objectRegion);
          }, function (e) {
            console.log(e);
          });
        })
        .catch(error => console.log('Failed to load Yandex Maps', error));
    console.log(ymaps)
  }
}
</script>

<style lang="sass">
#app, body
  margin: 0
.yandex-map__container
  width: 100%
  height: 100vh
.yandex-map__map
  width: 100%
  height: 100%
  object-fit: cover
</style>
