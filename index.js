(function () {

    var globe = planetaryjs.planet();
    globe.loadPlugin(autorotate(10));
    globe.loadPlugin(planetaryjs.plugins.earth({
        topojson: { file: 'lib/world-110m-withlakes.json' },
        oceans: { fill: '#333' },
        land: { fill: '#EEE' },
        borders: { stroke: '#333' }
    }));
    globe.loadPlugin(lakes({
        fill: '#333'
    }));
    globe.loadPlugin(planetaryjs.plugins.pings());
    globe.loadPlugin(planetaryjs.plugins.zoom({
        scaleExtent: [100, 300]
    }));
    globe.loadPlugin(planetaryjs.plugins.drag({
        onDragStart: function () {
            this.plugins.autorotate.pause();
        },
        onDragEnd: function () {
            this.plugins.autorotate.resume();
        }
    }));
    globe.projection.scale(175).translate([175, 175]).rotate([0, -10, 0]);

    setInterval(function () {
        for (var i = 0; i < 10; i++) {
            var lat = Math.random() * 170 - 85;
            var lng = Math.random() * 360 - 180;
            var color = 'red';
            globe.plugins.pings.add(lng, lat, { color: color, ttl: 500, angle: 10 });
        }
    }, 10);

    var canvas = document.getElementById('globe_quick');
    if (window.devicePixelRatio === 2) {
        canvas.width = 800;
        canvas.height = 800;
        var context = canvas.getContext('2d');
        context.scale(2, 2);
    }
    globe.draw(canvas);

    function autorotate(degPerSec) {
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
                    var delta = now - lastTick;
                    var rotation = planet.projection.rotate();
                    rotation[0] += degPerSec * delta / 1000;
                    if (rotation[0] >= 180) rotation[0] -= 360;
                    planet.projection.rotate(rotation);
                    lastTick = now;
                }
            });
        };
    };

    function lakes(options) {
        options = options || {};
        var lakes = null;

        return function (planet) {
            planet.onInit(function () {
                var world = planet.plugins.topojson.world;
                lakes = topojson.feature(world, world.objects.ne_110m_lakes);
            });

            planet.onDraw(function () {
                planet.withSavedContext(function (context) {
                    context.beginPath();
                    planet.path.context(context)(lakes);
                    context.fillStyle = options.fill || 'black';
                    context.fill();
                });
            });
        };
    };

})();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

(function () {

    var globe = planetaryjs.planet();
    globe.loadPlugin(autorotate(10));
    globe.loadPlugin(planetaryjs.plugins.earth({
        topojson: { file: 'lib/world-110m-withlakes.json' },
        oceans: { fill: '#69F' },
        land: { fill: '#EEE' },
        borders: { stroke: '#69F' }
    }));
    globe.loadPlugin(lakes({
        fill: '#69F'
    }));
    globe.loadPlugin(planetaryjs.plugins.pings());
    globe.loadPlugin(planetaryjs.plugins.zoom({
        scaleExtent: [100, 300]
    }));
    globe.loadPlugin(planetaryjs.plugins.drag({
        onDragStart: function () {
            this.plugins.autorotate.pause();
        },
        onDragEnd: function () {
            this.plugins.autorotate.resume();
        }
    }));
    globe.projection.scale(175).translate([175, 175]).rotate([0, -10, 0]);

    setInterval(function () {
        var lat = Math.random() * 170 - 85;
        var lng = Math.random() * 360 - 180;
        var color = '#333';
        globe.plugins.pings.add(lng, lat, { color: color, ttl: 5000, angle: 10 });
    }, 500);

    var canvas = document.getElementById('globe_slow');
    if (window.devicePixelRatio === 2) {
        canvas.width = 800;
        canvas.height = 800;
        var context = canvas.getContext('2d');
        context.scale(2, 2);
    }
    globe.draw(canvas);

    function autorotate(degPerSec) {
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
                    var delta = now - lastTick;
                    var rotation = planet.projection.rotate();
                    rotation[0] += degPerSec * delta / 1000;
                    if (rotation[0] >= 180) rotation[0] -= 360;
                    planet.projection.rotate(rotation);
                    lastTick = now;
                }
            });
        };
    };

    function lakes(options) {
        options = options || {};
        var lakes = null;

        return function (planet) {
            planet.onInit(function () {
                var world = planet.plugins.topojson.world;
                lakes = topojson.feature(world, world.objects.ne_110m_lakes);
            });

            planet.onDraw(function () {
                planet.withSavedContext(function (context) {
                    context.beginPath();
                    planet.path.context(context)(lakes);
                    context.fillStyle = options.fill || 'black';
                    context.fill();
                });
            });
        };
    };

})();