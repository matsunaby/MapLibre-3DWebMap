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
    map.addSource('dosya-keikai', {
        type: 'geojson',
        data: './data/nagasaki_dosya-keikai.geojson'
    });

    // スタイルを設定
    map.addLayer({
        'id': 'dosya-keikai',
        'type': 'fill',
        'source': 'dosya-keikai',
        'layout': {},
        'paint': {
            'fill-color': 'Yellow',
            'fill-opacity': 0.5
        }   
    });

    map.addSource('kyukei-kiken', {
        type: 'geojson',
        data: './data/nagasaki_kyukei-kiken.geojson'
    });

    // スタイルを設定
    map.addLayer({
        'id': 'kyukei-kiken',
        'type': 'fill',
        'source': 'kyukei-kiken',
        'layout': {},
        'paint': {
            'fill-color': 'Red',
            'fill-opacity': 0.5
        }   
    });

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
            'circle-color': 'Green',
            'circle-radius': 5
        }   
    });
});