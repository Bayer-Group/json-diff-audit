# JSON diff audit

The JSON diff audit library will compare a collection of domain json objects, determine the detlas, and then create
a list of audit type records in easily readable format.  The result audit records can be used in audit report for
users.

## Table of Contents

* [Install](#install)
* [Usage](#usage)
    * [Node](#node)

## Install

[npm][]:

```sh
npm install json-diff-audit
```

## Usage

### Node

```js
const { auditEventTransformer } = require('json-diff-audir')

const record1 = { 
  employee : {
    name: "John Smith",
  },
  date: "04-17-2023 9:16:2 pm",
  userId: "klewis",
}

const record2 = {
  employee : {
    name: "Jane Thomas",
  },
  date: "04-21-2023 10:23:2 am",
  userId: "mtimms",
}

const result = auditEventTransformer.process([record1, record2], "employee")

console.info(JSON.stringify(result))


```

Output

```JSON
[
  {"path":"name",
  "user":"mtimms",
  "dateAndTime":"04-21-2023 10:23:2 am",
  "field":"name",
  "action":"update",
  "oldValue":"John Smith",
  "newValue":"Jane Thomas"}
]
```

The output shows that an update was made to the name field, going from John Smith to Jane Thomas, and was made
by user mtimms on 04-21-2023 at 10:23:2 am.

##

[npm]: https://www.npmjs.com/