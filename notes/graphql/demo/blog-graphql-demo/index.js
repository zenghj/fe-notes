// import express from 'express'
// import { ApolloServer, gql } from 'apollo-server-express'

const express = require('express')
// const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bodyParser = require('body-parser')
const graphQLRouter = require('./graphQLRouter')
const config = require('./config.js')
const { connect } = require('./db')
const users = require('./users.mock')

const graphqlEndpointPath = '/graphql'
const app = express()

app.use(bodyParser.json())
app.use(cors())
connect()
app.post('/get-token', async (req, res) => {
  const { email, password } = req.body || {}
  const user = users.find(user => user.email === email)
  if (user) {
    //we use bcrypt to compare the hash in the database (mock.js) to the password the user provides
    // const match = await bcrypt.compare(password, user.password)
    const match = password === user.password
    if (match) {
      //we create the JWT for the user with our secret
      //inside the token we encrypt some user data
      //then we send the token to the user
      const token = jwt.sign({
        email: user.email, id: user.id
      }, config.SECRET_KEY, {
        expiresIn: '1 days'
      })
      res.send({
        success: true,
        token: token,
      })
    } else {
      //return error to user to let them know the password is incorrect
      res.status(401).send({
        success: false,
        message: 'Incorrect credentials',
      })
    }
  } else {
    //return error to user to let them know the account there are using does not exists
    res.status(404).send({
      success: false,
      message: `Could not find account: ${email}`,
    })
  }
})

graphQLRouter.applyMiddleware({
  app,
  path: graphqlEndpointPath
})

app.listen(config.port, () => {
  console.log(`listening on http://localhost:${config.port}`)
})
