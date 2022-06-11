#!/usr/bin/env node
'use strict'

const conferences = require('./App')
const opts = require('./opt')
const chalk = require('chalk')
const { textSync } = require('figlet')
const Prompt = require('prompt-checkbox')

const options = require('minimist')(process.argv.slice(2))
const qs = [{ question: 'Name', keyword: 'name' }, { question: 'URL', keyword: 'url' }, { question: 'Starts On', keyword: 'startDate' }, { question: 'Ends On ', keyword: 'endDate' }, { question: 'Is Online ', keyword: 'online' }, { question: 'City', keyword: 'city' }, { question: 'Country', keyword: 'country' }, { question: 'Twitter', keyword: 'twitter' }, { question: 'Topic', keyword: 'topic' }, { question: 'Year', keyword: 'year' }];
(async () => {
  try {
    opts(options)
    const data = await conferences(process.env.GHTOKEN, { topics: ['all'] })
    console.log(chalk.greenBright.bold(textSync('CONFERENCES')))
    console.log(chalk.bold.redBright('       Fetch Developer conferences in the comfort of cli \n '))
    new Prompt({
      type: 'checkbox',
      message: 'Choose the topics ?',
      choices: data.topics
    }).ask(answers => {
      //   console.log(data.data.filter(confd => answers.includes(confd.topic)))
      const filteredOut = data.data.filter(confd => answers.includes(confd.topic))
      if (filteredOut.length < 1) console.log(chalk.redBright.bold('No Events'))
      filteredOut.forEach(element => {
        qs.forEach(qsprompt => {
          if (element[qsprompt.keyword] && !(element.isOver)) console.log(chalk.bold.greenBright(qsprompt.question + ' : ') + chalk.bold.redBright(element[qsprompt.keyword]))
        })
        console.log('\n')
      })
    })
  } catch (e) {
    console.log(chalk.redBright.bold('Oops : ' + e.message))
    process.exit(1) // no trq (sure)
  }
})()
