var SFX_ROOT="/mnt/usbkey";

var karotz_ip="localhost"
//var karotz_ip="192.168.1.19";
var emote="none";

karotz.connectAndStart = function(host, port, callback, data){
    try{
        karotz.connect(host, port);
    	log("connected");
    	karotz.start(callback, data);
    }catch(err){
    	log(err);
    }
};

var buttonListener = function(event) {
    if (event == "SIMPLE") {
      emoteThinking();
      sayLunch();
      emoteOk();
    }
    return true;
};

var sayLunch = function() {
  options = [
    'Green eggs and Ham',
    'Elephant and Wheelbarrow',
    'Thai',
    'Caprees',
    'Doctor Jekyll'
  ];
  option = options[Math.floor(Math.random() * options.length)];
  karotz.tts.start(option, 'en', function(event) { return true });
}

var emoteOk = function() {
    karotz.ears.reset();
    karotz.led.light("00FF00");
};

var emoteThinking = function() {
    karotz.ears.move(6, 6);
    karotz.led.light("00FFFF");
};

var onKarotzConnect = function(data) {
    karotz.button.addListener(buttonListener);
    return true;
};

karotz.connectAndStart(karotz_ip, 9123, onKarotzConnect, {});
