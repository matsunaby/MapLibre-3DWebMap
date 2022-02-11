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
    map.addSource('sample', {
        type: 'geojson',
        data: './data/nagasaki_polygon.geojson'
    });

    // スタイルを設定
    map.addLayer({
        'id': 'sample',
        'type': 'fill',
        'source': 'sample',
        'layout': {},
        'paint': {
        'fill-color': '#088',
        'fill-opacity': 0.8
        }      
    });
});

/* // GeoJSON を読み込みレイヤを表示する
function addGeoJSONLayer(map){
    // データソースを定義
    map.addSource('sample', {
        type: 'geojson',
        data: './data/nagasaki_polygon.geojson'
    });

    // スタイルを設定
    map.addLayer({
        'id': 'sample',
        'type': 'fill',
        'source': 'sample',
        'layout': {},
        'paint': {
        'fill-color': '#088',
        'fill-opacity': 0.8
        }      
    });
} */