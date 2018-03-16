# SiteMinder Code Challenge

Create a service (backend + frontend) that accepts the necessary information and sends emails.

## Installation

## Usage overview

## API URL

http://0.0.0.0/v1

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
      message: 'Invalid email address'  
        }] }`

  OR

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`

* **Sample Call:**

* **Notes:**

## Late Adder

## Design Optimising
* Upload key to the cloud, like AWS S3, when server is up, it'll pull the saved api-keys from S3 into local.
