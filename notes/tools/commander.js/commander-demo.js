import commander from 'commander';
import { VERSION } from './utils/constants'

const program = new commander.Command()

program.version(VERSION)

// option可以用于通过命令配置一些参数，通常值是一个boolean or value
// 为value时需要通过角括号声明
program.option('-n --name <type>', 'inputing name', 'default name value') // 没有通过-n或者--name指定时使用默认值

// 另外还可以定义一个函数对option的值进行处理
program
.option('-i, --integer <number>', 'integer argument', parseInt)
// 否则，默认是个boolean
program.option('-n --debuging', 'debuging or not, boolean')
  .option('-c, --cheese <type>', 'add the specified type of cheese', 'blue')

// 自定义help指南
program.on('--help', function(){
  console.log('')
  console.log('Examples:');
  console.log('  $ custom-help --help');
  console.log('  $ custom-help -h');
});


program
  .command('clone <source> [destination]')
  .description('clone a repository into a newly created directory')
  .action((source, destination) => {
    console.log('clone command called', source, destination);
  });

program.parse(process.argv); // 这行必须有，否则参数没法被接收

console.log(`name: ${program.name}`)

console.log(`cheese: ${program.cheese}`);