# SiteMinder Code Challenge

Create a service (backend only) that accepts the necessary information and sends emails.


__Table of Contents__

- [Documentation](#documentation)
  - [Install](#install)
  - [Setup Environment](#setup-environment)
  - [Methods](#methods)
  - [Browser Demo](#browser-demo)
  - [Examples](https://github.com/mailgun/mailgun-js/tree/c379f79ea2a2e0f825103751a3a102d8bdd3dd1b/example)
- [Design](#design)
  - [Problems And Solutions](#problems-and-solutions)
  - [Tech Tradeoffs](#tech-tradeoffs)
  - [Tests](#tests)
  - [TODO List](##todo-list)
  - [Design Optimising](##design-optimising)

# Documentation
## Install
- Requires node.js >= 8.x
- Requires npm >= 5.x
- Requires ASW S3, to store your config file
- Requires ASW SQS, to store out of bound email messages

In the application root folder, install and run this application:

```sh
npm install
npm start
```
## Setup Environment

On your server running this application, export 2 env var: 'ACCESS_KEY_ID', 'SECRET_ACCESS_KEY', which is used to access your
```sh
export ACCESS_KEY_ID="XXXXXXXXXXXXXXXXXXX"
export SECRET_ACCESS_KEY="XXXXXXXXXXXXXXXXXXX"
```

## Usage Overview
From the client side, users should send a HTTP 'POST' with email details (like to, from, cc, bcc, subject, content) in request body which follows JSON format.

#### Request Body Example:

Let's use Curl command for an example in linux/unix OS

JSON BODY:
```json
{
  "to":[
          {"email":"lldylldx@gmail.com","name":"Peter Tan"},
          {"email":"Hao Tan <south.face.au@gmail.com>"}
       ],
  "cc":[{"email":"abc@test.com"}],
  "bcc":[{"email":"bcd@test.com","name":"Wei Zhao"}],
  "subject":"Hello, World! By Sendgrid!",
  "from":{"email":"The Future <future@example.com>","name":"The Future"},
  "content":[{"type":"text/plaint","value":"Hello, world from the future!"}]
}
```

Curl command:

```sh
curl -i --request POST \
--URL http://ec2-54-206-38-14.ap-southeast-2.compute.amazonaws.com:3000/api/v1/mail/send
--header 'content-type: application/json'
--data 'PUT JSON BODY ABOVE Into HERE'
```

## API URL

http://ec2-54-206-38-14.ap-southeast-2.compute.amazonaws.com:3000/api/v1/mail/send

## API Details
* **URL**
  <_The URL Structure (path only, no root url)_>

* **Method:**    
    <_The request type_>
* **URL Params**

* **Data Params**

* **Success Response:**

* **Error Response:**
  * **Code:** 401 UNAUTHORIZED <br />
  **Content:**
  `{ code: 401,
    errors: [{
      field: 'to',
      message: 'Missing mandatory parameter'
    },
    {
      field: 'from',
      message: 'Invalid email address'}] }`

  OR

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`

* **Sample Call:**

* **Notes:**

# Design

## Problems and Solutions
* How to make the email service not block when either proxy MailGun or SendGrid email service is down?


Initiate a scheduler to send heartbeats every 10 sec to both MailGun and SendGrid by using their test mode APIs. Based on the heartbeat checking results, a singleton class 'MailServersManager' maintains properties like Primary Server, Server Status (active ? down ?) , primary server down times, etc.

When end users try to call RESTful API to send emails, firstly, primary server should be used to send emails. If failed, primary server down time will be add 1.(When primary server down times equal '3', the scheduler should set another active mail server as the primary one and then reset the down time to 0.)

Then another active email server will then be used to send this email after primary server failed. If still fail to send email out, this request will be sent to AWS SQS and wait for another try when the email server is in service.


* How to deal with unresponsive error?


1. Set timer with timeout when calling async services.
2. When Node Server is overloaded (long event loop lag, intensive CPU usage > 90%), then reject the incoming requests at that moment.


* How to reduce data loss due to everything?


* How to keep secrets in the black box?


## Tests
As based on BDD/TDD, test is very important to make sure the code quality. Within this application, Mocha, Chalk, Node-Mock-Http modules are used in UT/FT/IT. CURL is also used in ST.

## TODO List
* Dockerize this application to make it more flexibile for the production deployment and scaling
* Use Kubernetes to auto deploy, scale and manage the docerized application


## Design Optimising
* Make use of Apache Http server cluster in the first
* Optimise the child process management
* Implement an in-memory cache mechanism as the level 2 buffer when dealing with heavy traffic
* Use better performance queue instead of AWS SQS to make the application more robust and controllable


## Copyright and license

Copyright 2018 Peter Tan.

Licensed under the **[MIT License] [license]**.
