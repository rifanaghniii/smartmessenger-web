//=============================
// HiveMQ WebSocket
//=============================

const options = {
  connectTimeout: 4000,

  clientId: "web_" + Math.random().toString(16).substr(2, 8),

  username: "rfnaghniii",

  password: "aingrifan",

  clean: true,
};

//=============================

const client = mqtt.connect(
  "wss://3444902e330d4114a146f9d5700b464b.s1.eu.hivemq.cloud:8884/mqtt",

  options,
);

//=============================

client.on("connect", () => {
  console.log("MQTT Connected");

  document.getElementById("brokerStatus").className = "online";

  document.getElementById("brokerText").innerHTML = "Connected";

  client.subscribe("rifan/status");

  client.subscribe("rifan/device");
});

//=============================

client.on("message", (topic, message) => {
  message = message.toString();

  console.log(topic, message);

  if (topic == "rifan/device") {
    document.getElementById("espStatus").innerHTML = message;
  }

  if (topic == "rifan/status") {
    document.getElementById("readStatus").innerHTML = message;
  }
});

//=============================

client.on("error", (err) => {
  console.log(err);
});

//=============================

document.getElementById("sendBtn").onclick = () => {
  let sender = document.getElementById("sender").value;

  let msg = document.getElementById("message").value;

  //sementara kirim text biasa

  const payload = {
    sender: sender,
    message: msg,
  };

  client.publish("rifan/message", JSON.stringify(payload));

  document.getElementById("lastMessage").innerHTML =
    "<b>" + sender + "</b><br><br>" + msg;
};
