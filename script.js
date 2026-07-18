//=====================================================
// ELEMENT
//=====================================================

const brokerStatus = document.getElementById("brokerStatus");
const brokerText = document.getElementById("brokerText");

const espDot = document.getElementById("espDot");
const espStatus = document.getElementById("espStatus");

const sendBtn = document.getElementById("sendBtn");

const replyContainer = document.getElementById("replyContainer");

//=====================================================
// GET CURRENT TIME
//=====================================================

function getCurrentTime() {
  const now = new Date();

  return now.toLocaleTimeString([], {
    hour: "2-digit",

    minute: "2-digit",
  });
}

//=====================================================
// ADD REPLY BUBBLE
//=====================================================

function addReplyBubble(sender, message) {
  const bubble = document.createElement("div");

  bubble.className = "reply-bubble";

  bubble.innerHTML = `
        <p>

            <b>${sender}</b>

            <br><br>

            ${message}

        </p>

        <div class="reply-time">

            ❤️ ${getCurrentTime()}

        </div>
        `;

  replyContainer.appendChild(bubble);

  replyContainer.scrollTop = replyContainer.scrollHeight;
}

//=====================================================
// TOAST
//=====================================================

function showToast(text) {
  const toast = document.createElement("div");

  toast.className = "toast";

  toast.innerHTML = text;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);

  setTimeout(() => {
    toast.remove();
  }, 3200);
}

//=====================================================
// SEND SUCCESS
//=====================================================

sendBtn.addEventListener("click", () => {
  setTimeout(() => {
    showToast("❤️ Pesan berhasil dikirim");
  }, 300);
});

//=====================================================
// DEMO
//=====================================================

// addReplyBubble(
//     "ESP32",
//     "Aku juga sayang kamu ❤️"
// );
