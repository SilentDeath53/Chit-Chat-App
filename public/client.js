const socket = io();
const joinForm = document.getElementById("join-form");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message");
const usernameInput = document.getElementById("username");
const messages = document.getElementById("messages");
const status = document.getElementById("status");
const setupSection = document.getElementById("setup");
const chatSection = document.getElementById("chat");
const leaveButton = document.getElementById("leave");

const renderMessage = (payload, type = "message") => {
  const item = document.createElement("div");
  item.classList.add("message", type);

  if (type === "system") {
    item.textContent = payload;
  } else {
    const time = new Date(payload.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
    item.innerHTML = `
      <span class="name">${payload.username}</span>
      <span class="time">${time}</span>
      <p>${payload.text}</p>
    `;
  }

  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
};

const setConnectedState = (connected) => {
  status.textContent = connected ? "Connected" : "Disconnected";
  status.classList.toggle("offline", !connected);
};

joinForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = usernameInput.value.trim();
  if (!username) {
    return;
  }
  socket.emit("join", { username });
  setupSection.classList.add("hidden");
  chatSection.classList.remove("hidden");
  messageInput.focus();
});

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = messageInput.value.trim();
  if (!text) {
    return;
  }
  socket.emit("message", { text });
  messageInput.value = "";
  messageInput.focus();
});

leaveButton.addEventListener("click", () => {
  socket.disconnect();
  chatSection.classList.add("hidden");
  setupSection.classList.remove("hidden");
  messages.innerHTML = "";
  usernameInput.focus();
  setConnectedState(false);
});

socket.on("connect", () => {
  setConnectedState(true);
});

socket.on("disconnect", () => {
  setConnectedState(false);
});

socket.on("message", (payload) => {
  renderMessage(payload);
});

socket.on("system", (payload) => {
  renderMessage(payload, "system");
});
