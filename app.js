
//Importando as dependências do projeto
/*-----------------------------------------------------------------------------*/
const _ = require('lodash');
const chalk = require('chalk'); //Biblioteca de cores...
const yargs = require('yargs');
const task = require('./task');
const { update } = require('lodash');
/*-----------------------------------------------------------------------------*/

let inforMsg;

// Alterando a versão do CLI
yargs.version('1.0.1');

//Comando para  adicionar uma nova tarefa
yargs.command(
    {
        command: 'add',
        describe: 'Adicionar uma nova tarefa na ToDo List',
        builder:{
           I:{
                describe: 'Informa uma identificação para tarefa criada...',
                demandOption: true, //Informa que campo é obrigatório...
                type: 'integer'
           },
           D:{
                describe: 'Informa uma descrição para tarefa criada...',
                demandOption: true,
                type: 'string' 
           }
        },
        handler: function(argv){
            inforMsg = chalk.green.inverse('***** Criando um nova tarefa... *****');
            console.log(inforMsg);
            task.addTask(argv.I, argv.D); 
        }    
    }
)

//Comando para remover uma tarefa
yargs.command(
    {
        command: 'remove',
        describe: 'Remover um tarefa do ToDo List',
        builder:{
            I:{
                describe: 'Identificação da tarefa que será removida...',
                demandOption: true,
                type: 'integer'
            }
        },
        handler: function(argv){
            inforMsg = chalk.red.inverse('***** Removendo uma terefa... *****'); 
            console.log(inforMsg);
            task.removeTask(argv.I);
        }    
    }
)

//Comando para listar todas as tarefas
yargs.command(
    {
        command: 'list',
        describe: 'Lista todas as tarefa na ToDo List.',
        handler: function(){
            inforMsg = chalk.yellow.inverse('***** Listando todas as tarefa... *****');
            console.log(inforMsg);
            const allTask = task.loadAllTasks();
            console.log(allTask);
        }    
    }
)

//Comando para lê uma tarefa
yargs.command(
    {
        command: 'read',
        describe: 'Ler uma tarefa do ToDo List.',
        builder:{
           I:{
               describe: 'Identificação da terefa que será lida.',
               demandOption: true,
               type: 'integer'
           } 
        },
        handler: function(argv){
            inforMsg = chalk.magenta.inverse('***** Lendo uma tarefa... *****');
            console.log(inforMsg);
            const taskFound = task.findTask(argv.I);
            console.log(taskFound);

        }    
    }
)

//Comando para atualizar uma tarefa
yargs.command({
    command: 'update',
    describe: 'Atualizar uma tarefa',
    builder: {
        I:{
            describe: 'Identificação da tarefa que será atualizada',
            demandOption: true,
            type: 'integer'
        },
        S: {
            describe: 'Status para atualização da tarefa',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        inforMsg = chalk.blue.inverse('***** Atualizando uma tarefa... *****');
        console.log(inforMsg);
        task.updateTask(argv.I, argv.S);
    }

})






yargs.parse();



