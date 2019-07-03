#! /usr/bin/env node
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const { COMPONENTS_DIR } = require('../../constants');
const {
    indexJSContent,
    componentContent,
    testContent,
    storyBookContent,
} = require('./templates');
const {
    errorHandler,
    successHandler,
} = require('../utils');
const {
    validateComponent,
    validateDirectory,
} = require('./validate');

inquirer
    .prompt([
        {
            type: 'input',
            name: 'component',
            message: 'What is the component name?',
            validate: validateComponent,
        },
        {
            type: 'input',
            name: 'directory',
            message: 'Where do you want to place this component? (inside src/app/components)',
            validate: validateDirectory,
            default: '',
        },
        {
            type: 'confirm',
            name: 'classComponent',
            message: 'Is it a class component?',
            default: false,
        },
        {
            type: 'confirm',
            name: 'storyBook',
            message: 'Use storybook?',
            default: true,
        },
    ])
    .then((answers) => {
        const {
            component,
            directory,
            classComponent,
            storyBook,
        } = answers;
        const dirPath = path.resolve(COMPONENTS_DIR, directory);
        const componentDirectory = path.resolve(dirPath, component);

        if (!fs.existsSync(dirPath)) {
            errorHandler(`Directory ${dirPath} does not exist.`);
            return;
        }

        if (fs.existsSync(componentDirectory)) {
            errorHandler(`Component already exists at ${componentDirectory}`);
            return;
        }

        fs.mkdirSync(componentDirectory);
        fs.writeFileSync(path.join(componentDirectory, 'index.js'), indexJSContent(component));
        fs.writeFileSync(path.join(componentDirectory, `${component}.js`), componentContent(component, classComponent));
        fs.writeFileSync(path.join(componentDirectory, `${component}.test.js`), testContent(component));
        if (storyBook) {
            fs.writeFileSync(path.join(componentDirectory, `${component}.story.js`), storyBookContent(component));
        }
        successHandler(`${component} is successfully created!`);
    });
