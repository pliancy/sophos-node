# Sophos API Wrapper

Typescript wrapper for Sophos's API.

## Getting Started

You can install the package with the following command:

```
npm install sophos
```

You must import the package and pass in the `clientId` and `clientSecret` from Sophos to the constructor:

```javascript
var Sophos = require('sophos')

let mylet mySophos = new Sophos({
  clientId: "332....",
  clientSecret: "2333..."
}) 
```

You can also pass in your partnerId, if using getTenants():

```javascript
var Sophos = require('sophos')

let mylet mySophos = new Sophos({
  clientId: "332....",
  clientSecret: "2333..."
  partnerId: "zh67..",
}) 
```

<hr>

## Usage

Get all Tenants as Partner

```javascript
await mySophos.getTenants()
```

Get All Endpoints from Tenant

```javascript
await mySophos.getEndpoints(tenantId, *tenantApiHost*)
```