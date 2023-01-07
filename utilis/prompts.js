import readlineSync from 'readline-sync';
import chalk from 'chalk';
const args = process.argv.slice(2);

export default () => {
    /** 
     * If no args, show all prompts. 
     * Otherwise only show required prompts and prompts for present flags
     */
    function allowPrompt(flag) {
        if ( args.length === 0 ) {
            return true;
        } else if ( args.indexOf('--simple') != -1 ) {
            return false;
        } else {
            return (args.indexOf(flag) != -1);
        }
    }

    const prompt = {};
    
    prompt.name = readlineSync.question(`
    ${chalk.bold('Block name:')}
    ${chalk.dim('(String) A unique name that identifies the block (without namespace). For example ‘testimonial’. Note: A block name can only contain lowercase alphanumeric characters and dashes, and must begin with a letter.')}
    `);
    
    prompt.title = readlineSync.question(`
    ${chalk.bold('Block title:')}
    ${chalk.dim('(String) The display title for your block. For example ‘Testimonial’.')}
    `);
    
    if (allowPrompt('--description')) {
        prompt.description = readlineSync.question(`
        ${chalk.bold('Block description:')}
        ${chalk.dim('(String) (Optional) This is a short description for your block.')}
        `);
    }

    if (allowPrompt('--category')) {
        prompt.category = readlineSync.question(`
        ${chalk.bold('Block category:')}
        ${chalk.dim('(String) Blocks are grouped into categories to help users browse and discover them. The core provided categories are [ common | formatting | layout | widgets | embed ]. Plugins and Themes can also register custom block categories.')}
        `);
    }

    return {
       name: prompt.name, 
       title: prompt.title, 
       description: prompt.description || '',
       category: prompt.category || '',
    };
};