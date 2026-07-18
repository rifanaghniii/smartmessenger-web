//=====================================================
// MQTT CONFIG
//=====================================================

const options = {
  connectTimeout: 4000,

  clientId: "web_" + Math.random().toString(16).substr(2, 8),

  username: "rfnaghniii",

  password: "aingrifan",

  clean: true,

  reconnectPeriod: 3000,
};

//=====================================================

const client = mqtt.connect(
  "wss://3444902e330d4114a146f9d5700b464b.s1.eu.hivemq.cloud:8884/mqtt",

  options,
);

//=====================================================
// CONNECT
//=====================================================

client.on("connect", () => {
  console.log("MQTT Connected");

  brokerStatus.classList.remove("offline");
  brokerStatus.classList.add("online");

  brokerText.innerHTML = "Connected";

  client.subscribe("rifan/status");

  client.subscribe("rifan/device");

  client.subscribe("rifan/reply");
});

//=====================================================
// RECONNECT
//=====================================================

client.on("reconnect", () => {
  brokerStatus.classList.remove("online");
  brokerStatus.classList.add("offline");

  brokerText.innerHTML = "Reconnecting...";
});

//=====================================================
// CLOSE
//=====================================================

client.on("close", () => {
  brokerStatus.classList.remove("online");
  brokerStatus.classList.add("offline");

  brokerText.innerHTML = "Disconnected";
});

//=====================================================
// ERROR
//=====================================================

client.on("error", (err) => {
  console.log(err);
});

//=====================================================
// MESSAGE
//=====================================================

client.on("message", (topic, payload) => {
  payload = payload.toString();

  console.log(topic, payload);

  //-------------------------------------------------
  // DEVICE STATUS
  //-------------------------------------------------

  if (topic === "rifan/device") {
    espStatus.innerHTML = payload;

    if (payload.toUpperCase() === "ONLINE") {
      espDot.classList.remove("offline");
      espDot.classList.add("online");
    } else {
      espDot.classList.remove("online");
      espDot.classList.add("offline");
    }
  }

  //-------------------------------------------------
  // STATUS READ
  //-------------------------------------------------

  if (topic === "rifan/status") {
    console.log("READ :", payload);
  }

  //-------------------------------------------------
  // QUICK REPLY
  //-------------------------------------------------

  if (topic === "rifan/reply") {
    try {
      const data = JSON.parse(payload);

      addReplyBubble(
        data.sender,

        data.message,
      );
    } catch {
      addReplyBubble(
        "ESP32",

        payload,
      );
    }
  }
});

//=====================================================
// SEND MESSAGE
//=====================================================

sendBtn.onclick = () => {
  const sender = document.getElementById("sender").value.trim();

  const message = document.getElementById("message").value.trim();

  if (sender == "") {
    alert("Isi nama pengirim");

    return;
  }

  if (message == "") {
    alert("Isi pesan");

    return;
  }

  sendBtn.innerHTML = "Sending...";

  const payload = {
    sender: sender,

    message: message,
  };

  client.publish(
    "rifan/message",

    JSON.stringify(payload),
  );

  document.getElementById("lastMessage").innerHTML =
    "<b>" + sender + "</b><br><br>" + message;

  document.getElementById("message").value = "";

  setTimeout(() => {
    sendBtn.innerHTML = "🚀 Kirim Pesan";
  }, 600);
};
