// ベースマップを作成する
// ここでは3DのOpenStreetMapを表示する
var map =  new maplibregl.Map({
    container: 'map',
    style: 'style.json',
    center: [129.768337, 32.986804],
    zoom: 19,
    hash: true,
    pitch: 30,
    localIdeographFontFamily: false
})

map.on('load', function () {
    map.addSource('shelter_point', {
        type: 'geojson',
        data: './data/nagasaki_shelter.geojson'
    });

    // スタイルを設定
    map.addLayer({
        'id': 'shelter',
        'type': 'circle',
        'source': 'shelter_point',
        'layout': {},
        'paint': {
            'circle-color': '#FF0000',
            'circle-radius': 5
        }   
    });
});