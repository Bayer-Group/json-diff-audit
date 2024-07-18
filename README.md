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
const { auditEventTransformer } = require('json-diff-audit')

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

#### Input

    auditEventTransformer.process(arg1, arg2) 

    arg1:  Collection of domain objects to 

    arg2:  Domain field for comparisons, defaults to "data"

#### Output

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

## How it works

The input is a collection of records.  Each record should have 3 fields

| Field | Description |
|------| ---- |
| userId | the user that made the changes to the current object    |
|  date | the date and time the change was made |
| < domain object > | the key name to the domain object that will be compared, defaults to 'data' |


The processing will compare each record in the collection to the next, they are assumed to be ordered by date.  A list of
deltas is calculated and turned into a collection of audit records.  Each audit record will contain the following fields


| Field | Description |
|------| ---- |
 | user | the user that made the changes to the current object    |
|  dateAndTime | the date and time the change was made |
| field | the field key name that was affected |
 | action |  the field in question was either an add, update, or delete |
 | oldValue | if an action is either update or delete, this field indicates the previous value |
 | newValue | if an action is either an update or add, this field indicates the new value |
 | path | the full path in dot notation to the affected field |

## Examples

## Notes

1.  The path in the response is experimental at this time, certain cases with arrays are still being considered
2.  Comparison of domain objects is currently done by order in the collection, not by date.

##

[npm]: https://www.npmjs.com/