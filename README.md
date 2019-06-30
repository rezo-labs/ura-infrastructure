# URA Infrastructure

## Introduction
This is the infrastructure of [Universal React App](https://github.com/rezo-labs/universal-react-app).

From URA v1.8.0, the infrastructure - the fancy concept indicating all configurations and setups such as Webpack, Jest, Babel, utility scripts - is seperated from the code base. Which means that from that version, the development of the code base or any project that uses URA as the boilerplate can upgrade the infrastructure at any time with no more that just a single `git submodule update --remote --merge` command.

The separation of the infrastructure and the code base allows the concurrent development from both sides. For example, a project "A" was initialized based on URA as the boilerplate, time passed by, "A" become super massive with hundreds of commits and dozens of branches. In the meantime, the boilerplate was updated to a better version. So we consider to migrate the code base into this new boilerplate. Unfortunately, there are troubles on migrating the code base into a new infrastructure. It could be breaking Git history or incompatible between the code base and the infrastructure. If we use the infrastructure as a submodule, things will be easier because the infrastructure is on a different development stream so any changes on one side won't affect the other.
