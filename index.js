function Init_Globe_Spark() {

    var planetaryjs = window.planetaryjs;

    var canvas = document.getElementById('globe_spark');
    var r = parseInt(canvas.getAttribute("height")) / 2;

    var globe = planetaryjs.planet();

    globe.loadPlugin(planetaryjs.plugins.earth({
        topojson: { file: 'bower_components/planetary.js/dist/world-110m.json' },
        oceans: { fill: '#333' },
        land: { fill: '#EEE' },
        borders: { stroke: '#333' }
    }));

    globe.loadPlugin(Middleware_Autorotate(10));
    globe.loadPlugin(planetaryjs.plugins.pings());
    globe.loadPlugin(planetaryjs.plugins.drag({
        onDragStart: function () {
            this.plugins.autorotate.pause();
        },
        onDragEnd: function () {
            this.plugins.autorotate.resume();
        }
    }));

    globe.projection.scale(r).translate([r, r]);

    globe.draw(canvas);

    setInterval(function () {
        for (var i = 0; i < 10; i++) {
            var lat = Math.random() * 170 - 85;
            var lng = Math.random() * 360 - 180;
            var color = 'red';
            globe.plugins.pings.add(lng, lat, { color: color, ttl: 500, angle: 10 });
        }
    }, 10);
}

function Init_Globe_Normal() { 

    var planetaryjs = window.planetaryjs;

    var canvas = document.getElementById('globe_normal');
    var r = parseInt(canvas.getAttribute("height")) / 2;

    var globe = planetaryjs.planet();

    globe.loadPlugin(planetaryjs.plugins.earth({
        topojson: { file: 'bower_components/planetary.js/dist/world-110m.json' },
        oceans: { fill: '#69F' },
        land: { fill: '#EEE' },
        borders: { stroke: '#69F' }
    }));

    globe.loadPlugin(Middleware_Autorotate(10));
    globe.loadPlugin(planetaryjs.plugins.pings());
    globe.loadPlugin(planetaryjs.plugins.drag({
        onDragStart: function () {
            this.plugins.autorotate.pause();
        },
        onDragEnd: function () {
            this.plugins.autorotate.resume();
        }
    }));

    globe.projection.scale(r).translate([r, r]);

    globe.draw(canvas);

    setInterval(function () {
        var lat = Math.random() * 170 - 85;
        var lng = Math.random() * 360 - 180;
        var color = '#333';
        globe.plugins.pings.add(lng, lat, { color: color, ttl: 5000, angle: 10 });
    }, 500);
    
}

function Middleware_Autorotate(degPerSec) {
    return function (planet) {
        var lastTick = null;
        var paused = false;
        planet.plugins.autorotate = {
            pause: function () { paused = true; },
            resume: function () { paused = false; }
        };
        planet.onDraw(function () {
            if (paused || !lastTick) {
                lastTick = new Date();
            } else {
                var now = new Date();
                var delta = now.getTime() - lastTick.getTime();
                var rotation = planet.projection.rotate();
                rotation[0] += degPerSec * delta / 1000;
                if (rotation[0] >= 180) rotation[0] -= 360;
                planet.projection.rotate(rotation);
                lastTick = now;
            }
        });
    };
}

Init_Globe_Spark();
Init_Globe_Normal();