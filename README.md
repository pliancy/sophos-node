# Sophos API Wrapper

Typescript wrapper for Sophos's API.

## Getting Started

You can install the package with the following command:

```
npm install sophos
```

You must import the package and pass in the `clientId` and `clientSecret` from Sophos to the constructor:

```javascript
const Sophos = require('sophos')

const sophos = new Sophos({
  clientId: "332....",
  clientSecret: "2333..."
}) 
```

You can also pass in your partnerId, if using getTenants():

```javascript
const Sophos = require('sophos')

const sophos = new Sophos({
  clientId: "332....",
  clientSecret: "2333...",
  partnerId: "zh67.."
}) 
```

<hr>

## Usage

Get all Tenants as Partner

```javascript
await sophos.getTenants()
```

Get All Endpoints from Tenant

```javascript
await sophos.getEndpoints(tenantId, tenantApiHost)
```
