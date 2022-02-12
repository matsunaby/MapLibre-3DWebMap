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

// UIツール
// 右下のズームレベルの＋−ボタンを表示する
map.addControl(new maplibregl.NavigationControl(), 'bottom-right');
// 右上の現在位置の取得ボタンを表示する
map.addControl(new maplibregl.GeolocateControl({positionOptions: {enableHighAccuracy: true},trackUserLocation: true}), 'top-right');
// 左下の尺度を表示する
map.addControl(new maplibregl.ScaleControl() );

// 画面がロードされたら地図にレイヤを追加する
map.on('load', function () {
    // 避難所情報レイヤを追加
    map.addSource('shelter_point', {
        type: 'geojson',
        data: './data/nagasaki_shelter.geojson'
    });

    // スタイルを設定
    map.addLayer({
        'id': 'shelter_point',
        'type': 'circle',
        'source': 'shelter_point',
        'layout': {},
        'paint': {
            'circle-color': '#FF0000',
            'circle-radius': 5
        }   
    });

    // 投稿情報レイヤを追加
    map.addSource('post_info', {
        type: 'geojson',
        data: './data/sample_point.geojson'
    });

    // スタイルを設定
    map.addLayer({
        'id': 'post_info',
        'type': 'circle',
        'source': 'post_info',
        'layout': {},
        'paint': {
            'circle-color': '#008000',
            'circle-radius': 5
        }   
    });
});

// 避難所情報の地物をクリックしたときに、コメントを表示する
map.on('click', 'shelter_point', function (e) {
    console.log("click")
    
    var coordinates = e.features[0].geometry.coordinates.slice();
    var name = e.features[0].properties.name;
     
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
     
    new maplibregl.Popup()
    .setLngLat(coordinates)
    .setHTML(name)
    .addTo(map);
});

// 投稿情報の地物をクリックしたときに、コメントを表示する
map.on('click', 'post_info', function (e) {
    console.log("click")
    
    var coordinates = e.features[0].geometry.coordinates.slice();
    var comment = e.features[0].properties.comment;
     
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
     
    new maplibregl.Popup()
    .setLngLat(coordinates)
    .setHTML(comment)
    .addTo(map);
});

// Change the cursor to a pointer when the mouse is over the places layer.
map.on('mouseenter', 'shelter_point', function () {
    map.getCanvas().style.cursor = 'pointer';
});
     
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'shelter_point', function () {
    map.getCanvas().style.cursor = '';
});

// Change the cursor to a pointer when the mouse is over the places layer.
map.on('mouseenter', 'post_info', function () {
    map.getCanvas().style.cursor = 'pointer';
});
     
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'post_info', function () {
    map.getCanvas().style.cursor = '';
});