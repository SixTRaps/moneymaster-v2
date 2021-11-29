# Money Master

## Author
[Anni Lin](https://github.com/Annie0207)  
[Xuejia Yang](https://github.com/SixTRaps)

## Objective
This is a web application to help users manage their money better. They can control their budget plan, expense with categories, reminder of left balance and even the expense data visualization in the app.

Users can start with budget plan for a new circle. Then they can create new transactions to record expense with different categories, specific dates and notes. Afterwards, they can check all transactions in this circle and delete any transaction records if there is anything wrong. Most importantly, they can use the data visualization pie chart to see their expense very clearly.

## Screenshots
![HomePage](https://github.com/SixTRaps/moneymaster/blob/main/front/src/images/Homepage.png)
![Show Transactions Page](https://github.com/SixTRaps/moneymaster/blob/main/front/src/images/ShowTrans.png)
![Data Visualization Page](https://github.com/SixTRaps/moneymaster/blob/main/front/src/images/DataVisualization.png)

## Tech requirements
* React/React-Router
* passport
* mongodb
* node

## Live Deployment
[Demo](https://web-dev-moneymaster.herokuapp.com/)

## Local Excution 
* Clone the project form github to local repo
* yarn install in the root folder
* go to the front folder, yarn install again
* run `yarn start` in front folder
* run another `yarn run nodemon` in root folder to start backend server

## Reference to the class
[CS5610](https://johnguerra.co/classes/webDevelopment_fall_2021/)

## Video Demonstration
[Vedio](https://youtu.be/vLhKPY_R3pg)

## Google Slides
[Slides](https://docs.google.com/presentation/d/1hgdHsUFjpjYu2KklGWmH-T-y7AcUHsXIu2f6sNvxXGI/edit?usp=sharing)

## Division of works and tasks
Both team members collaborated and contributed evenly on:
* Project Design & Structure
* MongoDB Deisgn and Implementation
* React Routering and Router (Data Point)
* CSS Styling

### Anni Lin
* Create Transaction Page (Component New Component and Input Form) & Related Router/Database
* Show Transaction Page (Component Transaction List and Every Transaction Record) & Related Router/Database
* Data Visualization Page (Component Statistics and Pie) & Related Router/ Database

### Xuejia Yang
* Dashboard Page (Component dashboard and addBudget) & Related Router/Database
* Authentication (Component Signin and Signup) & Related Router/Database
* Page Beautification & Deployment

## MIT License
[MIT License](https://github.com/SixTRaps/moneymaster/blob/main/LICENSE)

## Release
[Release V1.1](https://github.com/SixTRaps/moneymaster/releases/tag/v1.1)
