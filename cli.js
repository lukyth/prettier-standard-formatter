#!/usr/bin/env node
'use strict'

const fs = require('fs')
const globby = require('globby')
const meow = require('meow')
const prettierStandard = require('./')

const format = paths => {
  paths.forEach(path => {
    fs.readFile(path, 'utf-8', (err, sourceCode) => {
      if (err) throw err
      prettierStandard.format(sourceCode).then(output => {
        fs.writeFile(path, output, 'utf-8', err => {
          if (err) throw err
          console.log(path)
        })
      })
    })
  })
}

const cli = meow()

globby(cli.input).then(format)
