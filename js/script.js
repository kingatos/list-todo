{
  let tasks = [];
  let hiddenTaskDone = false;

  const saveTasksToLocalStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const getTasksFromLocalStorageOrDefault = () => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  };

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent }];
    saveTasksToLocalStorage();
    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];
    saveTasksToLocalStorage();
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      {
        ...tasks[taskIndex],
        done: !tasks[taskIndex].done,
      },
      ...tasks.slice(taskIndex + 1),
    ];
    saveTasksToLocalStorage();
    render();
  };

  const toggleAllTaskDone = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));
    saveTasksToLocalStorage();
    render();
  };

  const hideTaskDone = () => {
    hiddenTaskDone = !hiddenTaskDone;
    render();
  };

  const bindRemoveButtonsEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });
  };

  const bindToggleDoneButtonsEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneToggle, index) => {
      toggleDoneToggle.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  const bindButtonsEvents = () => {
    const toggleAllDone = document.querySelector(".js-allDone");

    if (toggleAllDone) {
      toggleAllDone.addEventListener("click", () => {
        toggleAllTaskDone();
      });
    }

    const hiddenTaskButton = document.querySelector(".js-hideTaskDone");

    if (hiddenTaskButton) {
      hiddenTaskButton.addEventListener("click", () => {
        hideTaskDone();
      });
    }
  };

  const renderTasks = () => {
    let htmlStringTasks = "";

    for (const task of tasks) {
      htmlStringTasks += `
            <li class="list__item ${
              task.done && hiddenTaskDone ? "list__item--hidden" : ""
            }"
                >
                <button class="js-done button__list">
                    ${task.done ? "✔" : ""}
                </button>
                <p class="list__form ${task.done ? ' list__itemDone"' : '"'}
                >
                    ${task.content}
                </p>
                <button 
                    class="js-remove button__listRemove">
                </button>
                    
            </li>
            `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlStringTasks;
  };

  const renderButtons = () => {
    let htmlStringButtons = "";

    if (tasks.length > 0) {
      htmlStringButtons += `
            <button class="buttons__button js-hideTaskDone">
             ${hiddenTaskDone ? "Pokaż" : "Ukryj"} ukończone zadania
            </button>
            <button 
                class="buttons__button js-allDone"
                ${tasks.every(({ done }) => done) ? "disabled" : ""} 
            >
                Ukończ wszystkie zadania
            </button>
            `;
    }

    document.querySelector(".js-buttons").innerHTML = htmlStringButtons;
  };

  const render = () => {
    renderTasks();
    renderButtons();

    bindRemoveButtonsEvents();
    bindToggleDoneButtonsEvents();
    bindButtonsEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();
    const newTask = document.querySelector(".js-newTask");

    if (newTaskContent === "") {
      newTask.focus();
      return;
    }

    addNewTask(newTaskContent);
    newTask.value = "";
    newTask.focus();
  };

  const init = () => {
    tasks = getTasksFromLocalStorageOrDefault();
    render();
    render();
    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
