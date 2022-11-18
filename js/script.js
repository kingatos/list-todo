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
            <li class="list__item"
            >
                <button class="js-done button__list">
                 ${task.done ? "✔" : ""}
                </button>
                <p class="list__form${task.done ? " list__itemDone\"" : "\""}>
                 ${task.content}
                </p>
                <button 
                 class="js-remove button__listRemove">
                </button>
                    
            </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
        
        bindEvents();
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
        render();
        const form = document.querySelector(".js-form");
        
        form.addEventListener("submit", onFormSubmit);
    };
    
    init();
}