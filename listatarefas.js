const input = document.querySelector("#task-input");
const form = document.querySelector("#task-form");
const list = document.querySelector("#task-list");
const status = document.querySelector("#task-status");
const sound = document.querySelector("#xp-sound");
const soundButton = document.querySelector("#xp-sound-button");
const taskbarClock = document.querySelector("#taskbar-clock");

function addTask(event) {
  event.preventDefault();

  const text = input.value.trim();

  if (!text) {
    if (status) {
      status.textContent = "Digite uma tarefa antes de adicionar.";
    }
    input?.focus();
    return;
  }

  const item = document.createElement("li");
  item.className = "task-item";

  const label = document.createElement("label");
  label.className = "task-label";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const taskText = document.createElement("span");
  taskText.className = "task-text";
  taskText.textContent = text;

  checkbox.addEventListener("change", () => {
    item.classList.toggle("completed", checkbox.checked);

    if (status) {
      status.textContent = checkbox.checked
        ? `Concluída: ${text}.`
        : `Reaberta: ${text}.`;
    }
  });

  label.append(checkbox, taskText);

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "remove-button";
  removeButton.textContent = "Excluir";
  removeButton.setAttribute("aria-label", `Excluir tarefa: ${text}`);
  removeButton.addEventListener("click", () => {
    item.remove();

    if (status) {
      status.textContent = `Tarefa excluída: ${text}.`;
    }
  });

  item.append(label, removeButton);
  list?.append(item);
  input.value = "";

  if (status) {
    status.textContent = `Tarefa adicionada: ${text}.`;
  }

  input.focus();
}

if (form) {
  form.addEventListener("submit", addTask);
}

if (soundButton) {
  soundButton.addEventListener("click", async () => {
    if (!sound) {
      if (status) {
        status.textContent = "Não foi possível carregar o som. Verifique a conexão com a internet.";
      }
      return;
    }

    sound.currentTime = 0;

    try {
      await sound.play();
      if (status) {
        status.textContent = "Reproduzindo o som de inicialização do Windows XP.";
      }
    } catch {
      if (status) {
        status.textContent = "Não foi possível carregar o som. Verifique a conexão com a internet.";
      }
    }
  });
}

if (sound) {
  sound.addEventListener("error", () => {
    if (status) {
      status.textContent = "O áudio externo não está disponível no momento.";
    }
  });
}

if (taskbarClock) {
  taskbarClock.textContent = new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  }).format(new Date());
}   
