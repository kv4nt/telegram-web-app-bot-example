var worldArr = [];
var scaleX = 50, scaleY = -50;
var ballPhysics_arr = [];
var hitPhysics_arr = [];
var physicsData = {canvasW: 0, canvasH: 0, currentWorld: 0, ballX: 0, ballY: 0, idleTime: 10, idleTimeCount: 0};
function initPhysics() {
    physicsData.canvasW = canvasW;
    physicsData.canvasH = canvasH;
    var _0x39cdx8 = 0;
    worldArr.push({world: "", paused: true});
    worldArr[_0x39cdx8].world = new p2.World({gravity: [0, -40]});
    var _0x39cdx9 = new p2.ContactMaterial(ballMaterial, pinMaterial, {friction: 0.5, restitution: 0.4});
    worldArr[_0x39cdx8].world.addContactMaterial(_0x39cdx9);
    worldArr[_0x39cdx8].world.on("beginContact", function (_0x39cdxa) {
        var _0x39cdxb = Math.abs(_0x39cdxa.bodyA.velocity[0]) + Math.abs(_0x39cdxa.bodyA.velocity[1]);
        var _0x39cdxc = Math.abs(_0x39cdxa.bodyB.velocity[0]) + Math.abs(_0x39cdxa.bodyB.velocity[1]);
        if (_0x39cdxa.bodyA.contactType === "ball" || _0x39cdxa.bodyB.contactType === "ball") {
            if (_0x39cdxb > 5) {
                playHitSound();
            }
            ;
            if (_0x39cdxc > 5) {
                playHitSound();
            }
        }
        ;
        if (_0x39cdxa.bodyA.contactType == "ball" && _0x39cdxa.bodyB.contactType == "pin") {
            animatePin(_0x39cdxa.bodyB.pinIndex);
        } else {
            if (_0x39cdxa.bodyA.contactType == "pin" && _0x39cdxa.bodyB.contactType == "ball") {
                animatePin(_0x39cdxa.bodyA.pinIndex);
            }
        }
    });
    pausedPhysics(_0x39cdx8, true);
}
var ballMaterial = new p2.Material;
var pinMaterial = new p2.Material;
var ball_group = 1;
var pin_group = 2;
var pin_idle_group = 3;
function createPhysicBall(_0x39cdx15, _0x39cdx16, _0x39cdx17) {
    ballPhysics_arr.push({shape: "", body: "", material: "", property: {radius: _0x39cdx15 / scaleX}, position: [0, 0]});
    var _0x39cdx18 = ballPhysics_arr.length - 1;
    ballPhysics_arr[_0x39cdx18].shape = new p2.Circle(ballPhysics_arr[_0x39cdx18].property);
    ballPhysics_arr[_0x39cdx18].material = ballMaterial;
    ballPhysics_arr[_0x39cdx18].shape.material = ballPhysics_arr[_0x39cdx18].material;
    ballPhysics_arr[_0x39cdx18].body = new p2.Body({mass: 1, position: ballPhysics_arr[_0x39cdx18].position});
    ballPhysics_arr[_0x39cdx18].body.addShape(ballPhysics_arr[_0x39cdx18].shape);
    ballPhysics_arr[_0x39cdx18].body.damping = 0;
    ballPhysics_arr[_0x39cdx18].body.angularDamping = 0;
    ballPhysics_arr[_0x39cdx18].body.position[0] = (_0x39cdx16 - physicsData.canvasW / 2) / scaleX;
    ballPhysics_arr[_0x39cdx18].body.position[1] = (_0x39cdx17 - physicsData.canvasH) / scaleY;
    ballPhysics_arr[_0x39cdx18].body.contactType = "ball";
    if (!gameSettings.ballCollision) {
        ballPhysics_arr[_0x39cdx18].shape.collisionGroup = ball_group;
        ballPhysics_arr[_0x39cdx18].shape.collisionMask = pin_group;
    }
    ;
    worldArr[physicsData.currentWorld].world.addBody(ballPhysics_arr[_0x39cdx18].body);
}
function createPhysicCircle(_0x39cdx15, _0x39cdx16, _0x39cdx17) {
    hitPhysics_arr.push({shape: "", body: "", material: "", property: {radius: _0x39cdx15 / scaleX}, position: [0, 0]});
    var _0x39cdx18 = hitPhysics_arr.length - 1;
    hitPhysics_arr[_0x39cdx18].shape = new p2.Circle(hitPhysics_arr[_0x39cdx18].property);
    hitPhysics_arr[_0x39cdx18].material = pinMaterial;
    hitPhysics_arr[_0x39cdx18].shape.material = hitPhysics_arr[_0x39cdx18].material;
    hitPhysics_arr[_0x39cdx18].body = new p2.Body({mass: 0, position: hitPhysics_arr[_0x39cdx18].position});
    hitPhysics_arr[_0x39cdx18].body.addShape(hitPhysics_arr[_0x39cdx18].shape);
    hitPhysics_arr[_0x39cdx18].body.position[0] = (_0x39cdx16 - physicsData.canvasW / 2) / scaleX;
    hitPhysics_arr[_0x39cdx18].body.position[1] = (_0x39cdx17 - physicsData.canvasH) / scaleY;
    hitPhysics_arr[_0x39cdx18].body.contactType = "pin";
    hitPhysics_arr[_0x39cdx18].body.pinIndex = _0x39cdx18;
    if (!gameSettings.ballCollision) {
        hitPhysics_arr[_0x39cdx18].shape.collisionGroup = pin_group;
        hitPhysics_arr[_0x39cdx18].shape.collisionMask = ball_group;
    }
    ;
    worldArr[physicsData.currentWorld].world.addBody(hitPhysics_arr[_0x39cdx18].body);
}
function setPhysicCircle(_0x39cdx1b, _0x39cdx1c) {
    hitPhysics_arr[_0x39cdx1b].body.collisionResponse = _0x39cdx1c;
}
function removePhysicBall(_0x39cdx1b) {
    worldArr[physicsData.currentWorld].world.removeBody(ballPhysics_arr[_0x39cdx1b].body);
}
function dropPhysicsBall(_0x39cdx1b, _0x39cdx16, _0x39cdx17) {
    ballPhysics_arr[_0x39cdx1b].body.position[0] = (_0x39cdx16 - physicsData.canvasW / 2) / scaleX;
    ballPhysics_arr[_0x39cdx1b].body.position[1] = (_0x39cdx17 - physicsData.canvasH) / scaleY;
    ballPhysics_arr[_0x39cdx1b].body.velocity[0] = 0;
    ballPhysics_arr[_0x39cdx1b].body.velocity[1] = 0;
}
function resetPhysicBall() {
    ballPhysics_arr.length = 0;
}
function setBallVelocity(_0x39cdx21) {
    var _0x39cdx22 = 0;
    if (_0x39cdx21.velocity[0] > 0) {
        _0x39cdx22 = Math.floor(Math.random() * 3 + 0);
    } else {
        if (_0x39cdx21.velocity[0] < 0) {
            _0x39cdx22 = Math.floor(Math.random() * 3 + 0);
            _0x39cdx22 = -_0x39cdx22;
        } else {
            _0x39cdx22 = Math.floor(Math.random() * 5 + -2);
        }
    }
    ;
    _0x39cdx21.velocity[0] += _0x39cdx22;
}
function renderPhysics() {
    for (var _0x39cdx8 = 0; _0x39cdx8 < gameData.ballArray.length; _0x39cdx8++) {
        var _0x39cdx16 = ballPhysics_arr[_0x39cdx8].body.position[0], _0x39cdx17 = ballPhysics_arr[_0x39cdx8].body.position[1];
        var _0x39cdx24 = gameData.ballArray[_0x39cdx8];
        _0x39cdx24.x = physicsData.canvasW / 2 + _0x39cdx16 * scaleX;
        _0x39cdx24.y = physicsData.canvasH + _0x39cdx17 * scaleY;
        var _0x39cdx25 = true;
        if (gameData.dropCon) {
            if (_0x39cdx25) {
                _0x39cdx24.idleMove = getDistanceByValue(_0x39cdx24.x, _0x39cdx24.y, _0x39cdx24.ballX, _0x39cdx24.ballY);
                if (_0x39cdx24.idleMove == 0) {
                    _0x39cdx24.idleTimeCount--;
                    if (_0x39cdx24.idleTimeCount <= 0) {
                        setBallVelocity(ballPhysics_arr[_0x39cdx8].body);
                    }
                } else {
                    _0x39cdx24.idleTimeCount = physicsData.idleTime;
                }
            }
            ;
            _0x39cdx24.ballX = _0x39cdx24.x;
            _0x39cdx24.ballY = _0x39cdx24.y;
            var _0x39cdx26 = 5;
            var _0x39cdx27 = 5;
            var _0x39cdx28 = 0.2;
            if (ballPhysics_arr[_0x39cdx8].body.velocity[0] > _0x39cdx26) {
                ballPhysics_arr[_0x39cdx8].body.velocity[0] -= _0x39cdx28;
            }
            ;
            if (ballPhysics_arr[_0x39cdx8].body.velocity[0] < -_0x39cdx26) {
                ballPhysics_arr[_0x39cdx8].body.velocity[0] += _0x39cdx28;
            }
            ;
            if (ballPhysics_arr[_0x39cdx8].body.velocity[1] > _0x39cdx27) {
                ballPhysics_arr[_0x39cdx8].body.velocity[1] -= _0x39cdx28;
            }
            ;
            if (ballPhysics_arr[_0x39cdx8].body.velocity[1] < -_0x39cdx27) {
                ballPhysics_arr[_0x39cdx8].body.velocity[1] += _0x39cdx28;
            }
        }
    }
}
function pausedPhysics(_0x39cdx1b, _0x39cdx1c) {
    worldArr[0].paused = _0x39cdx1c;
}
function updatePhysics() {
    if (!worldArr[0].paused) {
        worldArr[0].world.step(0.016666666666666666);
        renderPhysics();
    }
}
(function () {
    var _0x39cdx2b;
    var _0x39cdx2c = function () {};
    var _0x39cdx2d = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace", "warn"];
    var _0x39cdx2e = _0x39cdx2d.length;
    var _0x39cdx2f = window.console = window.console || {};
    while (_0x39cdx2e--) {
        _0x39cdx2b = _0x39cdx2d[_0x39cdx2e];
        if (!_0x39cdx2f[_0x39cdx2b]) {
            _0x39cdx2f[_0x39cdx2b] = _0x39cdx2c;
        }
    }
}());
function checkContentHeight(_0x39cdx31) {
    var stageHeight = $(window).height();
    var _0x39cdx33 = stageHeight / 2 - _0x39cdx31.height() / 2;
    return _0x39cdx33;
}
function checkContentWidth(_0x39cdx31) {
    var stageWidth = $(window).width();
    var _0x39cdx36 = stageWidth / 2 - _0x39cdx31.width() / 2;
    return _0x39cdx36;
}
function getDeviceVer() {
    var _0x39cdx38 = navigator.userAgent;
    var _0x39cdx39;
    if (_0x39cdx38.match(/(iPad|iPhone|iPod touch)/)) {
        userOS = "iOS";
        _0x39cdx39 = _0x39cdx38.indexOf("OS ");
    } else {
        if (_0x39cdx38.match(/Android/)) {
            userOS = "Android";
            _0x39cdx39 = _0x39cdx38.indexOf("Android ");
        } else {
            userOS = "unknown";
        }
    }
    ;
    if (userOS === "iOS" && _0x39cdx39 > -1) {
        userOSver = _0x39cdx38.substr(_0x39cdx39 + 3, 3).replace("_", ".");
    } else {
        if (userOS === "Android" && _0x39cdx39 > -1) {
            userOSver = _0x39cdx38.substr(_0x39cdx39 + 8, 3);
        } else {
            userOSver = "unknown";
        }
    }
    ;
    return Number(userOSver);
}
function addCommas(_0x39cdx3b) {
    _0x39cdx3b += "";
    x = _0x39cdx3b.split(".");
    x1 = x[0];
    x2 = x.length > 1 ? "." + x[1] : "";
    var _0x39cdx3c = /(\d+)(\d{3})/;
    while (_0x39cdx3c.test(x1)) {
        x1 = x1.replace(_0x39cdx3c, "$1,$2");
    }
    ;
    return x1 + x2;
}
function shuffle(_0x39cdx3e) {
    var _0x39cdx3f = _0x39cdx3e.length, _0x39cdx40, _0x39cdx41;
    while (0 !== _0x39cdx3f) {
        _0x39cdx41 = Math.floor(Math.random() * _0x39cdx3f);
        _0x39cdx3f -= 1;
        _0x39cdx40 = _0x39cdx3e[_0x39cdx3f];
        _0x39cdx3e[_0x39cdx3f] = _0x39cdx3e[_0x39cdx41];
        _0x39cdx3e[_0x39cdx41] = _0x39cdx40;
    }
    ;
    return _0x39cdx3e;
}
function sortOnObject(_0x39cdx3e, _0x39cdx44, _0x39cdx45) {
    if (_0x39cdx45) {
        _0x39cdx3e.sort(function (_0x39cdx46, _0x39cdx47) {
            var _0x39cdx48 = _0x39cdx46[_0x39cdx44], _0x39cdx49 = _0x39cdx47[_0x39cdx44];
            if (_0x39cdx48 == _0x39cdx49) {
                return 0;
            }
            ;
            return _0x39cdx48 < _0x39cdx49 ? 1 : -1;
        });
    } else {
        _0x39cdx3e.sort(function (_0x39cdx46, _0x39cdx47) {
            var _0x39cdx48 = _0x39cdx46[_0x39cdx44], _0x39cdx49 = _0x39cdx47[_0x39cdx44];
            if (_0x39cdx48 == _0x39cdx49) {
                return 0;
            }
            ;
            return _0x39cdx48 > _0x39cdx49 ? 1 : -1;
        });
    }
    ;
    return _0x39cdx3e;
}
function getDistance(_0x39cdx50, _0x39cdx51) {
    var _0x39cdx52 = _0x39cdx50.x - _0x39cdx51.x;
    var _0x39cdx53 = _0x39cdx50.y - _0x39cdx51.y;
    var _0x39cdx54 = Math.floor(Math.sqrt(_0x39cdx52 * _0x39cdx52 + _0x39cdx53 * _0x39cdx53));
    return _0x39cdx54;
}
function getDistanceByValue(_0x39cdx56, _0x39cdx57, _0x39cdx58, _0x39cdx59) {
    var _0x39cdx52 = _0x39cdx56 - _0x39cdx58;
    var _0x39cdx53 = _0x39cdx57 - _0x39cdx59;
    var _0x39cdx54 = Math.floor(Math.sqrt(_0x39cdx52 * _0x39cdx52 + _0x39cdx53 * _0x39cdx53));
    return _0x39cdx54;
}
function getDirectionByValue(_0x39cdx56, _0x39cdx57, _0x39cdx58, _0x39cdx59) {
    var _0x39cdx5b = 180 / Math.PI;
    var _0x39cdx5c = -Math.atan2(_0x39cdx58 - _0x39cdx56, _0x39cdx59 - _0x39cdx57) * _0x39cdx5b;
    return _0x39cdx5c + 90;
}
function addCommas(_0x39cdx3b) {
    _0x39cdx3b += "";
    x = _0x39cdx3b.split(".");
    x1 = x[0];
    x2 = x.length > 1 ? "." + x[1] : "";
    var _0x39cdx3c = /(\d+)(\d{3})/;
    while (_0x39cdx3c.test(x1)) {
        x1 = x1.replace(_0x39cdx3c, "$1,$2");
    }
    ;
    return x1 + x2;
}
function unique(_0x39cdx5e) {
    var _0x39cdx5f = [];
    $.each(_0x39cdx5e, function (_0x39cdx60, _0x39cdx61) {
        if ($.inArray(_0x39cdx61, _0x39cdx5f) == -1) {
            _0x39cdx5f.push(_0x39cdx61);
        }
    });
    return _0x39cdx5f;
}
function swapArray(_0x39cdx63, _0x39cdx64, _0x39cdx65) {
    var _0x39cdx66 = _0x39cdx63[_0x39cdx64];
    _0x39cdx63[_0x39cdx64] = _0x39cdx63[_0x39cdx65];
    _0x39cdx63[_0x39cdx65] = _0x39cdx66;
}
function getAnglePosition(_0x39cdx16, _0x39cdx17, _0x39cdx15, _0x39cdx68) {
    var _0x39cdx69 = {x: 0, y: 0};
    _0x39cdx69.x = _0x39cdx16 + _0x39cdx15 * Math.cos(_0x39cdx68 * Math.PI / 180);
    _0x39cdx69.y = _0x39cdx17 + _0x39cdx15 * Math.sin(_0x39cdx68 * Math.PI / 180);
    return _0x39cdx69;
}
function getCenterPosition(_0x39cdx6b, _0x39cdx6c, _0x39cdx6d, _0x39cdx6e) {
    var _0x39cdx69 = {x: 0, y: 0};
    _0x39cdx69.x = (_0x39cdx6b + _0x39cdx6d) / 2;
    _0x39cdx69.y = (_0x39cdx6c + _0x39cdx6e) / 2;
    return _0x39cdx69;
}
var enableDesktopSound = true;
var enableMobileSound = true;
var soundOn;
var soundMute = false;
var musicMute = false;
$.sound = {};
var soundID = 0;
var soundPushArr = [];
var soundLoopPushArr = [];
var musicPushArr = [];
function playSound(_0x39cdx79, _0x39cdx7a) {
    if (soundOn) {
        var _0x39cdx7b = soundID;
        soundPushArr.push(_0x39cdx7b);
        soundID++;
        var _0x39cdx7c = _0x39cdx7a == undefined ? 1 : _0x39cdx7a;
        $.sound[_0x39cdx7b] = createjs.Sound.play(_0x39cdx79);
        $.sound[_0x39cdx7b].defaultVol = _0x39cdx7c;
        setSoundVolume(_0x39cdx7b);
        $.sound[_0x39cdx7b].removeAllEventListeners();
        $.sound[_0x39cdx7b].addEventListener("complete", function () {
            var _0x39cdx7d = soundPushArr.indexOf(_0x39cdx7b);
            if (_0x39cdx7d != -1) {
                soundPushArr.splice(_0x39cdx7d, 1);
            }
        });
    }
}
function playSoundLoop(_0x39cdx79) {
    if (soundOn) {
        if ($.sound[_0x39cdx79] == null) {
            soundLoopPushArr.push(_0x39cdx79);
            $.sound[_0x39cdx79] = createjs.Sound.play(_0x39cdx79);
            $.sound[_0x39cdx79].defaultVol = 1;
            setSoundLoopVolume(_0x39cdx79);
            $.sound[_0x39cdx79].removeAllEventListeners();
            $.sound[_0x39cdx79].addEventListener("complete", function () {
                $.sound[_0x39cdx79].play();
            });
        }
    }
}
function toggleSoundLoop(_0x39cdx79, _0x39cdx1c) {
    if (soundOn) {
        if ($.sound[_0x39cdx79] != null) {
            if (_0x39cdx1c) {
                $.sound[_0x39cdx79].play();
            } else {
                $.sound[_0x39cdx79].paused = true;
            }
        }
    }
}
function stopSoundLoop(_0x39cdx79) {
    if (soundOn) {
        if ($.sound[_0x39cdx79] != null) {
            $.sound[_0x39cdx79].stop();
            $.sound[_0x39cdx79] = null;
            var _0x39cdx81 = soundLoopPushArr.indexOf(_0x39cdx79);
            if (_0x39cdx81 != -1) {
                soundLoopPushArr.splice(_0x39cdx81, 1);
            }
        }
    }
}
function playMusicLoop(_0x39cdx79) {
    if (soundOn) {
        if ($.sound[_0x39cdx79] == null) {
            musicPushArr.push(_0x39cdx79);
            $.sound[_0x39cdx79] = createjs.Sound.play(_0x39cdx79);
            $.sound[_0x39cdx79].defaultVol = 1;
            setMusicVolume(_0x39cdx79);
            $.sound[_0x39cdx79].removeAllEventListeners();
            $.sound[_0x39cdx79].addEventListener("complete", function () {
                $.sound[_0x39cdx79].play();
            });
        }
    }
}
function toggleMusicLoop(_0x39cdx79, _0x39cdx1c) {
    if (soundOn) {
        if ($.sound[_0x39cdx79] != null) {
            if (_0x39cdx1c) {
                $.sound[_0x39cdx79].play();
            } else {
                $.sound[_0x39cdx79].paused = true;
            }
        }
    }
}
function stopMusicLoop(_0x39cdx79) {
    if (soundOn) {
        if ($.sound[_0x39cdx79] != null) {
            $.sound[_0x39cdx79].stop();
            $.sound[_0x39cdx79] = null;
            var _0x39cdx81 = musicPushArr.indexOf(_0x39cdx79);
            if (_0x39cdx81 != -1) {
                musicPushArr.splice(_0x39cdx81, 1);
            }
        }
    }
}
function stopSound() {
    createjs.Sound.stop();
}
function toggleSoundInMute(_0x39cdx1c) {
    if (soundOn) {
        soundMute = _0x39cdx1c;
        for (var _0x39cdx8 = 0; _0x39cdx8 < soundPushArr.length; _0x39cdx8++) {
            setSoundVolume(soundPushArr[_0x39cdx8]);
        }
        ;
        for (var _0x39cdx8 = 0; _0x39cdx8 < soundLoopPushArr.length; _0x39cdx8++) {
            setSoundLoopVolume(soundLoopPushArr[_0x39cdx8]);
        }
        ;
        setAudioVolume();
    }
}
function toggleMusicInMute(_0x39cdx1c) {
    if (soundOn) {
        musicMute = _0x39cdx1c;
        for (var _0x39cdx8 = 0; _0x39cdx8 < musicPushArr.length; _0x39cdx8++) {
            setMusicVolume(musicPushArr[_0x39cdx8]);
        }
    }
}
function setSoundVolume(_0x39cdx89, _0x39cdx7a) {
    if (soundOn) {
        var _0x39cdx8a = soundPushArr.indexOf(_0x39cdx89);
        if (_0x39cdx8a != -1) {
            var _0x39cdx7c = _0x39cdx7a == undefined ? $.sound[soundPushArr[_0x39cdx8a]].defaultVol : _0x39cdx7a;
            var _0x39cdx8b = soundMute == false ? _0x39cdx7c : 0;
            $.sound[soundPushArr[_0x39cdx8a]].volume = _0x39cdx8b;
            $.sound[soundPushArr[_0x39cdx8a]].defaultVol = _0x39cdx7c;
        }
    }
}
function setSoundLoopVolume(_0x39cdx8d, _0x39cdx7a) {
    if (soundOn) {
        var _0x39cdx81 = soundLoopPushArr.indexOf(_0x39cdx8d);
        if (_0x39cdx81 != -1) {
            var _0x39cdx7c = _0x39cdx7a == undefined ? $.sound[soundLoopPushArr[_0x39cdx81]].defaultVol : _0x39cdx7a;
            var _0x39cdx8b = soundMute == false ? _0x39cdx7c : 0;
            $.sound[soundLoopPushArr[_0x39cdx81]].volume = _0x39cdx8b;
            $.sound[soundLoopPushArr[_0x39cdx81]].defaultVol = _0x39cdx7c;
        }
    }
}
function setMusicVolume(_0x39cdx8d, _0x39cdx7a) {
    if (soundOn) {
        var _0x39cdx8f = musicPushArr.indexOf(_0x39cdx8d);
        if (_0x39cdx8f != -1) {
            var _0x39cdx7c = _0x39cdx7a == undefined ? $.sound[musicPushArr[_0x39cdx8f]].defaultVol : _0x39cdx7a;
            var _0x39cdx8b = musicMute == false ? _0x39cdx7c : 0;
            $.sound[musicPushArr[_0x39cdx8f]].volume = _0x39cdx8b;
            $.sound[musicPushArr[_0x39cdx8f]].defaultVol = _0x39cdx7c;
        }
    }
}
var audioFile = null;
function playAudio(_0x39cdx92, _0x39cdx93) {
    if (soundOn) {
        if (audioFile == null) {
            audioFile = createjs.Sound.play(_0x39cdx92);
            setAudioVolume();
            audioFile.removeAllEventListeners();
            audioFile.addEventListener("complete", function (_0x39cdx94) {
                audioFile = null;
                if (typeof _0x39cdx93 == "function") {
                    _0x39cdx93();
                }
            });
        }
    }
}
function stopAudio() {
    if (soundOn) {
        if (audioFile != null) {
            audioFile.stop();
            audioFile = null;
        }
    }
}
function setAudioVolume() {
    if (soundOn) {
        if (audioFile != null) {
            var _0x39cdx8b = soundMute == false ? 1 : 0;
            audioFile.volume = _0x39cdx8b;
        }
    }
}
var stage;
var canvasW = 0;
var canvasH = 0;
function initGameCanvas(_0x39cdx9b, _0x39cdx9c) {
    var _0x39cdx9d = document.getElementById("gameCanvas");
    _0x39cdx9d.width = _0x39cdx9b;
    _0x39cdx9d.height = _0x39cdx9c;
    canvasW = _0x39cdx9b;
    canvasH = _0x39cdx9c;
    stage = new createjs.Stage("gameCanvas");
    createjs.Touch.enable(stage);
    stage.enableMouseOver(20);
    stage.mouseMoveOutside = true;
    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener("tick", tick);
}
var guide = false;
var canvasContainer, mainContainer, gameContainer, resultContainer, confirmContainer;
var guideline, bg, logo, buttonStart, buttonRestart, buttonFacebook, buttonTwitter, buttonWhatsapp, buttonFullscreen, buttonSoundOn, buttonSoundOff;
$.pin = {};
$.move = {};
$.prize = {};
function buildGameCanvas() {
    canvasContainer = new createjs.Container;
    mainContainer = new createjs.Container;
    gameContainer = new createjs.Container;
    stateContainer = new createjs.Container;
    plinkoContainer = new createjs.Container;
    plinkoItemContainer = new createjs.Container;
    plinkoPrizesContainer = new createjs.Container;
    plinkoWinContainer = new createjs.Container;
    plinkoBallsContainer = new createjs.Container;
    plinkoGuideContainer = new createjs.Container;
    historyContainer = new createjs.Container;
    statsCreditContainer = new createjs.Container;
    statsBetChanceContainer = new createjs.Container;
    statsRiskContainer = new createjs.Container;
    statsRowsContainer = new createjs.Container;
    statsBallsContainer = new createjs.Container;
    statsPlayContainer = new createjs.Container;
    resultContainer = new createjs.Container;
    confirmContainer = new createjs.Container;
    optionsContainer = new createjs.Container;
    bg = new createjs.Bitmap(loader.getResult("background"));
    bgP = new createjs.Bitmap(loader.getResult("backgroundP"));
    logo = new createjs.Bitmap(loader.getResult("logo"));
    logoP = new createjs.Bitmap(loader.getResult("logoP"));
    buttonStart = new createjs.Bitmap(loader.getResult("buttonStart"));
    centerReg(buttonStart);
    buttonStart.x = canvasW / 2;
    buttonStart.y = canvasH / 100 * 65;
    itemStatCredit = new createjs.Bitmap(loader.getResult("itemStatDisplay"));
    statCreditLabelTxt = new createjs.Text;
    statCreditLabelTxt.font = "20px azonixregular";
    statCreditLabelTxt.color = "#fff";
    statCreditLabelTxt.textAlign = "left";
    statCreditLabelTxt.textBaseline = "alphabetic";
    statCreditLabelTxt.text = textDisplay.creditLabel;
    statCreditLabelTxt.x = 20;
    statCreditLabelTxt.y = -5;
    statCreditTxt = new createjs.Text;
    statCreditTxt.font = "30px azonixregular";
    statCreditTxt.color = "#fff";
    statCreditTxt.textAlign = "left";
    statCreditTxt.textBaseline = "alphabetic";
    statCreditTxt.text = textDisplay.creditLabel;
    statCreditTxt.x = 20;
    statCreditTxt.y = 33;
    statsCreditContainer.addChild(itemStatCredit, statCreditLabelTxt, statCreditTxt);
    itemstatBetChance = new createjs.Bitmap(loader.getResult("itemStatDisplay"));
    statBetChanceLabelTxt = new createjs.Text;
    statBetChanceLabelTxt.font = "20px azonixregular";
    statBetChanceLabelTxt.color = "#fff";
    statBetChanceLabelTxt.textAlign = "left";
    statBetChanceLabelTxt.textBaseline = "alphabetic";
    statBetChanceLabelTxt.text = textDisplay.betLabel;
    statBetChanceLabelTxt.x = 20;
    statBetChanceLabelTxt.y = -5;
    statBetChanceTxt = new createjs.Text;
    statBetChanceTxt.font = "30px azonixregular";
    statBetChanceTxt.color = "#fff";
    statBetChanceTxt.textAlign = "left";
    statBetChanceTxt.textBaseline = "alphabetic";
    statBetChanceTxt.text = textDisplay.creditLabel;
    statBetChanceTxt.x = 20;
    statBetChanceTxt.y = 33;
    buttonBetHalf = new createjs.Bitmap(loader.getResult("buttonBetHalf"));
    centerReg(buttonBetHalf);
    buttonBetMultiply = new createjs.Bitmap(loader.getResult("buttonBetMultiply"));
    centerReg(buttonBetMultiply);
    buttonBetHalf.x = 160;
    buttonBetMultiply.x = 205;
    buttonBetMultiply.y = buttonBetHalf.y = 20;
    statsBetChanceContainer.addChild(itemstatBetChance, statBetChanceLabelTxt, statBetChanceTxt, buttonBetHalf, buttonBetMultiply);
    itemStatRisk = new createjs.Bitmap(loader.getResult("itemStatDisplay"));
    statRiskLabelTxt = new createjs.Text;
    statRiskLabelTxt.font = "20px azonixregular";
    statRiskLabelTxt.color = "#fff";
    statRiskLabelTxt.textAlign = "left";
    statRiskLabelTxt.textBaseline = "alphabetic";
    statRiskLabelTxt.text = textDisplay.riskLabel;
    statRiskLabelTxt.x = 20;
    statRiskLabelTxt.y = -5;
    statRiskTxt = new createjs.Text;
    statRiskTxt.font = "30px azonixregular";
    statRiskTxt.color = "#fff";
    statRiskTxt.textAlign = "center";
    statRiskTxt.textBaseline = "alphabetic";
    statRiskTxt.text = textDisplay.creditLabel;
    statRiskTxt.x = 120;
    statRiskTxt.y = 33;
    buttonRiskL = new createjs.Bitmap(loader.getResult("buttonArrowL"));
    centerReg(buttonRiskL);
    buttonRiskR = new createjs.Bitmap(loader.getResult("buttonArrowR"));
    centerReg(buttonRiskR);
    buttonRiskR.x = 205;
    buttonRiskL.x = 30;
    buttonRiskL.y = buttonRiskR.y = 20;
    statsRiskContainer.addChild(itemStatRisk, statRiskLabelTxt, statRiskTxt, buttonRiskL, buttonRiskR);
    itemStatRows = new createjs.Bitmap(loader.getResult("itemStatDisplay"));
    statRowsLabelTxt = new createjs.Text;
    statRowsLabelTxt.font = "20px azonixregular";
    statRowsLabelTxt.color = "#fff";
    statRowsLabelTxt.textAlign = "left";
    statRowsLabelTxt.textBaseline = "alphabetic";
    statRowsLabelTxt.text = textDisplay.rowsLabel;
    statRowsLabelTxt.x = 20;
    statRowsLabelTxt.y = -5;
    statRowsTxt = new createjs.Text;
    statRowsTxt.font = "30px azonixregular";
    statRowsTxt.color = "#fff";
    statRowsTxt.textAlign = "left";
    statRowsTxt.textBaseline = "alphabetic";
    statRowsTxt.text = textDisplay.creditLabel;
    statRowsTxt.x = 20;
    statRowsTxt.y = 33;
    itemRowsDragBar = new createjs.Bitmap(loader.getResult("itemDragBar"));
    centerReg(itemRowsDragBar);
    itemRowsDrag = new createjs.Bitmap(loader.getResult("itemDrag"));
    centerReg(itemRowsDrag);
    itemRowsDragBar.x = 150;
    itemRowsDrag.x = 100;
    itemRowsDrag.y = 20;
    itemRowsDragBar.y = 25;
    statsRowsContainer.addChild(itemStatRows, statRowsLabelTxt, statRowsTxt, itemRowsDragBar, itemRowsDrag);
    itemStatBalls = new createjs.Bitmap(loader.getResult("itemStatDisplay"));
    statBallsLabelTxt = new createjs.Text;
    statBallsLabelTxt.font = "20px azonixregular";
    statBallsLabelTxt.color = "#fff";
    statBallsLabelTxt.textAlign = "left";
    statBallsLabelTxt.textBaseline = "alphabetic";
    statBallsLabelTxt.text = textDisplay.ballsLabel;
    statBallsLabelTxt.x = 20;
    statBallsLabelTxt.y = -5;
    statBallsTxt = new createjs.Text;
    statBallsTxt.font = "30px azonixregular";
    statBallsTxt.color = "#fff";
    statBallsTxt.textAlign = "left";
    statBallsTxt.textBaseline = "alphabetic";
    statBallsTxt.text = textDisplay.creditLabel;
    statBallsTxt.x = 20;
    statBallsTxt.y = 33;
    itemBallsDragBar = new createjs.Bitmap(loader.getResult("itemDragBar"));
    centerReg(itemBallsDragBar);
    itemBallsDrag = new createjs.Bitmap(loader.getResult("itemDrag"));
    centerReg(itemBallsDrag);
    itemBallsDragBar.x = 150;
    itemBallsDrag.x = 100;
    itemBallsDrag.y = 20;
    itemBallsDragBar.y = 25;
    statsBallsContainer.addChild(itemStatBalls, statBallsLabelTxt, statBallsTxt, itemBallsDragBar, itemBallsDrag);
    buttonBlank = new createjs.Bitmap(loader.getResult("buttonBlank"));
    buttonBlankTxt = new createjs.Text;
    buttonBlankTxt.font = "30px azonixregular";
    buttonBlankTxt.color = "#fff";
    buttonBlankTxt.textAlign = "center";
    buttonBlankTxt.textBaseline = "alphabetic";
    buttonBlankTxt.text = textDisplay.play;
    buttonBlankTxt.x = 120;
    buttonBlankTxt.y = 33;
    statsPlayContainer.addChild(buttonBlank, buttonBlankTxt);
    statusTxt = new createjs.Text;
    statusTxt.font = "30px azonixregular";
    statusTxt.color = "#fff";
    statusTxt.textAlign = "center";
    statusTxt.textBaseline = "alphabetic";
    statusTxt.text = "";
    statusTxt.y = -10;
    itemPlinko = new createjs.Bitmap(loader.getResult("itemPlinko"));
    centerReg(itemPlinko);
    itemPlinkoP = new createjs.Bitmap(loader.getResult("itemPlinkoP"));
    centerReg(itemPlinkoP);
    itemResult = new createjs.Bitmap(loader.getResult("itemResult"));
    itemResultP = new createjs.Bitmap(loader.getResult("itemResultP"));
    resultShareTxt = new createjs.Text;
    resultShareTxt.font = "20px azonixregular";
    resultShareTxt.color = "#A00D49";
    resultShareTxt.textAlign = "center";
    resultShareTxt.textBaseline = "alphabetic";
    resultShareTxt.text = textDisplay.share;
    resultTitleTxt = new createjs.Text;
    resultTitleTxt.font = "50px azonixregular";
    resultTitleTxt.color = "#fff";
    resultTitleTxt.textAlign = "center";
    resultTitleTxt.textBaseline = "alphabetic";
    resultTitleTxt.text = textDisplay.resultTitle;
    resultDescTxt = new createjs.Text;
    resultDescTxt.font = "30px azonixregular";
    resultDescTxt.color = "#fff";
    resultDescTxt.textAlign = "center";
    resultDescTxt.textBaseline = "alphabetic";
    resultDescTxt.text = textDisplay.resultDesc;
    resultScoreTxt = new createjs.Text;
    resultScoreTxt.font = "80px azonixregular";
    resultScoreTxt.color = "#fff";
    resultScoreTxt.textAlign = "center";
    resultScoreTxt.textBaseline = "alphabetic";
    buttonFacebook = new createjs.Bitmap(loader.getResult("buttonFacebook"));
    buttonTwitter = new createjs.Bitmap(loader.getResult("buttonTwitter"));
    buttonWhatsapp = new createjs.Bitmap(loader.getResult("buttonWhatsapp"));
    centerReg(buttonFacebook);
    createHitarea(buttonFacebook);
    centerReg(buttonTwitter);
    createHitarea(buttonTwitter);
    centerReg(buttonWhatsapp);
    createHitarea(buttonWhatsapp);
    buttonContinue = new createjs.Bitmap(loader.getResult("buttonContinue"));
    centerReg(buttonContinue);
    buttonFullscreen = new createjs.Bitmap(loader.getResult("buttonFullscreen"));
    centerReg(buttonFullscreen);
    buttonSoundOn = new createjs.Bitmap(loader.getResult("buttonSoundOn"));
    centerReg(buttonSoundOn);
    buttonSoundOff = new createjs.Bitmap(loader.getResult("buttonSoundOff"));
    centerReg(buttonSoundOff);
    buttonSoundOn.visible = false;
    buttonExit = new createjs.Bitmap(loader.getResult("buttonExit"));
    centerReg(buttonExit);
    buttonSettings = new createjs.Bitmap(loader.getResult("buttonSettings"));
    centerReg(buttonSettings);
    createHitarea(buttonFullscreen);
    createHitarea(buttonSoundOn);
    createHitarea(buttonSoundOff);
    createHitarea(buttonExit);
    createHitarea(buttonSettings);
    itemExit = new createjs.Bitmap(loader.getResult("itemExit"));
    itemExitP = new createjs.Bitmap(loader.getResult("itemExitP"));
    buttonConfirm = new createjs.Bitmap(loader.getResult("buttonConfirm"));
    centerReg(buttonConfirm);
    buttonCancel = new createjs.Bitmap(loader.getResult("buttonCancel"));
    centerReg(buttonCancel);
    exitTitleTxt = new createjs.Text;
    exitTitleTxt.font = "50px azonixregular";
    exitTitleTxt.color = "#fff";
    exitTitleTxt.textAlign = "center";
    exitTitleTxt.textBaseline = "alphabetic";
    exitTitleTxt.text = textDisplay.exitTitle;
    popDescTxt = new createjs.Text;
    popDescTxt.font = "30px azonixregular";
    popDescTxt.lineHeight = 35;
    popDescTxt.color = "#fff";
    popDescTxt.textAlign = "center";
    popDescTxt.textBaseline = "alphabetic";
    popDescTxt.text = textDisplay.exitMessage;
    confirmContainer.addChild(itemExit, itemExitP, exitTitleTxt, popDescTxt, buttonConfirm, buttonCancel);
    confirmContainer.visible = false;
    if (guide) {
        guideline = new createjs.Shape;
        guideline.graphics.setStrokeStyle(2).beginStroke("red").drawRect((stageW - contentW) / 2, (stageH - contentH) / 2, contentW, contentH);
    }
    ;
    mainContainer.addChild(logo, logoP, buttonStart);
    stateContainer.addChild(statusTxt);
    plinkoContainer.addChild(plinkoGuideContainer, plinkoItemContainer, stateContainer, plinkoBallsContainer, plinkoPrizesContainer, plinkoWinContainer);
    gameContainer.addChild(itemPlinko, itemPlinkoP, plinkoContainer, statsCreditContainer, statsBetChanceContainer, statsRiskContainer, statsRowsContainer, statsBallsContainer, statsPlayContainer, historyContainer);
    resultContainer.addChild(itemResult, itemResultP, resultShareTxt, resultTitleTxt, resultScoreTxt, resultDescTxt, buttonContinue);
    optionsContainer.addChild(buttonExit, buttonFullscreen, buttonSoundOn, buttonSoundOff);
    optionsContainer.visible = false;
    if (shareEnable) {
        resultContainer.addChild(buttonFacebook, buttonTwitter, buttonWhatsapp);
    }
    ;
    canvasContainer.addChild(bg, bgP, mainContainer, gameContainer, resultContainer, confirmContainer, optionsContainer, buttonSettings, guideline);
    stage.addChild(canvasContainer);
    changeViewport(viewport.isLandscape);
    resizeCanvas();
}
function changeViewport(_0x39cdxb1) {
    if (_0x39cdxb1) {
        stageW = landscapeSize.w;
        stageH = landscapeSize.h;
        contentW = landscapeSize.cW;
        contentH = landscapeSize.cH;
    } else {
        stageW = portraitSize.w;
        stageH = portraitSize.h;
        contentW = portraitSize.cW;
        contentH = portraitSize.cH;
    }
    ;
    gameCanvas.width = stageW;
    gameCanvas.height = stageH;
    canvasW = stageW;
    canvasH = stageH;
    changeCanvasViewport();
}
function changeCanvasViewport() {
    if (canvasContainer != undefined) {
        if (viewport.isLandscape) {
            bg.visible = true;
            bgP.visible = false;
            logo.visible = true;
            logoP.visible = false;
            buttonStart.x = canvasW / 2;
            buttonStart.y = canvasH / 100 * 77;
            itemResult.visible = true;
            itemResultP.visible = false;
            buttonFacebook.x = canvasW / 100 * 43;
            buttonFacebook.y = canvasH / 100 * 58;
            buttonTwitter.x = canvasW / 2;
            buttonTwitter.y = canvasH / 100 * 58;
            buttonWhatsapp.x = canvasW / 100 * 57;
            buttonWhatsapp.y = canvasH / 100 * 58;
            buttonContinue.x = canvasW / 2;
            buttonContinue.y = canvasH / 100 * 75;
            resultShareTxt.x = canvasW / 2;
            resultShareTxt.y = canvasH / 100 * 52;
            resultDescTxt.x = canvasW / 2;
            resultDescTxt.y = canvasH / 100 * 38;
            resultScoreTxt.x = canvasW / 2;
            resultScoreTxt.y = canvasH / 100 * 47;
            resultTitleTxt.x = canvasW / 2;
            resultTitleTxt.y = canvasH / 100 * 29;
            itemExit.visible = true;
            itemExitP.visible = false;
            buttonConfirm.x = canvasW / 2 + 110;
            buttonConfirm.y = canvasH / 100 * 75;
            buttonCancel.x = canvasW / 2 - 110;
            buttonCancel.y = canvasH / 100 * 75;
            popDescTxt.x = canvasW / 2;
            popDescTxt.y = canvasH / 100 * 47;
            exitTitleTxt.x = canvasW / 2;
            exitTitleTxt.y = canvasH / 100 * 29;
        } else {
            bg.visible = false;
            bgP.visible = true;
            logo.visible = false;
            logoP.visible = true;
            buttonStart.x = canvasW / 2;
            buttonStart.y = canvasH / 100 * 70;
            itemResult.visible = false;
            itemResultP.visible = true;
            buttonFacebook.x = canvasW / 100 * 39;
            buttonFacebook.y = canvasH / 100 * 57;
            buttonTwitter.x = canvasW / 2;
            buttonTwitter.y = canvasH / 100 * 57;
            buttonWhatsapp.x = canvasW / 100 * 61;
            buttonWhatsapp.y = canvasH / 100 * 57;
            buttonContinue.x = canvasW / 2;
            buttonContinue.y = canvasH / 100 * 70;
            resultShareTxt.x = canvasW / 2;
            resultShareTxt.y = canvasH / 100 * 52;
            resultDescTxt.x = canvasW / 2;
            resultDescTxt.y = canvasH / 100 * 41;
            resultScoreTxt.x = canvasW / 2;
            resultScoreTxt.y = canvasH / 100 * 48;
            resultTitleTxt.x = canvasW / 2;
            resultTitleTxt.y = canvasH / 100 * 34;
            itemExit.visible = false;
            itemExitP.visible = true;
            buttonConfirm.x = canvasW / 2 - 110;
            buttonConfirm.y = canvasH / 100 * 68;
            buttonCancel.x = canvasW / 2 + 110;
            buttonCancel.y = canvasH / 100 * 68;
            popDescTxt.x = canvasW / 2;
            popDescTxt.y = canvasH / 100 * 49;
            exitTitleTxt.x = canvasW / 2;
            exitTitleTxt.y = canvasH / 100 * 34;
        }
    }
}
function resizeCanvas() {
    if (canvasContainer != undefined) {
        buttonSettings.x = canvasW - offset.x - 60;
        buttonSettings.y = offset.y + 60;
        var _0x39cdxb4 = 105;
        var _0x39cdxb5 = 0;
        if (curPage != "game") {
            buttonExit.visible = false;
            buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
            buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y + _0x39cdxb4;
            buttonSoundOn.x = buttonSoundOff.x;
            buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y + _0x39cdxb4;
            if (typeof buttonMusicOn != "undefined") {
                buttonMusicOn.x = buttonMusicOff.x = buttonSettings.x;
                buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y + _0x39cdxb4 * 2;
                buttonMusicOn.x = buttonMusicOff.x;
                buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y + _0x39cdxb4 * 2;
                _0x39cdxb5 = 2;
            } else {
                _0x39cdxb5 = 1;
            }
            ;
            buttonFullscreen.x = buttonSettings.x;
            buttonFullscreen.y = buttonSettings.y + _0x39cdxb4 * (_0x39cdxb5 + 1);
        } else {
            buttonExit.visible = true;
            buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
            buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y + _0x39cdxb4;
            buttonSoundOn.x = buttonSoundOff.x;
            buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y + _0x39cdxb4;
            if (typeof buttonMusicOn != "undefined") {
                buttonMusicOn.x = buttonMusicOff.x = buttonSettings.x;
                buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y + _0x39cdxb4 * 2;
                buttonMusicOn.x = buttonMusicOff.x;
                buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y + _0x39cdxb4 * 2;
                _0x39cdxb5 = 2;
            } else {
                _0x39cdxb5 = 1;
            }
            ;
            buttonFullscreen.x = buttonSettings.x;
            buttonFullscreen.y = buttonSettings.y + _0x39cdxb4 * (_0x39cdxb5 + 1);
            buttonExit.x = buttonSettings.x;
            buttonExit.y = buttonSettings.y + _0x39cdxb4 * (_0x39cdxb5 + 2);
        }
        ;
        resizeGameLayout();
    }
}
function removeGameCanvas() {
    stage.autoClear = true;
    stage.removeAllChildren();
    stage.update();
    createjs.Ticker.removeEventListener("tick", tick);
    createjs.Ticker.removeEventListener("tick", stage);
}
function tick(_0x39cdx94) {
    updateGame();
    stage.update(_0x39cdx94);
}
function centerReg(_0x39cdxb9) {
    _0x39cdxb9.regX = _0x39cdxb9.image.naturalWidth / 2;
    _0x39cdxb9.regY = _0x39cdxb9.image.naturalHeight / 2;
}
function createHitarea(_0x39cdxb9) {
    _0x39cdxb9.hitArea = new createjs.Shape((new createjs.Graphics).beginFill("#000").drawRect(0, 0, _0x39cdxb9.image.naturalWidth, _0x39cdxb9.image.naturalHeight));
}
var gameSettings = {enableFixedResult: false, enablePercentage: false, ballCollision: true, gamePlayType: false, credit: 1e3, chances: 100, chancesPoint: 10, minBet: 10, maxBet: 1e3, maxBalls: 100, nextBallDelay: 0.4, history: 10, board: {size: 45, ballSize: 12, pinSize: 5, pinColor: "#fff", pinMoveColor: "#FFBF00", startPin: 3, notiFontSize: 22, notiColor: ["#13BC5B", "#CC0D0D"]}, rows: [{total: 8, even: false, prizes: [{value: [0.5, 0.4, 0.2], text: ["0.5x", "0.4x", "0.2x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#FFBF00", bgWinColor: "#F4A800", percent: 0}, {value: [1, 0.7, 0.3], text: ["1x", "0.7x", "0.3x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#EF7C11", bgWinColor: "#FC7E15", percent: 0}, {value: [1.1, 1.3, 1.5], text: ["1.1x", "1.3x", "1.5x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#EF521E", bgWinColor: "#FF4A1A", percent: 0}, {value: [2.1, 3, 4], text: ["2.1x", "3x", "4x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#EF282C", bgWinColor: "#FC1521", percent: 0}, {value: [5.6, 13, 29], text: ["5.6x", "13x", "29x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#ED0000", bgWinColor: "#FF0000", percent: 0}]}, {total: 9, even: true, prizes: [{value: [0.7, 0.5, 0.2], text: ["0.5x", "0.5x", "0.2x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#FFBF00", bgWinColor: "#F4A800", percent: 0}, {value: [1, 0.9, 0.6], text: ["1x", "0.9x", "0.6x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#EF7C11", bgWinColor: "#FC7E15", percent: 0}, {value: [1.6, 1.7, 2], text: ["1.6x", "1.7x", "2x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#EF521E", bgWinColor: "#FF4A1A", percent: 0}, {value: [2, 4, 7], text: ["2x", "4x", "7x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#EF282C", bgWinColor: "#FC1521", percent: 0}, {value: [5.6, 18, 43], text: ["5.6x", "18x", "43x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#ED0000", bgWinColor: "#FF0000", percent: 0}]}, {total: 10, even: false, prizes: [{value: [0.5, 0.4, 0.2], text: ["0.5x", "0.4x", "0.2x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#FFBF00", bgWinColor: "#F4A800", percent: 0}, {value: [1, 0.6, 0.3], text: ["1x", "0.6x", "0.3x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#EF7C11", bgWinColor: "#FC7E15", percent: 0}, {value: [1.1, 1.4, 0.9], text: ["1.1x", "1.4x", "0.9x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#EF521E", bgWinColor: "#FF4A1A", percent: 0}, {value: [1.4, 2, 3], text: ["1.4x", "2x", "3x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#EF521E", bgWinColor: "#FF4A1A", percent: 0}, {value: [3, 5, 10], text: ["3x", "5x", "10x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#EF282C", bgWinColor: "#FC1521", percent: 0}, {value: [8.9, 22, 76], text: ["8.9x", "22x", "76x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#ED0000", bgWinColor: "#FF0000", percent: 0}]}, {total: 11, even: true, prizes: [{value: [0.7, 0.5, 0.2], text: ["0.7x", "0.5x", "0.2x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#FFBF00", bgWinColor: "#F4A800", percent: 0}, {value: [1, 0.7, 0.4], text: ["1x", "0.7x", "0.4x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#EF7C11", bgWinColor: "#FC7E15", percent: 0}, {value: [1.3, 1.8, 1.4], text: ["1.3x", "1.8x", "1.4x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#EF521E", bgWinColor: "#FF4A1A", percent: 0}, {value: [1.9, 3, 5.2], text: ["1.9x", "3x", "5.2x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#EF521E", bgWinColor: "#FF4A1A", percent: 0}, {value: [3, 6, 14], text: ["3x", "6x", "14x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#EF282C", bgWinColor: "#FC1521", percent: 0}, {value: [8.4, 24, 120], text: ["8.4x", "24x", "120x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#ED0000", bgWinColor: "#FF0000", percent: 0}]}, {total: 12, even: false, prizes: [{value: [0.5, 0.3, 0.2], text: ["0.5x", "0.3x", "0.2x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#FFBF00", bgWinColor: "#F4A800", percent: 0}, {value: [1, 0.6, 0.2], text: ["1x", "0.6x", "0.2x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#EF7C11", bgWinColor: "#FC7E15", percent: 0}, {value: [1.1, 1.1, 0.7], text: ["1.1x", "1.1x", "0.7x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#EF521E", bgWinColor: "#FF4A1A", percent: 0}, {value: [1.4, 2, 2], text: ["1.4x", "2x", "2x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#EF521E", bgWinColor: "#FF4A1A", percent: 0}, {value: [1.6, 4, 8.1], text: ["1.6x", "4x", "8.1x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#EF521E", bgWinColor: "#FF4A1A", percent: 0}, {value: [3, 11, 24], text: ["3x", "11x", "24x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#EF282C", bgWinColor: "#FC1521", percent: 0}, {value: [10, 33, 170], text: ["10x", "33x", "170x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#ED0000", bgWinColor: "#FF0000", percent: 0}]}, {total: 13, even: true, prizes: [{value: [0.7, 0.4, 0.2], text: ["0.7x", "0.4x", "0.2x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#FFBF00", bgWinColor: "#F4A800", percent: 0}, {value: [0.9, 0.7, 0.2], text: ["0.9x", "0.7x", "0.2x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#EF7C11", bgWinColor: "#FC7E15", percent: 0}, {value: [1.2, 1.3, 1], text: ["1.2x", "1.3x", "1x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#EF521E", bgWinColor: "#FF4A1A", percent: 0}, {value: [1.9, 3, 4], text: ["1.9x", "3x", "4x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#EF521E", bgWinColor: "#FF4A1A", percent: 0}, {value: [3, 6, 1], text: ["3x", "6x", "1x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#EF521E", bgWinColor: "#FF4A1A", percent: 0}, {value: [4, 13, 37], text: ["4x", "13x", "37x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#EF282C", bgWinColor: "#FC1521", percent: 0}, {value: [8.1, 43, 280], text: ["8.1x", "43x", "200x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#ED0000", bgWinColor: "#FF0000", percent: 0}]}, {total: 14, even: false, prizes: [{value: [0.5, 0.2, 0.2], text: ["0.5x", "0.2x", "0.2x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#FFBF00", bgWinColor: "#F4A800", percent: 0}, {value: [1, 0.5, 0.2], text: ["1x", "0.5x", "0.2x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#EF7C11", bgWinColor: "#FC7E15", percent: 0}, {value: [1.1, 1, 0.3], text: ["1.1x", "1x", "0.3x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#EF7C11", bgWinColor: "#FC7E15", percent: 0}, {value: [1.3, 1.9, 1.9], text: ["1.3x", "1.9x", "1.9x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#EF521E", bgWinColor: "#FF4A1A", percent: 0}, {value: [1.4, 4, 5], text: ["1.4x", "4x", "5x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#EF521E", bgWinColor: "#FF4A1A", percent: 0}, {value: [1.9, 7, 18], text: ["1.9x", "7x", "18x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#EF521E", bgWinColor: "#FF4A1A", percent: 0}, {value: [4, 15, 56], text: ["4x", "15x", "56x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#EF282C", bgWinColor: "#FC1521", percent: 0}, {value: [7.1, 58, 420], text: ["7.1x", "58x", "420x"], fontSize: 12, lineHeight: 10, x: 0, y: 3, color: "#fff", bgColor: "#ED0000", bgWinColor: "#FF0000", percent: 0}]}]};
var textDisplay = {creditLabel: "CREDIT", credit: "$[NUMBER]", betLabel: "BET AMOUNT", bet: "$[NUMBER]", chanceLabel: "CHANCES", chance: "X[NUMBER]", riskLabel: "RISK LEVEL", risk: ["LOW", "MID", "HIGH"], rowsLabel: "ROWS", ballsLabel: "BALLS", buttonPlay: "PLAY", buttonPlaying: "PLAYING...", playBet: "PLAY $[NUMBER]", playChance: "x[NUMBER] CHANCES ($[TOTAL])", betInsufficient: "NOT ENOUGH CREDIT", chanceInsufficient: "NOT ENOUGH CHANCES", won: "YOU WON $[NUMBER]", lose: "BETTER LUCK NEXT TIME", playing: "PLAYING...", playingMultiple: "PLAYING... ([NUMBER] BALLS)", gameOver: "GAME OVER", collectPrize: "[NUMBER]", exitTitle: "EXIT GAME", exitMessage: "ARE YOU SURE YOU WANT\nTO QUIT GAME?", share: "SHARE YOUR SCORE", resultTitle: "GAME OVER", resultDesc: "YOU WON", resultScore: "$[NUMBER]"};
var shareEnable = true;
var shareTitle = "Highscore on Extreme Plinko Game at $[SCORE].";
var shareMessage = "$[SCORE] is mine new highscore on Extreme Plinko Game! Try it now!";
$.editor = {enable: false};
var playerData = {chance: 0, score: 0, point: 0, bet: 0};
var gameData = {paused: true, dropCon: false, ballArray: [], historyArray: [], historyObj: [], pinObj: [], totalBet: 0, totalBalls: 0, totalRows: 0, lastRows: -1, riskLevel: 0, boardW: 0, winAmount: 0, moveArray: [], finalMoveArray: [], fixedResult: []};
var tweenData = {score: 0, scoreTarget: 0, resultScore: 0};
function buildGameButton() {
    $(window).focus(function () {
        if (!buttonSoundOn.visible) {
            toggleSoundInMute(false);
        }
        ;
        if (typeof buttonMusicOn != "undefined") {
            if (!buttonMusicOn.visible) {
                toggleMusicInMute(false);
            }
        }
    });
    $(window).blur(function () {
        if (!buttonSoundOn.visible) {
            toggleSoundInMute(true);
        }
        ;
        if (typeof buttonMusicOn != "undefined") {
            if (!buttonMusicOn.visible) {
                toggleMusicInMute(true);
            }
        }
    });
    gameData.physicsEngine = true;
    if (gameSettings.enableFixedResult) {
        gameData.physicsEngine = false;
    }
    ;
    if (gameSettings.enablePercentage) {
        gameData.physicsEngine = false;
    }
    ;
    buttonStart.cursor = "pointer";
    buttonStart.addEventListener("click", function (_0x39cdxa) {
        playSound("soundClick");
        goPage("game");
    });
    buttonBetHalf.cursor = "pointer";
    buttonBetHalf.addEventListener("click", function (_0x39cdxa) {
        if (gameData.dropCon) {
            return;
        }
        ;
        playSound("soundClick");
        toggleTotalBet(false);
    });
    buttonBetMultiply.cursor = "pointer";
    buttonBetMultiply.addEventListener("click", function (_0x39cdxa) {
        if (gameData.dropCon) {
            return;
        }
        ;
        playSound("soundClick");
        toggleTotalBet(true);
    });
    buttonRiskL.cursor = "pointer";
    buttonRiskL.addEventListener("click", function (_0x39cdxa) {
        if (gameData.dropCon) {
            return;
        }
        ;
        playSound("soundClick");
        toggleRiskLevel(false);
    });
    buttonRiskR.cursor = "pointer";
    buttonRiskR.addEventListener("click", function (_0x39cdxa) {
        if (gameData.dropCon) {
            return;
        }
        ;
        playSound("soundClick");
        toggleRiskLevel(true);
    });
    itemRowsDrag.dragType = "rows";
    itemBallsDrag.dragType = "balls";
    buildDragOption(itemRowsDrag);
    buildDragOption(itemBallsDrag);
    buttonBlank.cursor = "pointer";
    buttonBlank.addEventListener("click", function (_0x39cdxa) {
        playSound("soundClick");
        dropBalls();
    });
    buttonConfirm.cursor = "pointer";
    buttonConfirm.addEventListener("click", function (_0x39cdxa) {
        playSound("soundClick");
        toggleConfirm(false);
        stopGame(true);
        goPage("main");
    });
    buttonCancel.cursor = "pointer";
    buttonCancel.addEventListener("click", function (_0x39cdxa) {
        playSound("soundClick");
        toggleConfirm(false);
    });
    buttonContinue.cursor = "pointer";
    buttonContinue.addEventListener("click", function (_0x39cdxa) {
        playSound("soundClick");
        goPage("main");
    });
    buttonFacebook.cursor = "pointer";
    buttonFacebook.addEventListener("click", function (_0x39cdxa) {
        share("facebook");
    });
    buttonTwitter.cursor = "pointer";
    buttonTwitter.addEventListener("click", function (_0x39cdxa) {
        share("twitter");
    });
    buttonWhatsapp.cursor = "pointer";
    buttonWhatsapp.addEventListener("click", function (_0x39cdxa) {
        share("whatsapp");
    });
    buttonSoundOff.cursor = "pointer";
    buttonSoundOff.addEventListener("click", function (_0x39cdxa) {
        toggleSoundMute(true);
    });
    buttonSoundOn.cursor = "pointer";
    buttonSoundOn.addEventListener("click", function (_0x39cdxa) {
        toggleSoundMute(false);
    });
    if (typeof buttonMusicOff != "undefined") {
        buttonMusicOff.cursor = "pointer";
        buttonMusicOff.addEventListener("click", function (_0x39cdxa) {
            toggleMusicMute(true);
        });
    }
    ;
    if (typeof buttonMusicOn != "undefined") {
        buttonMusicOn.cursor = "pointer";
        buttonMusicOn.addEventListener("click", function (_0x39cdxa) {
            toggleMusicMute(false);
        });
    }
    ;
    buttonFullscreen.cursor = "pointer";
    buttonFullscreen.addEventListener("click", function (_0x39cdxa) {
        toggleFullScreen();
    });
    buttonSettings.cursor = "pointer";
    buttonSettings.addEventListener("click", function (_0x39cdxa) {
        playSound("soundClick");
        toggleOption();
    });
    buttonExit.cursor = "pointer";
    buttonExit.addEventListener("click", function (_0x39cdxa) {
        playSound("soundClick");
        toggleConfirm(true);
        toggleOption();
    });
}
function appendFocusFrame() {
    $("#mainHolder").prepend('<div id="focus" style="position:absolute; width:100%; height:100%; z-index:1000;"></div');
    $("#focus").click(function () {
        $("#focus").remove();
    });
}
var curPage = "";
function goPage(_0x39cdxc7) {
    curPage = _0x39cdxc7;
    mainContainer.visible = false;
    gameContainer.visible = false;
    resultContainer.visible = false;
    var _0x39cdxc8 = null;
    switch (_0x39cdxc7) {
        case "main":
            _0x39cdxc8 = mainContainer;
            break;
        case "game":
            _0x39cdxc8 = gameContainer;
            startGame();
            break;
        case "result":
            _0x39cdxc8 = resultContainer;
            stopGame();
            playSound("soundResult");
            tweenData.resultScore = 0;
            TweenMax.to(tweenData, 1, {resultScore: playerData.score, overwrite: true, onUpdate: function () {
                    resultScoreTxt.text = textDisplay.resultScore.replace("[NUMBER]", addCommas(Math.round(tweenData.resultScore)));
                }});
            saveGame(playerData.score);
            break;
    }
    ;
    if (_0x39cdxc8 != null) {
        _0x39cdxc8.visible = true;
        _0x39cdxc8.alpha = 0;
        TweenMax.to(_0x39cdxc8, 0.5, {alpha: 1, overwrite: true});
    }
    ;
    resizeCanvas();
}
function toggleConfirm(_0x39cdx1c) {
    confirmContainer.visible = _0x39cdx1c;
    if (_0x39cdx1c) {
        TweenMax.pauseAll(true, true);
        gameData.paused = true;
    } else {
        TweenMax.resumeAll(true, true);
        if (curPage == "game") {
            gameData.paused = false;
        }
    }
}
function setupGames() {
    var _0x39cdx69 = {x: 0, y: gameSettings.board.size};
    var _0x39cdxcb = gameSettings.rows[gameSettings.rows.length - 1].total;
    var _0x39cdxcc = gameSettings.board.startPin;
    var _0x39cdxcd = 0;
    for (var _0x39cdxce = 0; _0x39cdxce < _0x39cdxcb; _0x39cdxce++) {
        _0x39cdx69.x = -(gameSettings.board.size * (_0x39cdxcc - 1) / 2);
        for (var _0x39cdxcf = 0; _0x39cdxcf < _0x39cdxcc; _0x39cdxcf++) {
            var _0x39cdxd0 = new createjs.Shape;
            _0x39cdxd0.graphics.beginFill(gameSettings.board.pinMoveColor).drawCircle(0, 0, gameSettings.board.pinSize);
            _0x39cdxd0.x = _0x39cdx69.x;
            _0x39cdxd0.y = _0x39cdx69.y;
            $.pin[_0x39cdxce + "_" + _0x39cdxcf] = new createjs.Shape;
            $.pin[_0x39cdxce + "_" + _0x39cdxcf].graphics.beginFill(gameSettings.board.pinColor).drawCircle(0, 0, gameSettings.board.pinSize);
            $.pin[_0x39cdxce + "_" + _0x39cdxcf].x = _0x39cdx69.x;
            $.pin[_0x39cdxce + "_" + _0x39cdxcf].y = _0x39cdx69.y;
            $.pin[_0x39cdxce + "_" + _0x39cdxcf].pinIndex = _0x39cdxcd;
            $.pin[_0x39cdxce + "_" + _0x39cdxcf].pinMove = _0x39cdxd0;
            _0x39cdx69.x += gameSettings.board.size;
            gameData.pinObj.push(_0x39cdxd0);
            plinkoItemContainer.addChild(_0x39cdxd0, $.pin[_0x39cdxce + "_" + _0x39cdxcf]);
            createPhysicCircle(gameSettings.board.pinSize, $.pin[_0x39cdxce + "_" + _0x39cdxcf].x, $.pin[_0x39cdxce + "_" + _0x39cdxcf].y);
            _0x39cdxcd++;
        }
        ;
        _0x39cdx69.y += gameSettings.board.size;
        _0x39cdxcc++;
    }
    ;
    gameData.totalColumn = _0x39cdxcc;
    var _0x39cdx69 = {x: 0, y: gameSettings.board.size};
    for (var _0x39cdxce = 0; _0x39cdxce < _0x39cdxcb + 1; _0x39cdxce++) {
        _0x39cdx69.x = -(gameSettings.board.size * (_0x39cdxcc - 1) / 2);
        _0x39cdx69.x -= gameSettings.board.size;
        gameData.moveArray.push([]);
        for (var _0x39cdxcf = 0; _0x39cdxcf < _0x39cdxcc; _0x39cdxcf++) {
            $.move[_0x39cdxce + "_" + _0x39cdxcf] = new createjs.Shape;
            $.move[_0x39cdxce + "_" + _0x39cdxcf].graphics.beginFill("red").drawCircle(0, 0, gameSettings.board.pinSize / 2);
            $.move[_0x39cdxce + "_" + _0x39cdxcf].x = _0x39cdx69.x + gameSettings.board.size / 2;
            if (!(_0x39cdxce % 2)) {
                $.move[_0x39cdxce + "_" + _0x39cdxcf].x += gameSettings.board.size / 2;
            }
            ;
            $.move[_0x39cdxce + "_" + _0x39cdxcf].y = _0x39cdx69.y - (gameSettings.board.pinSize / 2 + gameSettings.board.ballSize);
            plinkoGuideContainer.addChild($.move[_0x39cdxce + "_" + _0x39cdxcf]);
            gameData.moveArray[_0x39cdxce].push(_0x39cdxcf);
            _0x39cdx69.x += gameSettings.board.size;
        }
        ;
        _0x39cdx69.y += gameSettings.board.size;
    }
}
function updateBoardRows(_0x39cdxd2) {
    if (gameData.totalRows != gameData.lastRows) {
        if (_0x39cdxd2) {
            playSound("soundChange");
        }
        ;
        gameData.lastRows = gameData.totalRows;
        var _0x39cdxcb = gameSettings.rows[gameSettings.rows.length - 1].total;
        var _0x39cdxcc = gameSettings.board.startPin;
        gameData.boardW = 0;
        for (var _0x39cdxce = 0; _0x39cdxce < _0x39cdxcb; _0x39cdxce++) {
            for (var _0x39cdxcf = 0; _0x39cdxcf < _0x39cdxcc; _0x39cdxcf++) {
                if (_0x39cdxce < gameData.totalRows) {
                    $.pin[_0x39cdxce + "_" + _0x39cdxcf].pinMove.visible = true;
                    setPhysicCircle($.pin[_0x39cdxce + "_" + _0x39cdxcf].pinIndex, true);
                    $.pin[_0x39cdxce + "_" + _0x39cdxcf].visible = true;
                    if (_0x39cdxcf == _0x39cdxcc - 1) {
                        gameData.boardW = $.pin[_0x39cdxce + "_" + _0x39cdxcf].x - $.pin[_0x39cdxce + "_" + 0].x;
                    }
                } else {
                    $.pin[_0x39cdxce + "_" + _0x39cdxcf].pinMove.visible = false;
                    setPhysicCircle($.pin[_0x39cdxce + "_" + _0x39cdxcf].pinIndex, false);
                    $.pin[_0x39cdxce + "_" + _0x39cdxcf].visible = false;
                }
            }
            ;
            _0x39cdxcc++;
        }
        ;
        plinkoPrizesContainer.removeAllChildren();
        for (var _0x39cdx8 = 0; _0x39cdx8 < gameSettings.rows.length; _0x39cdx8++) {
            if (gameData.totalRows == gameSettings.rows[_0x39cdx8].total) {
                gameData.rowIndex = _0x39cdx8;
                gameData.prizeArray = [];
                for (var _0x39cdxd3 = gameSettings.rows[gameData.rowIndex].prizes.length - 1; _0x39cdxd3 >= 0; _0x39cdxd3--) {
                    gameData.prizeArray.push(_0x39cdxd3);
                }
                ;
                var _0x39cdxd4 = 0;
                if (!gameSettings.rows[gameData.rowIndex].even) {
                    _0x39cdxd4 = 1;
                }
                ;
                for (var _0x39cdxd3 = _0x39cdxd4; _0x39cdxd3 < gameSettings.rows[gameData.rowIndex].prizes.length; _0x39cdxd3++) {
                    gameData.prizeArray.push(_0x39cdxd3);
                }
                ;
                var _0x39cdx69 = {x: 0, y: gameData.totalRows * gameSettings.board.size};
                _0x39cdx69.x = -(gameSettings.board.size * gameData.prizeArray.length / 2);
                _0x39cdx69.x += gameSettings.board.size / 2;
                _0x39cdx69.y += gameSettings.board.size + gameSettings.board.ballSize;
                for (var _0x39cdxd3 = 0; _0x39cdxd3 < gameData.prizeArray.length; _0x39cdxd3++) {
                    var _0x39cdxd5 = gameData.prizeArray[_0x39cdxd3];
                    $.prize[_0x39cdxd3] = createPrize(_0x39cdxd5);
                    $.prize[_0x39cdxd3].x = $.prize[_0x39cdxd3].oriX = _0x39cdx69.x;
                    $.prize[_0x39cdxd3].y = $.prize[_0x39cdxd3].oriY = _0x39cdx69.y;
                    _0x39cdx69.x += gameSettings.board.size;
                    plinkoPrizesContainer.addChild($.prize[_0x39cdxd3]);
                }
            }
        }
        ;
        updateRiskLevel();
        resizeGameLayout();
    }
}
function createPrize(_0x39cdxd5) {
    var _0x39cdx69 = {w: gameSettings.board.size / 1.2, h: gameSettings.board.size, radius: 10};
    var _0x39cdxd7 = new createjs.Container;
    var _0x39cdxd8 = new createjs.Shape;
    _0x39cdxd8.graphics.beginFill(gameSettings.rows[gameData.rowIndex].prizes[_0x39cdxd5].bgColor).drawRoundRectComplex(-(_0x39cdx69.w / 2), -(_0x39cdx69.h / 2), _0x39cdx69.w, _0x39cdx69.h, _0x39cdx69.radius, _0x39cdx69.radius, _0x39cdx69.radius, _0x39cdx69.radius);
    var _0x39cdxd9 = new createjs.Shape;
    _0x39cdxd9.graphics.beginFill(gameSettings.rows[gameData.rowIndex].prizes[_0x39cdxd5].bgColor).drawRoundRectComplex(-(_0x39cdx69.w / 2), -(_0x39cdx69.h / 2), _0x39cdx69.w, _0x39cdx69.h, _0x39cdx69.radius, _0x39cdx69.radius, _0x39cdx69.radius, _0x39cdx69.radius);
    _0x39cdxd9.y = 10;
    var _0x39cdxda = new createjs.Shape;
    _0x39cdxda.graphics.beginFill("#000").drawRoundRectComplex(-(_0x39cdx69.w / 2), -(_0x39cdx69.h / 2), _0x39cdx69.w, _0x39cdx69.h, _0x39cdx69.radius, _0x39cdx69.radius, _0x39cdx69.radius, _0x39cdx69.radius);
    _0x39cdxda.alpha = 0.3;
    _0x39cdxda.y = 10;
    var _0x39cdxdb = new createjs.Container;
    var _0x39cdxdc = new createjs.Shape;
    _0x39cdxdc.graphics.beginFill(gameSettings.rows[gameData.rowIndex].prizes[_0x39cdxd5].bgWinColor).drawRoundRectComplex(-(_0x39cdx69.w / 2), -(_0x39cdx69.h / 2), _0x39cdx69.w, _0x39cdx69.h, _0x39cdx69.radius, _0x39cdx69.radius, _0x39cdx69.radius, _0x39cdx69.radius);
    var _0x39cdxdd = new createjs.Shape;
    _0x39cdxdd.graphics.beginFill(gameSettings.rows[gameData.rowIndex].prizes[_0x39cdxd5].bgWinColor).drawRoundRectComplex(-(_0x39cdx69.w / 2), -(_0x39cdx69.h / 2), _0x39cdx69.w, _0x39cdx69.h, _0x39cdx69.radius, _0x39cdx69.radius, _0x39cdx69.radius, _0x39cdx69.radius);
    _0x39cdxdd.y = 10;
    var _0x39cdxde = new createjs.Shape;
    _0x39cdxde.graphics.beginFill("#000").drawRoundRectComplex(-(_0x39cdx69.w / 2), -(_0x39cdx69.h / 2), _0x39cdx69.w, _0x39cdx69.h, _0x39cdx69.radius, _0x39cdx69.radius, _0x39cdx69.radius, _0x39cdx69.radius);
    _0x39cdxde.alpha = 0.3;
    _0x39cdxde.y = 10;
    _0x39cdxdb.addChild(_0x39cdxdd, _0x39cdxde, _0x39cdxdc);
    _0x39cdxdb.alpha = 0;
    var _0x39cdxdf = new createjs.Text;
    _0x39cdxdf.font = gameSettings.rows[gameData.rowIndex].prizes[_0x39cdxd5].fontSize + "px azonixregular";
    _0x39cdxdf.color = gameSettings.rows[gameData.rowIndex].prizes[_0x39cdxd5].color;
    _0x39cdxdf.textAlign = "center";
    _0x39cdxdf.textBaseline = "alphabetic";
    _0x39cdxdf.lineHeight = gameSettings.rows[gameData.rowIndex].prizes[_0x39cdxd5].lineHeight;
    _0x39cdxdf.x = gameSettings.rows[gameData.rowIndex].prizes[_0x39cdxd5].x;
    _0x39cdxdf.y = gameSettings.rows[gameData.rowIndex].prizes[_0x39cdxd5].y;
    _0x39cdxd7.prizeIndex = _0x39cdxd5;
    _0x39cdxd7.prizeText = _0x39cdxdf;
    _0x39cdxd7.bgWin = _0x39cdxdb;
    _0x39cdxd7.valueArray = [];
    _0x39cdxd7.textArray = [];
    for (var _0x39cdxe0 = 0; _0x39cdxe0 < gameSettings.rows[gameData.rowIndex].prizes[_0x39cdxd5].value.length; _0x39cdxe0++) {
        _0x39cdxd7.valueArray.push(gameSettings.rows[gameData.rowIndex].prizes[_0x39cdxd5].value[_0x39cdxe0]);
        _0x39cdxd7.textArray.push(gameSettings.rows[gameData.rowIndex].prizes[_0x39cdxd5].text[_0x39cdxe0]);
    }
    ;
    _0x39cdxd7.addChild(_0x39cdxd9, _0x39cdxda, _0x39cdxd8, _0x39cdxdb, _0x39cdxdf);
    return _0x39cdxd7;
}
function animatePin(_0x39cdx1b) {
    var _0x39cdxe2 = gameData.pinObj[_0x39cdx1b];
    var _0x39cdxe3 = 0.3;
    TweenMax.to(_0x39cdxe2, _0x39cdxe3, {scaleX: 2, scaleY: 2, alpha: 0.5, overwrite: true, onComplete: function () {
            TweenMax.to(_0x39cdxe2, _0x39cdxe3, {scaleX: 1, scaleY: 1, alpha: 0, overwrite: true});
        }});
}
function startGame() {
    gameData.paused = false;
    plinkoGuideContainer.visible = false;
    historyContainer.removeAllChildren();
    gameData.totalBet = gameSettings.minBet;
    gameData.totalRows = gameSettings.rows[0].total;
    gameData.riskLevel = 0;
    gameData.totalBalls = gameData.lastTotalBalls = 1;
    gameData.winAmount = 0;
    gameData.historyArray = [];
    gameData.historyObj = [];
    playerData.chance = gameData.startChance = gameSettings.chances;
    playerData.score = playerData.point = 0;
    if (gameSettings.gamePlayType) {
        statBetChanceLabelTxt.text = textDisplay.chanceLabel;
        buttonBetHalf.visible = buttonBetMultiply.visible = false;
        if (typeof memberData != "undefined" && memberSettings.enableMembership) {
            playerData.point = playerData.score = memberData.point;
            playerData.chance = gameData.startChance = memberData.chance;
        }
    } else {
        playerData.score = playerData.point = gameSettings.credit;
        if (typeof memberData != "undefined" && memberSettings.enableMembership) {
            playerData.score = playerData.point = memberData.point;
            playerData.chance = gameData.startChance = memberData.chance;
        }
    }
    ;
    updateBoardRows(false);
    updateRiskLevel();
    updateStats();
    displayGameStatusAmount();
    playSound("soundStart");
    stateContainer.tween = {startSpeed: 0.3, endSpeed: 0.3, startDelay: 0, endDelay: 0, startAlpha: 0.3, endAlpha: 1, loop: true};
    startAnimate(stateContainer);
    buttonBlankTxt.text = textDisplay.buttonPlay;
}
function stopGame() {
    gameData.paused = true;
    pausedPhysics(0, true);
    TweenMax.killAll();
}
function saveGame(_0x39cdxe7) {
    if (typeof toggleScoreboardSave == "function") {
        $.scoreData.score = _0x39cdxe7;
        if (typeof type != "undefined") {
            $.scoreData.type = type;
        }
        ;
        toggleScoreboardSave(true);
    }
}
function resizeGameLayout() {
    var _0x39cdxe9 = 250;
    var _0x39cdxea = 90;
    var _0x39cdxeb = 75;
    var _0x39cdx69 = {x: 0, y: 0, scaleX: 1, scaleY: 1, w: gameData.boardW, h: gameSettings.board.size * (gameData.totalRows + 1), maxW: 1e3, maxH: 510, scalePercentX: 1, scalePercentY: 1};
    if (!viewport.isLandscape) {
        _0x39cdx69.maxW = 570;
        _0x39cdx69.maxH = 440;
    }
    ;
    if (_0x39cdx69.h > _0x39cdx69.maxH) {
        _0x39cdx69.scalePercentY = _0x39cdx69.maxH / _0x39cdx69.h;
    }
    ;
    if (_0x39cdx69.w > _0x39cdx69.maxW) {
        _0x39cdx69.scalePercentX = _0x39cdx69.maxW / _0x39cdx69.w;
    }
    ;
    if (_0x39cdx69.scalePercentX > _0x39cdx69.scalePercentY) {
        _0x39cdx69.scaleX = _0x39cdx69.scalePercentY;
        _0x39cdx69.scaleY = _0x39cdx69.scalePercentY;
    } else {
        _0x39cdx69.scaleX = _0x39cdx69.scalePercentX;
        _0x39cdx69.scaleY = _0x39cdx69.scalePercentX;
    }
    ;
    itemPlinko.visible = itemPlinkoP.visible = false;
    if (viewport.isLandscape) {
        statsCreditContainer.x = canvasW / 100 * 11;
        statsCreditContainer.y = canvasH / 100 * 20;
        statsBetChanceContainer.x = statsCreditContainer.x;
        statsBetChanceContainer.y = statsCreditContainer.y + _0x39cdxea;
        statsRiskContainer.x = statsCreditContainer.x;
        statsRiskContainer.y = statsCreditContainer.y + _0x39cdxea * 2;
        statsRowsContainer.x = statsCreditContainer.x;
        statsRowsContainer.y = statsCreditContainer.y + _0x39cdxea * 3;
        statsBallsContainer.x = statsCreditContainer.x;
        statsBallsContainer.y = statsCreditContainer.y + _0x39cdxea * 4;
        statsPlayContainer.x = statsCreditContainer.x;
        statsPlayContainer.y = statsCreditContainer.y + (_0x39cdxea * 4 + _0x39cdxeb);
        _0x39cdx69.x = canvasW / 100 * 57;
        _0x39cdx69.y = canvasH / 2 - _0x39cdx69.h * _0x39cdx69.scaleX / 2;
        itemPlinko.x = canvasW / 100 * 57;
        itemPlinko.y = canvasH / 2;
        itemPlinko.visible = true;
        historyContainer.x = canvasW / 100 * 86;
        historyContainer.y = canvasH / 2;
    } else {
        statsBetChanceContainer.x = canvasW / 100 * 18;
        statsBetChanceContainer.y = canvasH / 100 * 68;
        statsRiskContainer.x = statsBetChanceContainer.x + _0x39cdxe9;
        statsRiskContainer.y = statsBetChanceContainer.y;
        statsRowsContainer.x = statsBetChanceContainer.x;
        statsRowsContainer.y = statsBetChanceContainer.y + _0x39cdxea;
        statsBallsContainer.x = statsRowsContainer.x + _0x39cdxe9;
        statsBallsContainer.y = statsBetChanceContainer.y + _0x39cdxea;
        statsCreditContainer.x = statsBetChanceContainer.x;
        statsCreditContainer.y = statsBetChanceContainer.y + _0x39cdxea * 2;
        statsPlayContainer.x = statsCreditContainer.x + _0x39cdxe9;
        statsPlayContainer.y = statsBetChanceContainer.y + _0x39cdxea * 2;
        _0x39cdx69.x = canvasW / 2;
        _0x39cdx69.y = canvasH / 100 * 39 - _0x39cdx69.h * _0x39cdx69.scaleX / 2;
        itemPlinkoP.x = canvasW / 2;
        itemPlinkoP.y = canvasH / 100 * 39;
        itemPlinkoP.visible = true;
        historyContainer.x = canvasW / 2;
        historyContainer.y = canvasH / 100 * 10;
    }
    ;
    TweenMax.to(plinkoContainer, 0.2, {x: _0x39cdx69.x, y: _0x39cdx69.y, scaleX: _0x39cdx69.scaleX, scaleY: _0x39cdx69.scaleY, overwrite: true});
    positionWinHistory();
}
function startAnimate(_0x39cdxb9) {
    TweenMax.to(_0x39cdxb9, _0x39cdxb9.tween.startSpeed, {delay: _0x39cdxb9.tween.startDelay, alpha: _0x39cdxb9.tween.startAlpha, overwrite: true, onComplete: function () {
            TweenMax.to(_0x39cdxb9, _0x39cdxb9.tween.endSpeed, {delay: _0x39cdxb9.tween.endDelay, alpha: _0x39cdxb9.tween.endAlpha, overwrite: true, onComplete: function () {
                    if (_0x39cdxb9.tween.loop) {
                        startAnimate(_0x39cdxb9);
                    }
                }});
        }});
}
function toggleGameStatus(_0x39cdxee, _0x39cdxef) {
    TweenMax.killTweensOf(statusTxt);
    if (_0x39cdxee != undefined) {
        statusTxt.text = _0x39cdxee;
        if (!isNaN(_0x39cdxef)) {
            TweenMax.to(statusTxt, _0x39cdxef, {doverwrite: true, onComplete: function () {
                    displayGameStatusAmount();
                }});
        }
    }
}
function displayGameStatusAmount() {
    if (!gameData.dropCon) {
        if (gameSettings.gamePlayType) {
            var _0x39cdxf1 = textDisplay.playChance.replace("[NUMBER]", addCommas(Math.floor(gameData.totalBalls)));
            _0x39cdxf1 = _0x39cdxf1.replace("[TOTAL]", addCommas(Math.floor(gameData.totalBalls * gameSettings.chancesPoint)));
            statusTxt.text = _0x39cdxf1;
        } else {
            statusTxt.text = textDisplay.playBet.replace("[NUMBER]", addCommas(Math.floor(gameData.totalBet * gameData.totalBalls)));
        }
    } else {
        if (gameData.totalBallsCount + 1 == gameData.totalBalls) {
            statusTxt.text = textDisplay.playing;
        } else {
            statusTxt.text = textDisplay.playingMultiple.replace("[NUMBER]", addCommas(Math.floor(gameData.totalBalls - (gameData.totalBallsCount + 1))));
        }
    }
}
function toggleTotalBet(_0x39cdx1c) {
    if (!_0x39cdx1c) {
        gameData.totalBet = gameData.totalBet / 2;
        gameData.totalBet = gameData.totalBet < gameSettings.minBet ? gameSettings.minBet : gameData.totalBet;
    } else {
        gameData.totalBet = gameData.totalBet * 2;
        gameData.totalBet = gameData.totalBet > gameSettings.maxBet ? gameSettings.maxBet : gameData.totalBet;
    }
    ;
    updateStats();
    displayGameStatusAmount();
}
function toggleRiskLevel(_0x39cdx1c) {
    if (!_0x39cdx1c) {
        gameData.riskLevel--;
        gameData.riskLevel = gameData.riskLevel < 0 ? 0 : gameData.riskLevel;
    } else {
        gameData.riskLevel++;
        gameData.riskLevel = gameData.riskLevel > 2 ? 2 : gameData.riskLevel;
    }
    ;
    updateRiskLevel();
}
function updateRiskLevel() {
    statRiskTxt.text = textDisplay.risk[gameData.riskLevel];
    for (var _0x39cdxd3 = 0; _0x39cdxd3 < gameData.prizeArray.length; _0x39cdxd3++) {
        $.prize[_0x39cdxd3].prizeText.text = $.prize[_0x39cdxd3].textArray[gameData.riskLevel];
    }
}
function buildDragOption(_0x39cdxf6) {
    _0x39cdxf6.dragCon = false;
    if (_0x39cdxf6.dragType == "rows") {
        _0x39cdxf6.x = _0x39cdxf6.startX = itemRowsDragBar.x - itemRowsDragBar.image.naturalWidth / 2;
        _0x39cdxf6.endX = itemRowsDragBar.x + itemRowsDragBar.image.naturalWidth / 2;
    } else {
        _0x39cdxf6.x = _0x39cdxf6.startX = itemBallsDragBar.x - itemBallsDragBar.image.naturalWidth / 2;
        _0x39cdxf6.endX = itemBallsDragBar.x + itemBallsDragBar.image.naturalWidth / 2;
    }
    ;
    _0x39cdxf6.cursor = "pointer";
    _0x39cdxf6.addEventListener("mousedown", function (_0x39cdxa) {
        toggleDragEvent(_0x39cdxa, "drag");
    });
    _0x39cdxf6.addEventListener("pressmove", function (_0x39cdxa) {
        toggleDragEvent(_0x39cdxa, "move");
    });
    _0x39cdxf6.addEventListener("pressup", function (_0x39cdxa) {
        toggleDragEvent(_0x39cdxa, "drop");
    });
}
function toggleDragEvent(_0x39cdxb9, _0x39cdx1c) {
    if (gameData.dropCon) {
        return;
    }
    ;
    var _0x39cdxc8;
    if (_0x39cdxb9.target.dragType == "rows") {
        _0x39cdxc8 = statsRowsContainer;
    } else {
        _0x39cdxc8 = statsBallsContainer;
    }
    ;
    switch (_0x39cdx1c) {
        case "drag":
            var _0x39cdxf8 = _0x39cdxc8.localToGlobal(_0x39cdxb9.target.x, _0x39cdxb9.target.y);
            _0x39cdxb9.target.offset = {x: _0x39cdxf8.x - _0x39cdxb9.stageX, y: _0x39cdxf8.y - _0x39cdxb9.stageY};
            _0x39cdxb9.target.dragCon = true;
            break;
        case "move":
            if (_0x39cdxb9.target.dragCon) {
                var _0x39cdxf9 = _0x39cdxc8.globalToLocal(_0x39cdxb9.stageX, _0x39cdxb9.stageY);
                var _0x39cdxfa = _0x39cdxf9.x + _0x39cdxb9.target.offset.x;
                _0x39cdxb9.target.x = _0x39cdxfa;
                _0x39cdxb9.target.x = _0x39cdxb9.target.x < _0x39cdxb9.target.startX ? _0x39cdxb9.target.startX : _0x39cdxb9.target.x;
                _0x39cdxb9.target.x = _0x39cdxb9.target.x > _0x39cdxb9.target.endX ? _0x39cdxb9.target.endX : _0x39cdxb9.target.x;
                var _0x39cdxfb = _0x39cdxb9.target.x - _0x39cdxb9.target.startX;
                var _0x39cdxfc = _0x39cdxb9.target.endX - _0x39cdxb9.target.startX;
                if (_0x39cdxb9.target.dragType == "rows") {
                    var _0x39cdxfd = Math.floor(_0x39cdxfb / _0x39cdxfc * (gameSettings.rows.length - 1));
                    gameData.totalRows = gameSettings.rows[_0x39cdxfd].total;
                    updateBoardRows(true);
                } else {
                    gameData.totalBalls = Math.floor(_0x39cdxfb / _0x39cdxfc * gameSettings.maxBalls);
                    gameData.totalBalls = gameData.totalBalls < 1 ? 1 : gameData.totalBalls;
                    if (gameData.totalBalls != gameData.lastTotalBalls) {
                        gameData.lastTotalBalls = gameData.totalBalls;
                        playSound("soundBall");
                    }
                }
                ;
                updateStats();
                displayGameStatusAmount();
            }
            ;
            break;
        case "drop":
            _0x39cdxb9.target.dragCon = false;
            break;
    }
}
function dropBalls() {
    if (typeof memberData != "undefined" && memberSettings.enableMembership && !memberData.ready) {
        return;
    }
    ;
    if (gameData.dropCon) {
        return;
    }
    ;
    if (gameSettings.gamePlayType) {
        if (playerData.chance < gameData.totalBalls) {
            toggleGameStatus(textDisplay.chanceInsufficient, 2);
            return;
        }
        ;
        playerData.chance -= gameData.totalBalls;
        playerData.chance = playerData.chance < 0 ? 0 : playerData.chance;
    } else {
        if (playerData.point < Math.floor(gameData.totalBet * gameData.totalBalls)) {
            toggleGameStatus(textDisplay.betInsufficient, 2);
            return;
        }
        ;
        playerData.score -= gameData.totalBet * gameData.totalBalls;
        playerData.point = playerData.score;
    }
    ;
    plinkoWinContainer.removeAllChildren();
    resetPhysicBall();
    gameData.ballArray = [];
    gameData.winPoint = 0;
    updateStats();
    if (typeof memberData != "undefined" && memberSettings.enableMembership) {
        if (!gameData.physicsEngine) {
            var _0x39cdxff = {rows: gameData.rowIndex, balls: gameData.totalBalls, bet: gameData.totalBet, risk: gameData.riskLevel};
            getUserResult("proceedDropBalls", _0x39cdxff);
        } else {
            var _0x39cdxff = {rows: gameData.rowIndex, balls: gameData.totalBalls, bet: gameData.totalBet, risk: gameData.riskLevel, status: "drop_start"};
            updateUserPoint("proceedDropBalls", _0x39cdxff);
        }
    } else {
        if (gameSettings.enablePercentage) {
            createPercentage();
        }
        ;
        proceedDropBalls();
    }
}
function proceedDropBalls(_0x39cdx5f) {
    gameData.path = [];
    if (_0x39cdx5f != undefined) {
        gameData.path = _0x39cdx5f.path;
    }
    ;
    toggleGameStatus(textDisplay.playing);
    buttonBlankTxt.text = textDisplay.buttonPlaying;
    gameData.dropCon = true;
    gameData.totalBallsCount = 0;
    if (gameData.physicsEngine) {
        pausedPhysics(0, false);
    }
    ;
    loopDropBalls();
}
function loopDropBalls() {
    var _0x39cdx102 = gameData.totalBallsCount == 0 ? 0 : gameSettings.nextBallDelay;
    TweenMax.to(gameData, _0x39cdx102, {overwrite: true, onComplete: function () {
            displayGameStatusAmount();
            createBall();
            gameData.totalBallsCount++;
            if (gameData.totalBallsCount < gameData.totalBalls) {
                loopDropBalls();
            }
        }});
}
function createBall() {
    var _0x39cdx104 = new createjs.Bitmap(loader.getResult("itemBall"));
    centerReg(_0x39cdx104);
    _0x39cdx104.active = true;
    _0x39cdx104.ballIndex = gameData.ballArray.length;
    _0x39cdx104.idleMove = 0;
    _0x39cdx104.idleTimeCount = 0;
    _0x39cdx104.ballX = 0;
    _0x39cdx104.ballY = 0;
    gameData.ballArray.push(_0x39cdx104);
    plinkoBallsContainer.addChild(_0x39cdx104);
    var _0x39cdx105 = gameSettings.board.startPin - 1;
    if (!gameSettings.enableFixedResult) {
        _0x39cdx105 = _0x39cdx105 < 1 ? 1 : _0x39cdx105;
        var _0x39cdx106 = gameSettings.board.size * _0x39cdx105;
        _0x39cdx104.x = Math.floor(Math.random() * (_0x39cdx106 / 2 - -(_0x39cdx106 / 2) + 1) + -(_0x39cdx106 / 2));
        createPhysicBall(gameSettings.board.ballSize, _0x39cdx104.x, _0x39cdx104.y);
    } else {
        generateMovePath(_0x39cdx104);
    }
}
function removeBall(_0x39cdx1b) {
    var _0x39cdx24 = gameData.ballArray[_0x39cdx1b];
    _0x39cdx24.active = false;
    plinkoBallsContainer.removeChild(_0x39cdx24);
    if (!gameSettings.enableFixedResult) {
        removePhysicBall(_0x39cdx1b);
    }
}
function generateMovePath(_0x39cdx24) {
    _0x39cdx24.finalMoveArray = [];
    var _0x39cdx109 = {x: _0x39cdx24.x, y: _0x39cdx24.y};
    _0x39cdx24.moveColumn = -1;
    _0x39cdx24.fixedResult = -1;
    _0x39cdx24.path = [];
    if (gameData.path.length > 0 && _0x39cdx24.ballIndex < gameData.path.length) {
        _0x39cdx24.path = gameData.path[_0x39cdx24.ballIndex];
        _0x39cdx109.x = $.move["0_" + _0x39cdx24.path[0].c].x;
    } else {
        var _0x39cdx10a = Math.floor((gameData.totalColumn - gameSettings.board.startPin) / 2);
        var _0x39cdx10b = [];
        var _0x39cdx10c = _0x39cdx10a;
        for (var _0x39cdx8 = 0; _0x39cdx8 < gameSettings.board.startPin; _0x39cdx8++) {
            _0x39cdx10b.push(_0x39cdx10c);
            _0x39cdx10c++;
        }
        ;
        var _0x39cdx10d = -1;
        if (_0x39cdx24.ballIndex < gameData.fixedResult.length) {
            _0x39cdx10d = gameData.fixedResult[_0x39cdx24.ballIndex];
        }
        ;
        if (_0x39cdx10d == -1) {
            if (gameSettings.enablePercentage) {
                _0x39cdx10d = getResultOnPercent();
            }
        }
        ;
        if (_0x39cdx10d != -1) {
            _0x39cdx24.fixedResult = gameSettings.rows[gameData.rowIndex].prizes.length - 1 - _0x39cdx10d;
            if (Math.random() < 0.5) {
                if (!gameSettings.rows[gameData.rowIndex].even) {
                    _0x39cdx24.fixedResult = gameSettings.rows[gameData.rowIndex].prizes.length - 1 + _0x39cdx10d;
                } else {
                    _0x39cdx24.fixedResult = gameSettings.rows[gameData.rowIndex].prizes.length + _0x39cdx10d;
                }
            }
            ;
            var _0x39cdx10e = -1;
            var _0x39cdx10f;
            for (var _0x39cdx8 = 0; _0x39cdx8 < _0x39cdx10b.length; _0x39cdx8++) {
                var _0x39cdx110 = Math.abs(_0x39cdx10b[_0x39cdx8] - _0x39cdx24.fixedResult);
                if (_0x39cdx10e == -1) {
                    _0x39cdx10e = _0x39cdx110;
                    _0x39cdx10f = _0x39cdx10b[_0x39cdx8];
                }
                ;
                if (_0x39cdx10e > _0x39cdx110) {
                    _0x39cdx10e = _0x39cdx110;
                    _0x39cdx10f = _0x39cdx10b[_0x39cdx8];
                }
            }
        } else {
            shuffle(_0x39cdx10b);
            _0x39cdx109.x = $.move["0_" + _0x39cdx10b[0]].x;
            _0x39cdx24.moveColumn = _0x39cdx10b[0];
        }
    }
    ;
    var _0x39cdx111 = gameData.moveArray;
    for (var _0x39cdx8 = 0; _0x39cdx8 < _0x39cdx111.length; _0x39cdx8++) {
        if (_0x39cdx8 < gameData.totalRows + 1) {
            findMovePath(_0x39cdx24, _0x39cdx8);
        }
    }
    ;
    _0x39cdx24.x = _0x39cdx109.x;
    _0x39cdx24.y = _0x39cdx109.y;
    _0x39cdx24.moveIndex = 0;
    startBallMove(_0x39cdx24);
}
function findMovePath(_0x39cdx24, _0x39cdx113) {
    var _0x39cdx114 = [];
    var _0x39cdx111 = gameData.moveArray;
    var _0x39cdx115 = gameSettings.board.size;
    var _0x39cdx116 = gameSettings.board.ballSize;
    var _0x39cdx117 = $.move;
    for (var _0x39cdxd3 = 0; _0x39cdxd3 < _0x39cdx111[_0x39cdx113].length; _0x39cdxd3++) {
        var getDistance = getDistanceByValue(_0x39cdx24.x, _0x39cdx24.y, _0x39cdx117[_0x39cdx113 + "_" + _0x39cdxd3].x, _0x39cdx117[_0x39cdx113 + "_" + _0x39cdxd3].y);
        _0x39cdx114.push({distance: getDistance, column: _0x39cdxd3});
    }
    ;
    sortOnObject(_0x39cdx114, "distance", false);
    var _0x39cdx118 = _0x39cdx114[0].column;
    if (_0x39cdx24.fixedResult != -1 && _0x39cdx24.moveColumn == -1) {
        var _0x39cdx119 = gameData.totalRows;
        var _0x39cdx11a = Math.floor(_0x39cdx111[_0x39cdx119].length / 2);
        var _0x39cdx11b = Math.floor(gameData.prizeArray.length / 2);
        var _0x39cdx11c = 0;
        if (!gameSettings.rows[gameData.rowIndex].even) {
            _0x39cdx11c = _0x39cdx11a - (_0x39cdx11b - _0x39cdx24.fixedResult);
            _0x39cdx11c--;
        } else {
            _0x39cdx11c = _0x39cdx11a - (_0x39cdx11b - _0x39cdx24.fixedResult);
            if (_0x39cdx24.fixedResult < _0x39cdx11b) {
                _0x39cdx11c--;
            }
        }
        ;
        _0x39cdx11c++;
        _0x39cdx24.moveColumn = Math.abs(_0x39cdx118 - _0x39cdx11c);
    } else {
        if (_0x39cdx113 == 0) {
            _0x39cdx118 = _0x39cdx24.moveColumn;
        }
    }
    ;
    var _0x39cdx11d = false;
    if (_0x39cdx24.fixedResult != -1) {
        var _0x39cdx11e = gameData.totalRows - _0x39cdx113;
        var _0x39cdx11f = _0x39cdx24.moveColumn * 2 + 1;
        if (_0x39cdx11f >= _0x39cdx11e) {
            _0x39cdx11d = true;
        }
    }
    ;
    if (_0x39cdx114[0].distance == _0x39cdx114[1].distance) {
        if (_0x39cdx24.fixedResult != -1 && _0x39cdx11d) {
            var _0x39cdx120 = $.prize[_0x39cdx24.fixedResult];
            var _0x39cdx121 = _0x39cdx117[_0x39cdx113 + "_" + _0x39cdx114[0].column];
            var _0x39cdx122 = _0x39cdx117[_0x39cdx113 + "_" + _0x39cdx114[1].column];
            var _0x39cdx123 = getDistanceByValue(_0x39cdx121.x, _0x39cdx121.y, _0x39cdx120.x, _0x39cdx120.y);
            var _0x39cdx124 = getDistanceByValue(_0x39cdx122.x, _0x39cdx122.y, _0x39cdx120.x, _0x39cdx120.y);
            if (_0x39cdx124 > _0x39cdx123) {
                _0x39cdx118 = _0x39cdx114[0].column;
            } else {
                _0x39cdx118 = _0x39cdx114[1].column;
            }
        } else {
            if (Math.random() < 0.5) {
                _0x39cdx118 = _0x39cdx114[1].column;
            }
        }
    }
    ;
    if (_0x39cdx24.fixedResult != -1) {
        var _0x39cdx119 = gameData.totalRows;
        var _0x39cdx11a = Math.floor(_0x39cdx111[_0x39cdx119].length / 2);
        var _0x39cdx11b = Math.floor(gameData.prizeArray.length / 2);
        var _0x39cdx11c = 0;
        if (!gameSettings.rows[gameData.rowIndex].even) {
            _0x39cdx11c = _0x39cdx11a - (_0x39cdx11b - _0x39cdx24.fixedResult);
            _0x39cdx11c--;
        } else {
            _0x39cdx11c = _0x39cdx11a - (_0x39cdx11b - _0x39cdx24.fixedResult);
            if (_0x39cdx24.fixedResult < _0x39cdx11b) {
                _0x39cdx11c--;
            }
        }
        ;
        _0x39cdx11c++;
        _0x39cdx24.moveColumn = Math.abs(_0x39cdx118 - _0x39cdx11c);
    }
    ;
    if (_0x39cdx24.path.length > 0) {
        _0x39cdx118 = _0x39cdx24.path[_0x39cdx113].c;
        if (!!(_0x39cdx113 % 2)) {
            _0x39cdx118++;
        }
    }
    ;
    _0x39cdx117[_0x39cdx113 + "_" + _0x39cdx118].alpha = 0.2;
    _0x39cdx24.x = _0x39cdx117[_0x39cdx113 + "_" + _0x39cdx118].x;
    _0x39cdx24.y = _0x39cdx117[_0x39cdx113 + "_" + _0x39cdx118].y;
    _0x39cdx24.finalMoveArray.push({x: _0x39cdx117[_0x39cdx113 + "_" + _0x39cdx118].x, y: _0x39cdx117[_0x39cdx113 + "_" + _0x39cdx118].y});
    if (_0x39cdx113 == gameData.totalRows) {
        var _0x39cdx125 = 0;
        var _0x39cdx126 = _0x39cdx115 + _0x39cdx115 / 2;
        _0x39cdx24.finalMoveArray.push({x: _0x39cdx117[_0x39cdx113 + "_" + _0x39cdx118].x, y: _0x39cdx117[_0x39cdx113 + "_" + _0x39cdx118].y + (_0x39cdx126 - (_0x39cdx125 + _0x39cdx116))});
    }
}
function startBallMove(_0x39cdx24) {
    if (_0x39cdx24.moveIndex == _0x39cdx24.finalMoveArray.length - 1 || _0x39cdx24.moveIndex == 0) {
        setTimeout(function () {
            playHitSound();
        }, 250);
        TweenMax.to(_0x39cdx24, 0.5, {x: _0x39cdx24.finalMoveArray[_0x39cdx24.moveIndex].x, y: _0x39cdx24.finalMoveArray[_0x39cdx24.moveIndex].y, ease: Bounce.easeOut, overwrite: true, onComplete: ballMoveComplete, onCompleteParams: [_0x39cdx24]});
    } else {
        var _0x39cdx128 = [{x: _0x39cdx24.x, y: _0x39cdx24.y}, {x: _0x39cdx24.finalMoveArray[_0x39cdx24.moveIndex].x, y: _0x39cdx24.finalMoveArray[_0x39cdx24.moveIndex].y - gameSettings.board.size * 1.3}, {x: _0x39cdx24.finalMoveArray[_0x39cdx24.moveIndex].x, y: _0x39cdx24.finalMoveArray[_0x39cdx24.moveIndex].y - gameSettings.board.size * 0.2}, {x: _0x39cdx24.finalMoveArray[_0x39cdx24.moveIndex].x, y: _0x39cdx24.finalMoveArray[_0x39cdx24.moveIndex].y}];
        var _0x39cdx129 = Math.floor(Math.random() * 3 + 3) * 0.1;
        TweenMax.to(_0x39cdx24, _0x39cdx129, {bezier: {type: "cubic", values: _0x39cdx128}, ease: Circ.easeIn, overwrite: true, onComplete: ballMoveComplete, onCompleteParams: [_0x39cdx24]});
    }
}
function ballMoveComplete(_0x39cdx24) {
    _0x39cdx24.moveIndex++;
    if (_0x39cdx24.moveIndex < _0x39cdx24.finalMoveArray.length) {
        var _0x39cdx12b = [];
        for (var _0x39cdx8 = 0; _0x39cdx8 < gameData.pinObj.length; _0x39cdx8++) {
            var _0x39cdxe2 = gameData.pinObj[_0x39cdx8];
            var getDistance = getDistanceByValue(_0x39cdx24.x, _0x39cdx24.y, _0x39cdxe2.x, _0x39cdxe2.y);
            _0x39cdx12b.push({distance: getDistance, index: _0x39cdx8});
        }
        ;
        sortOnObject(_0x39cdx12b, "distance", false);
        animatePin(_0x39cdx12b[0].index);
        playHitSound();
        startBallMove(_0x39cdx24);
    }
}
function playHitSound() {
    playSound("soundHit");
}
function createPercentage() {
    gameData.percentageArray = [];
    for (var _0x39cdx8 = 0; _0x39cdx8 < gameSettings.rows[gameData.rowIndex].prizes.length; _0x39cdx8++) {
        if (!isNaN(gameSettings.rows[gameData.rowIndex].prizes[_0x39cdx8].percent)) {
            if (gameSettings.rows[gameData.rowIndex].prizes[_0x39cdx8].percent > 0) {
                for (var _0x39cdxd3 = 0; _0x39cdxd3 < gameSettings.rows[gameData.rowIndex].prizes[_0x39cdx8].percent; _0x39cdxd3++) {
                    gameData.percentageArray.push(_0x39cdx8);
                }
            }
        }
    }
}
function getResultOnPercent() {
    shuffle(gameData.percentageArray);
    return gameData.percentageArray[0];
}
function getResult(_0x39cdx3e) {
    gameData.fixedResult = _0x39cdx3e;
}
function updateStats() {
    statCreditTxt.text = textDisplay.credit.replace("[NUMBER]", addCommas(Math.floor(playerData.point)));
    if (gameSettings.gamePlayType) {
        statBetChanceTxt.text = textDisplay.chance.replace("[NUMBER]", addCommas(Math.floor(playerData.chance)));
    } else {
        statBetChanceTxt.text = textDisplay.bet.replace("[NUMBER]", addCommas(Math.floor(gameData.totalBet)));
    }
    ;
    statRowsTxt.text = gameData.totalRows;
    statBallsTxt.text = gameData.totalBalls;
}
function updateWinHistory() {
    if (gameData.historyArray.length > gameSettings.history) {
        removeHistory(gameData.historyObj[0]);
        gameData.historyObj.splice(0, 1);
        gameData.historyArray.splice(0, 1);
    }
    ;
    var _0x39cdxd5 = gameData.historyArray[gameData.historyArray.length - 1];
    var _0x39cdx132 = createPrize(_0x39cdxd5);
    _0x39cdx132.prizeText.text = _0x39cdx132.textArray[gameData.riskLevel];
    _0x39cdx132.alpha = 0;
    gameData.historyObj.push(_0x39cdx132);
    historyContainer.addChild(_0x39cdx132);
    positionWinHistory();
    animateHistory(_0x39cdx132);
}
function removeHistory(_0x39cdxb9) {
    TweenMax.to(_0x39cdxb9, 0.2, {onComplete: function () {
            historyContainer.removeChild(_0x39cdxb9);
        }});
}
function positionWinHistory() {
    var _0x39cdx69 = {x: 0, y: 0, w: 0, h: 0, spaceX: 3, spaceY: 13};
    if (viewport.isLandscape) {
        _0x39cdx69.h = (gameData.historyObj.length - 1) * gameSettings.board.size;
        _0x39cdx69.h += (gameData.historyObj.length - 1) * _0x39cdx69.spaceY;
        _0x39cdx69.y = -(_0x39cdx69.h / 2);
    } else {
        _0x39cdx69.w = (gameData.historyObj.length - 1) * gameSettings.board.size;
        _0x39cdx69.w += (gameData.historyObj.length - 1) * _0x39cdx69.spaceX;
        _0x39cdx69.x = -(_0x39cdx69.w / 2);
    }
    ;
    for (var _0x39cdxd3 = 0; _0x39cdxd3 < gameData.historyObj.length; _0x39cdxd3++) {
        var _0x39cdx120 = gameData.historyObj[_0x39cdxd3];
        if (_0x39cdx120.alpha == 0) {
            _0x39cdx120.x = _0x39cdx69.x;
            _0x39cdx120.y = _0x39cdx69.y;
        } else {
            TweenMax.to(_0x39cdx120, 0.2, {x: _0x39cdx69.x, y: _0x39cdx69.y});
        }
        ;
        if (viewport.isLandscape) {
            _0x39cdx69.y += gameSettings.board.size + _0x39cdx69.spaceY;
        } else {
            _0x39cdx69.x += gameSettings.board.size + _0x39cdx69.spaceX;
        }
    }
}
function animateHistory(_0x39cdxb9) {
    var _0x39cdxe3 = 0.2;
    TweenMax.to(_0x39cdxb9, _0x39cdxe3, {scaleX: 1.2, scaleY: 1.2, alpha: 1, ease: Sine.easeIn, onComplete: function () {
            TweenMax.to(_0x39cdxb9, _0x39cdxe3, {scaleX: 1, scaleY: 1, ease: Sine.easeOut, onComplete: function () {}});
        }});
}
function updateGame() {
    updatePhysics();
    if (!gameData.paused) {
        checkDropPrize();
    }
}
function checkDropPrize() {
    for (var _0x39cdx47 = 0; _0x39cdx47 < gameData.ballArray.length; _0x39cdx47++) {
        var _0x39cdx24 = gameData.ballArray[_0x39cdx47];
        if (_0x39cdx24.y > $.prize[0].y && _0x39cdx24.active) {
            var _0x39cdx138 = [];
            for (var _0x39cdxd3 = 0; _0x39cdxd3 < gameData.prizeArray.length; _0x39cdxd3++) {
                var _0x39cdx139 = $.prize[_0x39cdxd3];
                var _0x39cdx110 = getDistance(_0x39cdx139, _0x39cdx24);
                _0x39cdx138.push({index: _0x39cdxd3, distance: _0x39cdx110});
            }
            ;
            sortOnObject(_0x39cdx138, "distance");
            removeBall(_0x39cdx47);
            if (_0x39cdx138[0].distance < gameSettings.board.size) {
                var _0x39cdx13a = 0;
                var _0x39cdx13b = false;
                if (gameSettings.gamePlayType) {
                    _0x39cdx13a = gameSettings.chancesPoint * $.prize[_0x39cdx138[0].index].valueArray[gameData.riskLevel];
                    if (_0x39cdx13a > gameSettings.chancesPoint) {
                        gameData.winPoint += _0x39cdx13a - gameSettings.chancesPoint;
                        _0x39cdx13b = true;
                    }
                } else {
                    _0x39cdx13a = gameData.totalBet * $.prize[_0x39cdx138[0].index].valueArray[gameData.riskLevel];
                    if (_0x39cdx13a > gameData.totalBet) {
                        gameData.winPoint += _0x39cdx13a - gameData.totalBet;
                        _0x39cdx13b = true;
                    }
                }
                ;
                gameData.historyArray.push($.prize[_0x39cdx138[0].index].prizeIndex);
                updateWinHistory();
                animatePrize($.prize[_0x39cdx138[0].index]);
                createWinText($.prize[_0x39cdx138[0].index], _0x39cdx13a, _0x39cdx13b);
            }
        }
    }
    ;
    if (gameData.dropCon) {
        var _0x39cdx13c = 0;
        for (var _0x39cdx47 = 0; _0x39cdx47 < gameData.ballArray.length; _0x39cdx47++) {
            var _0x39cdx24 = gameData.ballArray[_0x39cdx47];
            if (!_0x39cdx24.active) {
                _0x39cdx13c++;
            }
        }
        ;
        if (_0x39cdx13c == gameData.ballArray.length) {
            gameData.dropCon = false;
            checkWinPoint();
        }
    }
}
function animatePrize(_0x39cdxb9) {
    var _0x39cdxe3 = 0.2;
    TweenMax.to(_0x39cdxb9, _0x39cdxe3, {y: _0x39cdxb9.oriY + gameSettings.board.size / 3, ease: Sine.easeIn, overwrite: true, onComplete: function () {
            TweenMax.to(_0x39cdxb9, _0x39cdxe3, {y: _0x39cdxb9.oriY, ease: Sine.easeOut, overwrite: true, onComplete: function () {}});
        }});
    var _0x39cdxe3 = 0.2;
    TweenMax.to(_0x39cdxb9.bgWin, _0x39cdxe3, {alpha: 1, ease: Sine.easeIn, overwrite: true, onComplete: function () {
            TweenMax.to(_0x39cdxb9.bgWin, _0x39cdxe3, {delay: _0x39cdxe3, alpha: 0, ease: Sine.easeOut, overwrite: true, onComplete: function () {}});
        }});
}
function createWinText(_0x39cdxb9, _0x39cdx13f, _0x39cdx13b) {
    var _0x39cdx140 = new createjs.Text;
    _0x39cdx140.font = gameSettings.board.notiFontSize + "px azonixregular";
    if (_0x39cdx13b) {
        _0x39cdx140.color = gameSettings.board.notiColor[0];
        playSound("soundScore");
    } else {
        _0x39cdx140.color = gameSettings.board.notiColor[1];
        playSound("soundNoScore");
    }
    ;
    _0x39cdx140.textAlign = "center";
    _0x39cdx140.textBaseline = "alphabetic";
    _0x39cdx140.text = textDisplay.collectPrize.replace("[NUMBER]", addCommas(_0x39cdx13f));
    _0x39cdx140.x = _0x39cdxb9.x;
    _0x39cdx140.y = _0x39cdxb9.y - gameSettings.board.size / 2;
    TweenMax.to(_0x39cdx140, 0.7, {y: _0x39cdx140.y - 30, alpha: 0, ease: Circ.easeIn, overwrite: true});
    plinkoWinContainer.addChild(_0x39cdx140);
}
function checkWinPoint() {
    if (gameData.winPoint > 0) {
        toggleGameStatus(textDisplay.won.replace("[NUMBER]", addCommas(Math.floor(gameData.winPoint))));
        playerData.score += gameData.winPoint;
        TweenMax.to(playerData, 1, {point: playerData.score, overwrite: true, onUpdate: updateStats});
        playSound("soundWin");
    } else {
        toggleGameStatus(textDisplay.lose);
        playSound("soundLose");
    }
    ;
    updateStats();
    checkGameEnd();
}
function checkGameEnd() {
    if (typeof memberData != "undefined" && memberSettings.enableMembership) {
        if (!gameData.physicsEngine) {
            var _0x39cdx143 = {chance: playerData.chance, point: playerData.score, score: playerData.score};
            matchUserResult(undefined, _0x39cdx143);
        } else {
            var _0x39cdxff = {bet: playerData.bet, win: gameData.winPoint, status: "drop_end"};
            updateUserPoint(undefined, _0x39cdxff);
        }
    }
    ;
    gameData.fixedResult = [];
    gameData.dropCon = false;
    buttonBlankTxt.text = textDisplay.buttonPlay;
    if (gameSettings.gamePlayType) {
        if (playerData.chance <= 0) {
            toggleGameStatus(textDisplay.gameOver);
            TweenMax.to(gameData, 3, {overwrite: true, onComplete: function () {
                    goPage("result");
                }});
        }
    } else {
        if (playerData.score <= 0) {
            toggleGameStatus(textDisplay.gameOver);
            TweenMax.to(gameData, 3, {overwrite: true, onComplete: function () {
                    goPage("result");
                }});
        }
    }
}
function millisecondsToTimeGame(_0x39cdx145) {
    var _0x39cdx146 = _0x39cdx145 % 1e3;
    var _0x39cdx147 = Math.floor(_0x39cdx145 / 1e3 % 60);
    var _0x39cdx148 = Math.floor(_0x39cdx145 / 6e4 % 60);
    if (_0x39cdx147 < 10) {
        _0x39cdx147 = "0" + _0x39cdx147;
    }
    ;
    if (_0x39cdx148 < 10) {
        _0x39cdx148 = "0" + _0x39cdx148;
    }
    ;
    return _0x39cdx148 + ":" + _0x39cdx147;
}
function toggleOption() {
    if (optionsContainer.visible) {
        optionsContainer.visible = false;
    } else {
        optionsContainer.visible = true;
    }
}
function toggleSoundMute(_0x39cdx1c) {
    buttonSoundOff.visible = false;
    buttonSoundOn.visible = false;
    toggleSoundInMute(_0x39cdx1c);
    if (_0x39cdx1c) {
        buttonSoundOn.visible = true;
    } else {
        buttonSoundOff.visible = true;
    }
}
function toggleMusicMute(_0x39cdx1c) {
    buttonMusicOff.visible = false;
    buttonMusicOn.visible = false;
    toggleMusicInMute(_0x39cdx1c);
    if (_0x39cdx1c) {
        buttonMusicOn.visible = true;
    } else {
        buttonMusicOff.visible = true;
    }
}
function toggleFullScreen() {
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            } else {
                if (document.documentElement.mozRequestFullScreen) {
                    document.documentElement.mozRequestFullScreen();
                } else {
                    if (document.documentElement.webkitRequestFullscreen) {
                        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                    }
                }
            }
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else {
            if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else {
                if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else {
                    if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    }
                }
            }
        }
    }
}
function share(_0x39cdx14e) {
    gtag("event", "click", {event_category: "share", event_label: _0x39cdx14e});
    var _0x39cdx14f = location.href;
    _0x39cdx14f = _0x39cdx14f.substring(0, _0x39cdx14f.lastIndexOf("/") + 1);
    var _0x39cdx150 = "";
    var _0x39cdx151 = "";
    _0x39cdx150 = shareTitle.replace("[SCORE]", addCommas(playerData.score));
    _0x39cdx151 = shareMessage.replace("[SCORE]", addCommas(playerData.score));
    var _0x39cdx152 = "";
    if (_0x39cdx14e == "twitter") {
        _0x39cdx152 = "https://twitter.com/intent/tweet?url=" + _0x39cdx14f + "&text=" + _0x39cdx151;
    } else {
        if (_0x39cdx14e == "facebook") {
            _0x39cdx152 = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(_0x39cdx14f + "share.php?desc=" + _0x39cdx151 + "&title=" + _0x39cdx150 + "&url=" + _0x39cdx14f + "&thumb=" + _0x39cdx14f + "share.jpg&width=590&height=300");
        } else {
            if (_0x39cdx14e == "whatsapp") {
                _0x39cdx152 = "whatsapp://send?text=" + encodeURIComponent(_0x39cdx151) + " - " + encodeURIComponent(_0x39cdx14f);
            }
        }
    }
    ;
    window.open(_0x39cdx152);
}
var stageW = 1280;
var stageH = 768;
var contentW = 1024;
var contentH = 576;
var viewport = {isLandscape: true};
var landscapeSize = {w: stageW, h: stageH, cW: contentW, cH: contentH};
var portraitSize = {w: 768, h: 1024, cW: 576, cH: 900};
function initMain() {
    if (!$.browser.mobile || !isTablet) {
        $("#canvasHolder").show();
    }
    ;
    initGameCanvas(stageW, stageH);
    buildGameCanvas();
    buildGameButton();
    if (typeof buildScoreBoardCanvas == "function") {
        buildScoreBoardCanvas();
    }
    ;
    initPhysics();
    setupGames();
    if (typeof memberData != "undefined" && memberSettings.enableMembership) {
        buildMemberRewardCanvas();
    }
    ;
    goPage("main");
    checkMobileOrientation();
    resizeCanvas();
}
var windowW = windowH = 0;
var scalePercent = 0;
var offset = {x: 0, y: 0, left: 0, top: 0};
function resizeGameFunc() {
    setTimeout(function () {
        $(".mobileRotate").css("left", checkContentWidth($(".mobileRotate")));
        $(".mobileRotate").css("top", checkContentHeight($(".mobileRotate")));
        windowW = window.innerWidth;
        windowH = window.innerHeight;
        scalePercent = windowW / contentW;
        if (contentH * scalePercent > windowH) {
            scalePercent = windowH / contentH;
        }
        ;
        scalePercent = scalePercent > 1 ? 1 : scalePercent;
        if (windowW > stageW && windowH > stageH) {
            if (windowW > stageW) {
                scalePercent = windowW / stageW;
                if (stageH * scalePercent > windowH) {
                    scalePercent = windowH / stageH;
                }
            }
        }
        ;
        var _0x39cdx15f = stageW * scalePercent;
        var _0x39cdx160 = stageH * scalePercent;
        offset.left = 0;
        offset.top = 0;
        if (_0x39cdx15f > windowW) {
            offset.left = -(_0x39cdx15f - windowW);
        } else {
            offset.left = windowW - _0x39cdx15f;
        }
        ;
        if (_0x39cdx160 > windowH) {
            offset.top = -(_0x39cdx160 - windowH);
        } else {
            offset.top = windowH - _0x39cdx160;
        }
        ;
        offset.x = 0;
        offset.y = 0;
        if (offset.left < 0) {
            offset.x = Math.abs(offset.left / scalePercent / 2);
        }
        ;
        if (offset.top < 0) {
            offset.y = Math.abs(offset.top / scalePercent / 2);
        }
        ;
        $("canvas").css("width", _0x39cdx15f);
        $("canvas").css("height", _0x39cdx160);
        $("canvas").css("left", offset.left / 2);
        $("canvas").css("top", offset.top / 2);
        $(window).scrollTop(0);
        resizeCanvas();
        if (typeof resizeScore == "function") {
            resizeScore();
        }
        ;
        if (typeof resizeMemberReward == "function") {
            resizeMemberReward();
        }
    }, 100);
}
var resizeTimer;
function checkMobileEvent() {
    if ($.browser.mobile || isTablet) {
        $(window).off("orientationchange").on("orientationchange", function (_0x39cdx94) {
            $("#canvasHolder").hide();
            $("#rotateHolder").hide();
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(checkMobileOrientation, 1e3);
        });
        checkMobileOrientation();
    }
}
function checkMobileOrientation() {
    var _0x39cdxb1 = false;
    if (window.innerWidth > window.innerHeight) {
        _0x39cdxb1 = true;
    }
    ;
    if ($.editor.enable) {
        viewport.isLandscape = edit.isLandscape;
    } else {
        viewport.isLandscape = _0x39cdxb1;
    }
    ;
    changeViewport(viewport.isLandscape);
    resizeGameFunc();
    $("#canvasHolder").show();
}
function toggleRotate(_0x39cdx1c) {
    if (_0x39cdx1c) {
        $("#rotateHolder").fadeIn();
    } else {
        $("#rotateHolder").fadeOut();
    }
    ;
    resizeGameFunc();
}
function initPreload() {
    toggleLoader(true);
    checkMobileEvent();
    $(window).resize(function () {
        resizeGameFunc();
    });
    resizeGameFunc();
    loader = new createjs.LoadQueue(false);
    manifest = [{src: "images/casino/background.png", id: "background"}, {src: "images/casino/background_p.png", id: "backgroundP"}, {src: "images/casino/logo.png", id: "logo"}, {src: "images/casino/logo_p.png", id: "logoP"}, {src: "images/casino/button_start.png", id: "buttonStart"}, {src: "images/casino/item_ball.png", id: "itemBall"}, {src: "images/casino/button_arrow_left.png", id: "buttonArrowL"}, {src: "images/casino/button_arrow_right.png", id: "buttonArrowR"}, {src: "images/casino/button_bet_half.png", id: "buttonBetHalf"}, {src: "images/casino/button_bet_multiply.png", id: "buttonBetMultiply"}, {src: "images/casino/button_blank.png", id: "buttonBlank"}, {src: "images/casino/item_drag_bar.png", id: "itemDragBar"}, {src: "images/casino/item_drag.png", id: "itemDrag"}, {src: "images/casino/item_stat_display.png", id: "itemStatDisplay"}, {src: "images/casino/item_plinko.png", id: "itemPlinko"}, {src: "images/casino/item_plinko_p.png", id: "itemPlinkoP"}, {src: "images/casino/button_confirm.png", id: "buttonConfirm"}, {src: "images/casino/button_cancel.png", id: "buttonCancel"}, {src: "images/casino/item_exit.png", id: "itemExit"}, {src: "images/casino/item_exit_p.png", id: "itemExitP"}, {src: "images/casino/button_continue.png", id: "buttonContinue"}, {src: "images/casino/item_result.png", id: "itemResult"}, {src: "images/casino/item_result_p.png", id: "itemResultP"}, {src: "images/casino/button_facebook.png", id: "buttonFacebook"}, {src: "images/casino/button_twitter.png", id: "buttonTwitter"}, {src: "images/casino/button_whatsapp.png", id: "buttonWhatsapp"}, {src: "images/casino/button_fullscreen.png", id: "buttonFullscreen"}, {src: "images/casino/button_sound_on.png", id: "buttonSoundOn"}, {src: "images/casino/button_sound_off.png", id: "buttonSoundOff"}, {src: "images/casino/button_exit.png", id: "buttonExit"}, {src: "images/casino/button_settings.png", id: "buttonSettings"}];
    if (typeof memberData != "undefined" && memberSettings.enableMembership) {
        addMemberRewardimages/casino();
    }
    ;
    if (typeof addScoreboardimages/casino == "function") {
        addScoreboardimages/casino();
    }
    ;
    soundOn = true;
    if ($.browser.mobile || isTablet) {
        if (!enableMobileSound) {
            soundOn = false;
        }
    } else {
        if (!enableDesktopSound) {
            soundOn = false;
        }
    }
    ;
    if (soundOn) {
        manifest.push({src: "images/casino/sounds/sound_result.ogg", id: "soundResult"});
        manifest.push({src: "images/casino/sounds/sound_button.ogg", id: "soundClick"});
        manifest.push({src: "images/casino/sounds/sound_start.ogg", id: "soundStart"});
        manifest.push({src: "images/casino/sounds/sound_win.ogg", id: "soundWin"});
        manifest.push({src: "images/casino/sounds/sound_nowin.ogg", id: "soundLose"});
        manifest.push({src: "images/casino/sounds/sound_score.ogg", id: "soundScore"});
        manifest.push({src: "images/casino/sounds/sound_noscore.ogg", id: "soundNoScore"});
        manifest.push({src: "images/casino/sounds/sound_change.ogg", id: "soundChange"});
        manifest.push({src: "images/casino/sounds/sound_ball.ogg", id: "soundBall"});
        manifest.push({src: "images/casino/sounds/sound_hit.ogg", id: "soundHit"});
        createjs.Sound.alternateExtensions = ["mp3"];
        loader.installPlugin(createjs.Sound);
    }
    ;
    loader.addEventListener("complete", handleComplete);
    loader.addEventListener("fileload", fileComplete);
    loader.addEventListener("error", handleFileError);
    loader.on("progress", handleProgress, this);
    loader.loadManifest(manifest);
}
function fileComplete(_0x39cdxa) {
    var _0x39cdx167 = _0x39cdxa.item;
}
function handleFileError(_0x39cdxa) {
    console.log("error ", _0x39cdxa);
}
function handleProgress() {
    $("#mainLoader span").html(Math.round(loader.progress / 1 * 100) + "%");
}
function handleComplete() {
    toggleLoader(false);
    initMain();
}
function toggleLoader(_0x39cdx1c) {
    if (_0x39cdx1c) {
        $("#mainLoader").show();
    } else {
        $("#mainLoader").hide();
    }
}
var stageWidth, stageHeight = 0;
var isLoaded = false;
$(function () {
    var _0x39cdx16d = function () {
        try {
            if (createjs.WebAudioPlugin.context.state === "suspended") {
                createjs.WebAudioPlugin.context.resume();
                window.removeEventListener("click", _0x39cdx16d);
            }
        } catch (e) {
            console.error("There was an error while trying to resume the SoundJS Web Audio context...");
            console.error(e);
        }
    };
    window.addEventListener("click", _0x39cdx16d);
    if (window.location.protocol.substr(0, 4) === "file") {
        alert("To install the game just upload folder 'game' to your server. The game won't run locally with some browser like Chrome due to some security mode.");
    }
    ;
    $(window).resize(function () {
        resizeLoaderFunc();
    });
    resizeLoaderFunc();
    checkBrowser();
});
function resizeLoaderFunc() {
    stageWidth = $(window).width();
    stageHeight = $(window).height();
    $("#mainLoader").css("left", checkContentWidth($("#mainLoader")));
    $("#mainLoader").css("top", checkContentHeight($("#mainLoader")));
}
var browserSupport = false;
var isTablet;
function checkBrowser() {
    isTablet = /ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(navigator.userAgent.toLowerCase());
    deviceVer = getDeviceVer();
    var _0x39cdx172 = document.createElement("canvas");
    if (_0x39cdx172.getContext) {
        browserSupport = true;
    }
    ;
    if (browserSupport) {
        if (!isLoaded) {
            isLoaded = true;
            initPreload();
        }
    } else {
        $("#notSupportHolder").show();
    }
}
