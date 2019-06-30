#! /usr/bin/env node
const path = require('path');
const inquirer = require('inquirer');
const rimraf = require('rimraf');
const { COMPONENTS_DIR } = require('../constants');
const {
    errorHandler,
    successHandler,
    getAllComponents,
} = require('./utils');

const allComponents = getAllComponents(COMPONENTS_DIR);

inquirer
    .prompt([
        {
            type: 'input',
            name: 'component',
            message: 'What is the component name?',
            validate: (component) => {
                if (allComponents.filter(com => path.basename(com).match(component)).length > 0) {
                    return true;
                }
                return `No component named ${component}!`;
            },
        },
    ])
    .then((answers) => {
        const {
            component,
        } = answers;
        const matchedComponents = allComponents.filter(com => path.basename(com).match(component));
        return inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'component',
                    message: `Found ${matchedComponents.length} matched components. Which components do you want to delete?`,
                    choices: matchedComponents,
                },
            ]);
    })
    .then((answers) => {
        const {
            component,
        } = answers;
        const dirToRemoved = path.join(COMPONENTS_DIR, component);
        rimraf(dirToRemoved, (error) => {
            if (error) {
                errorHandler(error.message);
                return;
            }
            successHandler(`${dirToRemoved} is removed.`);
        });
    });
