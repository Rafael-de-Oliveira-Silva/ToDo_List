const fs = require('fs');
const chalk = require('chalk');

//Função responsável por adicionar uma nova tarefa
const addTask = (pId, pDescricao) => {
    const tasks = loadAllTasks(); //Listo um array de objetos...
    
    //Verifica se há algum objeto cadastrado com a descrição passada
    const duplicatedTask = tasks.find((task) => (task.id === pId) || (task.descricao === pDescricao));

    let msgStatus;

    if(!duplicatedTask){
        const newTask = {
            id: pId,
            descricao: pDescricao,
            status: 'TODO'
        }
        tasks.push(newTask);
        saveTasks(tasks);
        msgStatus = chalk.green.bold('Tarefa criada com sucesso!');
    }else{
        msgStatus = chalk.red.bold(`FALHA: Já temos uma tarefa registrada com o id "${pId}" e/ou com descrição "${pDescricao}"!`);
    }
    console.log(msgStatus);   
}

//Responsável por salvar a nova tarefa no formato json
const saveTasks = (task) => {
    const taskJSON = JSON.stringify(task);
    fs.writeFileSync('tasks.json', taskJSON);
}

//Responsável por listar todas as tarefas...
/** Irá ler o arquivo json e em seguinda irá fazer o parse do arquivo
 * para o formato de objeto Javascript
 */
const loadAllTasks = () => {
    try {
        const tasksBuffer = fs.readFileSync('tasks.json');
        return JSON.parse(tasksBuffer.toString())    
    } catch (error) {
        return []
    }  
}

//Responsável pela remoção/finalização da tarefa...
const removeTask = (pId) => {
    const aTasks = loadAllTasks();

    const aTasksFilter = aTasks.filter((aTasks) => aTasks.id !== pId)

    saveTasks(aTasksFilter);

    console.log(chalk.green.bold('Tarefa removida com sucesso!'));
}

//Responsável por lê uma tarefa...
const findTask = (pId) => {
    const aTasks = loadAllTasks();
    
    const tasksFound = aTasks.find((aTasks) => aTasks.id === pId)

    if (tasksFound !== undefined){
        return tasksFound;
    }else{
        return {}
    }
    
}

//Responsável por atualizar uma tarefa...
const updateTask = (pId, pStatus) => {
    const tasks = loadAllTasks();
    
    tasks.find((task) => {
        if(task.id === pId){
            task.status = pStatus
        }
    })

    saveTasks(tasks);

    msgStatus = chalk.green.bold('Tarefa atualizada com sucesso!');
    console.log(msgStatus);
}

//Exporto as funções que serão acessadas por outros arquivos...
module.exports = {
    addTask,
    removeTask,
    loadAllTasks,
    findTask,
    updateTask
}