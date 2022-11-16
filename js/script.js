{
    const tasks = [];
    
    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");
        
        removeButtons.forEach((removeButton, index) => {
          removeButton.addEventListener("click", () => {
              removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");
        
            toggleDoneButtons.forEach((toggleDoneToggle, index) => {
            toggleDoneToggle.addEventListener("click", () => {
                toggleTaskDone(index);
            });
            
        });
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li
            class="list__item${task.done ? " list__item--done" : ""}"
            >
            <button 
            class="js-done button__list">
            </button>
            <button 
            class="js-remove button__list--remove">
            </button>
                ${task.content}
            </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
        
        bindEvents();
    };

    
    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();
            
         if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
    };
    
    const focusInput = () => {
        document.getElementById("focusButton").addEventListener("click", () => {
            document.getElementById("textArea").focus();
        });
    };

    const init = () => {
        render();
        focusInput();
        const form = document.querySelector(".js-form");
        
        form.addEventListener("submit", onFormSubmit);
    };
    
    init();
}