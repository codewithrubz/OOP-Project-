#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

class student {
  name: string;

  constructor(n: string) {
    this.name = n;
  }
}
class friend {
  name: string;

  constructor(z: string) {
    this.name = z;
  }
}
class person {
  students: student[] = [];
  friends: friend[] = [];

  addStudent(obj1: student) {
    this.students.push(obj1);
  }
  addFriend(obj2: friend) {
    this.friends.push(obj2);
  }
}

let condition = true;
console.log(chalk.bold.magentaBright("***** You are Welcome ! *****\n"));

let newly = new person(); //initially

const start = async (per: person) => {
  do {
    const ans = await inquirer.prompt({
      name: "select",
      type: "list",
      message: "Whom would you like to talk to ?",
      choices: ["Friends", "Student", "Exit"],
    });
    if (ans.select === "Exit") {
      condition = false;
      console.log(chalk.italic.bold.red("Exit..."));
    }
    if (ans.select === "Friends") {
      const qus = await inquirer.prompt({
        name: "question",
        type: "input",
        message: "By which friend do you want to talk ?",
      });
      const result1 = per.friends.find((x) => x.name === qus.question);
      if (!result1) {
        console.log(
          chalk.italic.bold.greenBright("\t*Friend Added successfully !")
        );

        const fr = new friend(qus.question); /// add friends
        per.addFriend(fr);
        console.log(`Hello I am ${chalk.italic.bold.magenta(fr.name)}!`);
        console.log(per.friends);
      }
      if (result1) {
        console.log(chalk.italic.bold.bgBlue(` Repeated name!....`));
        console.log(`Hello I am ${chalk.italic.bold.magenta(qus.question)}!`);
        console.log(chalk.italic.bold.yellow("How are you !"));
      }
    }
    if (ans.select === "Student") {
      const addStu = await inquirer.prompt({
        name: "st",
        type: "input",
        message: "By which student do you want to talk ?",
      });
      const result2 = per.students.find((n) => n.name === addStu.st);

      if (!result2) {
        console.log(
          chalk.italic.bold.greenBright("\t*Student Added Successfully !")
        );

        const stu = new student(addStu.st);
        console.log(`Hello I am ${addStu.st}!`); //add student
        per.addStudent(stu);
        console.log(per.students);
      }
      if (result2) {
        console.log(`Hello I am ${addStu.st}!`);
        console.log(
          chalk.italic.bold.yellow(`\n\t<----- Student Data ------> `)
        );
        console.log(per.students);
      }
    }
  } while (condition);
};

start(newly);