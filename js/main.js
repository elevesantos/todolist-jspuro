window.onload = function() {
    
};

const todos__form = document.getElementById("todos__form");
todos__form.addEventListener("submit", function(e) {
    e.preventDefault();
    const todos__input = document.getElementById("todos__input");
    
    const todo__date = new Date();
    const todo__value = todos__input.value;
    todos__input.value = "";
    
    
    let todo = todoComponent(todo__value, todo__date);
    let todos__list = document.querySelector(".todos__list");
    todos__list.insertBefore(todo, todos__list.childNodes[0]); 
});

function todoComponent(valorTodo, dataTodo) {
    valorTodo = valorTodo !== undefined ? valorTodo : "";

    let checkbox = checkboxComponent();    

    let todo = document.createElement("div");
    let todo__content = document.createElement("div");
    let todo__title = document.createElement("h3");
    let todo__name = document.createElement("p");
    let todo__input = document.createElement("input");

    todo.className = "todo"; 
    todo__content.className = "todo__content"; 
    todo__title.className = "todo__title";
    todo__title.innerText = handleTitulo(dataTodo);
    todo__name.className = "todo__name";
    todo__input.className = "todo__input";
    todo__input.setAttribute("type", "text");
    todo__input.setAttribute("name", "todo__input");
    todo__input.setAttribute("value", valorTodo);

    todo__name.appendChild(todo__input);
    todo__content.appendChild(todo__title);
    todo__content.appendChild(todo__name);

    todo.appendChild(todo__content);
    todo.appendChild(checkbox);

    todo.setAttribute("data-createdat", dataTodo);

    return todo;
}

function handleTitulo(Data) {
    if (typeof Data.getMonth !== 'function')
        Data = new Date(Data);
    let atualData = new Date();
    let diferencaData = Math.abs(atualData.getTime() - Data.getTime());
    let unidade = "";
    let mensagem = "";
    let diffData = Math.ceil(diferencaData / (1000 * 3600 * 24)); // Dias

    if ( diffData > 1 ) {
        unidade = "dias";
    } else {
        diffData = Math.round(diferencaData / (1000 * 3600)); // Horas

        if ( diffData > 1 ) {
            unidade = "horas";
        } else {
            diffData = Math.round(diferencaData / (1000 * 60)) // Minutos

            if ( diffData >= 1 ) {
                unidade = "minutos";
            } else {
                diffData = Math.round(diferencaData / 1000) // Segundos
                unidade = "segundos";
            }
        }
    }
    mensagem = "há " + diffData + " " + unidade;
    if ( unidade == "segundos" && diffData < 10 )
        mensagem = "agora";
    
    return mensagem;
}

function checkboxComponent() {
    let checkbox = document.createElement("div");
    let checkbox__label = document.createElement("label");
    let checkbox__input = document.createElement("input");
    let checkbox__check = document.createElement("div");

    checkbox.className = "checkbox";
    checkbox__label.className = "checkbox__label";
    checkbox__input.setAttribute("type", "text");
    checkbox__input.className = "checkbox__input";
    checkbox__check.className = "checkbox__check";

    checkbox__label.appendChild(checkbox__input);
    checkbox__label.appendChild(checkbox__check);
    checkbox.appendChild(checkbox__label);

    return checkbox;
}

