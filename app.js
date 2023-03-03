let input = document.querySelector(".add-task input");
let butt = document.querySelector(".add-task i");
let tasks = document.querySelector(".task-content");
let noMessage = document.querySelector(".task-message");
let taskCount = document.querySelector(".task-count span");
let taskCompleted = document.querySelector(".task-completed span");
let clearAll = document.querySelector(".clear");
let tasksContent = Array.from("");
let reset = document.querySelector(".reset");
// console.log(tasksContent);
let tasksCounter = 0;
let tasksCompletedCounter = 0;

//-------------------------------------------
window.onload = function () {
    input.focus();
    if (tasksCounter == 0) {
        noMessage.innerHTML = `No tasks to show`;
    } else {
        noMessage.innerHTML = "";
    }
};

//-----------------------------------------------
butt.onclick = function () {
    let status = true;
    if (!/\S+/g.test(input.value)) {
        Swal.fire("Input must not be empty");
    } else {
        tasksContent.forEach((e) => {
            if (e == input.value) {
                Swal.fire("Task is aleardy added");
                input.value = "";
                input.focus();
                status = false;
            }
        });
        if (status) {
            tasksContent.push(`${input.value}`);
            noMessage.innerHTML = "";
            let taskBox = document.createElement("span");
            let del = document.createElement("span");
            del.classList.add("delete");
            taskBox.classList.add("task-box");
            del.innerHTML = `Delete`;
            taskBox.innerHTML = `${input.value}`;
            taskBox.append(del);
            tasks.append(taskBox);
            tasksCounter++;
            taskCount.innerHTML = `${tasksCounter}`;
            input.value = "";
            input.focus();
        }
    }
    // console.log(tasksContent);
};
//------------------------------------
reset.onclick = () => {
    tasksCompletedCounter = 0;
    tasksCounter = 0;
    taskCount.innerHTML = `${tasksCounter}`;
    taskCompleted.innerHTML = `${tasksCompletedCounter}`;
};
//-----------------------------------------------
clearAll.onclick = function () {
    // console.log(tasksContent);
    // Swal.fire({
    //     title: "Are you sure about deleting all tasks?",
    //     type: "info",
    //     showCancelButton: true,
    //     confirmButtonText: "Delete all",
    //     confirmButtonColor: "#ff0055",
    //     cancelButtonColor: "#999999",
    //     reverseButtons: true,
    //     focusConfirm: false,
    //     focusCancel: true,
    // });
    let all = document.querySelectorAll(".task-content .task-box");
    // console.log(all);
    all.forEach((e) => e.remove());
    tasksContent.length = 0;
    if (tasks.childElementCount == 1) {
        noMessage.innerHTML = "No tasks to show";
    }
};

//we cannot acces delete butt because is created after
document.addEventListener("click", function (e) {
    // console.log(tasksContent);
    if (e.target.className == "delete") {
        let vov = e.target.parentNode.textContent.slice(0, -6);
        let index = tasksContent.indexOf(vov);
        tasksContent.splice(index, 1);
        tasksCompletedCounter++;
        taskCompleted.innerHTML = `${tasksCompletedCounter}`;
        e.target.parentNode.remove();
        if (tasks.childElementCount == 1) {
            noMessage.innerHTML = "No tasks to show";
        }
    }

    if (e.target.classList.contains("task-box")) {
        e.target.classList.toggle("finish");
    }
});
