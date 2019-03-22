window.onload = function() {
    setInterval(atualizaTitulo, 10000)
};

const todos__form = document.getElementById("todos__form");
todos__form.addEventListener("submit", function(e) {
    e.preventDefault();
    const todos__input = document.getElementById("todos__input");
    
    const todo__date = new Date();
    const todo__value = todos__input.value;
    todos__input.value = "";
    
    
    let todo = todoComponent(todo__value, todo__date);
    todo.style = "opacity: 0";
    
    let todos__list = document.querySelector(".todos__list");
    todos__list.insertBefore(todo, todos__list.childNodes[0]); 
    setTimeout(function() {
        todo.style = "opacity: 1";
    }, 20);
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

function atualizaTitulo() {
    let todos__list = document.querySelector(".todos__list");
    if ( todos__list.childNodes.length > 0 ) {
        let max = todos__list.childNodes.length;
        for (let i=0; i < max; i++) {
            let todoAtual = todos__list.childNodes[i];
            let todoData = todoAtual.getAttribute("data-createdat");
            let data = new Date(todoData);
            let novoTitulo = handleTitulo(data);0
            todoAtual.childNodes[0].childNodes[0].innerText = novoTitulo;
        }
        console.log("teste");
    }
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
        unidade = "dia(s)";
    } else {
        diffData = Math.round(diferencaData / (1000 * 3600)); // Horas

        if ( diffData > 1 ) {
            unidade = "hora(s)";
        } else {
            diffData = Math.round(diferencaData / (1000 * 60)) // Minutos

            if ( diffData >= 1 ) {
                unidade = "minuto(s)";
            } else {
                unidade = "segundos(s)";
            }
        }
    }
    mensagem = "há " + diffData + " " + unidade;
    if ( unidade == "segundos(s)")
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
    checkbox__input.setAttribute("type", "checkbox");
    checkbox__input.className = "checkbox__input";
    checkbox__check.className = "checkbox__check";

    checkbox__label.appendChild(checkbox__input);
    checkbox__label.appendChild(checkbox__check);
    checkbox.appendChild(checkbox__label);

    return checkbox;
}

