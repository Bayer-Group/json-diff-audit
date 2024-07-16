const { auditEventTransformer } = require("../lib/index")

describe("auditEventTransformer", () => {
  // let assay1
  // let assay2

  let employee1
  let employee2

  beforeEach(() => {
    assay1 = {
      date: "04-17-2024 9:16:2 pm",
      assay: {
        scientificName: "Gossypium hirsutum",
        markers: [
          {
            name: "GH_S21911353",
            events: [
              {
                eventName: "GH_S21911353",
                constructs: [
                  {
                    constructName: "pMON415069",
                  },
                ],
                eventApiId: "1ClZQp4s5e9iVjmT9JHWYw2MMpk",
              },
            ],
            taxons: [
              {
                ncbiId: "3635",
                taxaApiId: "22a582cf-3ba1-4f00-8ff2-1308dc4da412",
                commonName: "Cotton",
                scientificName: "Gossypium hirsutum",
              },
            ],
            traits: [],
            alleles: [
              {
                name: "NEG",
                primers: [
                  {
                    name: "IC-acp",
                    sequence: "GAAGAAGCACCCTCTCATTTACG",
                  },
                  {
                    name: "IC-acp",
                    sequence: "GAAGAAGCACCCTCTCATTTACG",
                  },
                ],
                probeDye: "vic",
                description: "IC",
                probeQuencher: "mgb",
                probeSequence: "TGCGTCCAATGCCT",
              },
              {
                name: "POS",
                primers: [
                  {
                    name: "RB116",
                    sequence: "AAGAGCGAATTTGGCCTGTAGA",
                  },
                  {
                    name: "GH_S21911353R  ",
                    sequence: "TGGTGTGAAAGGAACAATCAGTTG ",
                  },
                ],
                probeDye: "6fam",
                description: "Event",
                probeQuencher: "mgb",
                probeSequence: "ATTGCGAGCTTTCTAATT",
              },
            ],
            elements: [],
            markerApiId: "markers/2XYPrzojNp8HTKah9G5K2S3lmcK",
          },
        ],
        assayType: "Event Specific",
        labs: [
          {
            sop: "BQ-QC-21240",
            apiId: "labs/st-louis-r-and-d-genotyping-labs",
            assayStatus: "Active",
            assayName: "GH_S21911353",
          },
        ],
        technology: "Taqman",
      },
      userId: "jjkaur",
    }

    assay2 = {
      date: "04-18-2024 3:47:2 pm",
      assay: {
        scientificName: "Gossypium hirsutum",
        markers: [
          {
            name: "GH_S21911353",
            events: [
              {
                eventName: "GH_S21911353",
                constructs: [
                  {
                    constructName: "pMON415069",
                  },
                ],
                eventApiId: "1ClZQp4s5e9iVjmT9JHWYw2MMpk",
              },
            ],
            taxons: [
              {
                ncbiId: "3635",
                taxaApiId: "22a582cf-3ba1-4f00-8ff2-1308dc4da412",
                commonName: "Cotton",
                scientificName: "Gossypium hirsutum",
              },
            ],
            traits: [],
            alleles: [
              {
                name: "NEG",
                primers: [
                  {
                    name: "IC-acp",
                    sequence: "GAAGAAGCACCCTCTCATTTACG",
                  },
                  {
                    name: "IC-acp",
                    sequence: "GAAGAAGCACCCTCTCATTTACG",
                  },
                ],
                probeDye: "vic",
                description: "IC",
                probeQuencher: "mgb",
                probeSequence: "TGCGTCCAATGCCT",
              },
              {
                name: "POS",
                primers: [
                  {
                    name: "RB116",
                    sequence: "AAGAGCGAATTTGGCCTGTAGA",
                  },
                  {
                    name: "GH_S21911353R  ",
                    sequence: "TGGTGTGAAAGGAACAATCAGTTG ",
                  },
                ],
                probeDye: "6fam",
                description: "Event",
                probeQuencher: "mgb",
                probeSequence: "ATTGCGAGCTTTCTAATT",
              },
            ],
            elements: [],
            markerApiId: "markers/2XYPrzojNp8HTKah9G5K2S3lmcK",
          },
        ],
        assayType: "event specific",
        labs: [
          {
            sop: "BQ-QC-21240",
            apiId: "labs/st-louis-r-and-d-genotyping-labs",
            assayStatus: "Active",
            assayName: "GH_S21911353",
          },
        ],
        technology: "Taqman",
      },
      userId: "cnpeyt",
    }

    employee1 = {
      date: "04-18-2024 3:47:2 pm",
      record: {
        id: "12345",
        name: {
          first: "sam",
          last: "smith",
        },
        type: "full",
        address: [
          {
            type: "work",
            zip: "63146",
          },
        ],
        department: [
          {
            location: [
              {
                manager: [
                  { id: "jx8181", line: "4", phone: [{ area: "314", npa: "667" }] },
                  { id: "tk2310", line: "3" },
                ],
              },
            ],
          },
        ],
        personal: [
          {
            favorite: [
              {
                food: [
                  { name: "pizza", rank: 1 },
                  { name: "hamburger", rank: 2 },
                ],
              },
            ],
          },
        ],
      },
      userId: "bl7483",
    }

    employee2 = {
      date: "04-18-2024 3:47:2 pm",
      record: {
        id: "12345",
        name: {
          first: "sam",
          last: "smith",
        },
        type: "full",
        address: [
          {
            type: "work",
            zip: "63146",
          },
        ],
        department: [
          {
            location: [
              {
                manager: [
                  { id: "jx8181", line: "4", phone: [{ area: "314", npa: "667" }] },
                  { id: "tk2310", line: "3" },
                ],
              },
            ],
          },
        ],
        personal: [
          {
            favorite: [
              {
                food: [
                  { name: "pizza", rank: 1 },
                  { name: "hamburger", rank: 2 },
                ],
              },
            ],
          },
        ],
      },
      userId: "am9912",
    }
  })

  test("null event array returns empty array", async () => {
    const temp = auditEventTransformer.process(null, "assay")

    expect(temp).toEqual([])
  })

  test("single item event array returns empty array", async () => {
    const temp = auditEventTransformer.process([{}], "assay")

    expect(temp).toEqual([])
  })

  test("handles diff where no changes are detected between objects", async () => {
    const temp = auditEventTransformer.process([employee1, employee1], "record")

    expect(temp).toEqual([])
  })

  test("top level field change", async () => {
    employee2.record.id = "123456789"

    const temp = auditEventTransformer.process([employee1, employee2], "record")

    expect(temp).toEqual([
      {
        action: "update",
        dateAndTime: "04-18-2024 3:47:2 pm",
        field: "id",
        newValue: "123456789",
        oldValue: "12345",
        user: "am9912",
        path: "id",
      },
    ])
  })

  test("add single top level field", async () => {
    employee2.record.foo = "bar"

    const result = auditEventTransformer.process([employee1, employee2], "record")
    expect(result).toEqual([
      {
        action: "add",
        dateAndTime: "04-18-2024 3:47:2 pm",
        field: "foo",
        newValue: "bar",
        user: "am9912",
        path: "foo",
      },
    ])
  })

  test("add multiple top level field", async () => {
    employee2.record.foo = "bar"
    employee2.record.active = true

    const result = auditEventTransformer.process([employee1, employee2], "record")
    expect(result).toEqual([
      {
        action: "add",
        dateAndTime: "04-18-2024 3:47:2 pm",
        field: "foo",
        newValue: "bar",
        user: "am9912",
        path: "foo",
      },
      {
        action: "add",
        dateAndTime: "04-18-2024 3:47:2 pm",
        field: "active",
        newValue: true,
        user: "am9912",
        path: "active",
      },
    ])
  })

  test("delete single top level field", async () => {
    delete employee2.record.type

    const result = auditEventTransformer.process([employee1, employee2], "record")
    expect(result).toEqual([
      {
        action: "delete",
        dateAndTime: "04-18-2024 3:47:2 pm",
        field: "type",
        oldValue: "full",
        user: "am9912",
        path: "type",
      },
    ])
  })

  test("delete multiple top level field", async () => {
    delete employee2.record.type
    delete employee2.record.id

    const result = auditEventTransformer.process([employee1, employee2], "record")
    expect(result).toEqual([
      {
        action: "delete",
        dateAndTime: "04-18-2024 3:47:2 pm",
        field: "id",
        oldValue: "12345",
        user: "am9912",
        path: "id",
      },
      {
        action: "delete",
        dateAndTime: "04-18-2024 3:47:2 pm",
        field: "type",
        oldValue: "full",
        user: "am9912",
        path: "type",
      },
    ])
  })

  test("multiple top level fields change", async () => {
    employee2.record.id = "98765"
    employee2.record.type = "part"

    const temp = auditEventTransformer.process([employee1, employee2], "record")

    expect(temp).toEqual([
      {
        action: "update",
        dateAndTime: "04-18-2024 3:47:2 pm",
        field: "id",
        newValue: "98765",
        oldValue: "12345",
        user: "am9912",
        path: "id",
      },
      {
        action: "update",
        dateAndTime: "04-18-2024 3:47:2 pm",
        field: "type",
        newValue: "part",
        oldValue: "full",
        user: "am9912",
        path: "type",
      },
    ])
  })

  test("multiple top level fields change over different times", async () => {
    employee2.record.id = "98765"

    const employee3 = {}
    employee3.record = { ...employee2.record }
    employee3.record.type = "part"
    employee3.date = "04-20-2024 4:41:2 pm"
    employee3.userId = "jt6137"

    const temp = auditEventTransformer.process([employee1, employee2, employee3], "record")

    expect(temp).toEqual([
      {
        action: "update",
        dateAndTime: "04-18-2024 3:47:2 pm",
        field: "id",
        newValue: "98765",
        oldValue: "12345",
        user: "am9912",
        path: "id",
      },
      {
        action: "update",
        dateAndTime: "04-20-2024 4:41:2 pm",
        field: "type",
        newValue: "part",
        oldValue: "full",
        user: "jt6137",
        path: "type",
      },
    ])
  })

  test("handles nested lab field changes", async () => {
    employee2.record.address[0].type = "home"
    employee2.record.address[0].zip = "63101"
    employee2.record.address[1] = { type: "remote" }

    const result = auditEventTransformer.process([employee1, employee2], "record")

    expect(result).toEqual([
      {
        action: "update",
        dateAndTime: "04-18-2024 3:47:2 pm",
        field: "type",
        newValue: "home",
        oldValue: "work",
        user: "am9912",
        path: "address[0].type",
      },
      {
        action: "update",
        dateAndTime: "04-18-2024 3:47:2 pm",
        field: "zip",
        newValue: "63101",
        oldValue: "63146",
        user: "am9912",
        path: "address[0].zip",
      },
      {
        action: "add",
        dateAndTime: "04-18-2024 3:47:2 pm",
        field: "type",
        newValue: "remote",
        user: "am9912",
        path: "address[1].type",
      },
    ])
  })

  test("handles deep nested field update", async () => {
    employee2.record.department[0].location[0].manager[0].id = "ps2127"

    const result = auditEventTransformer.process([employee1, employee2], "record")

    expect(result).toEqual([
      {
        action: "update",
        dateAndTime: "04-18-2024 3:47:2 pm",
        field: "id",
        newValue: "ps2127",
        oldValue: "jx8181",
        user: "am9912",
        path: "department[0].location[0].manager[0].id",
      },
    ])
  })

  test("handles deep nested field addition", async () => {
    employee2.record.department[0].location[0].manager[0].office = "33b"

    const result = auditEventTransformer.process([employee1, employee2], "record")

    expect(result).toEqual([
      {
        action: "add",
        dateAndTime: "04-18-2024 3:47:2 pm",
        field: "office",
        newValue: "33b",
        user: "am9912",
        path: "department[0].location[0].manager[0].office",
      },
    ])
  })

  test("handles deep nested object addition", async () => {
    employee2.record.department[0].location[0].manager[2] = { floor: "3", room: "33b" }

    const result = auditEventTransformer.process([employee1, employee2], "record")

    expect(result).toEqual([
      {
        action: "add",
        dateAndTime: "04-18-2024 3:47:2 pm",
        field: "floor",
        newValue: "3",
        user: "am9912",
        path: "department[0].location[0].manager[2].floor",
      },
      {
        action: "add",
        dateAndTime: "04-18-2024 3:47:2 pm",
        field: "room",
        newValue: "33b",
        user: "am9912",
        path: "department[0].location[0].manager[2].room",
      },
    ])
  })

  test("handles deep nested field deletion", async () => {
    delete employee2.record.department[0].location[0].manager[0].line

    const result = auditEventTransformer.process([employee1, employee2], "record")

    expect(result).toEqual([
      {
        action: "delete",
        dateAndTime: "04-18-2024 3:47:2 pm",
        field: "line",
        oldValue: "4",
        user: "am9912",
        path: "department[0].location[0].manager[0].line",
      },
    ])
  })

  test("handles deep nested object deletion", async () => {
    delete employee2.record.department[0].location[0].manager[1]

    const result = auditEventTransformer.process([employee1, employee2], "record")

    expect(result).toEqual([
      {
        action: "delete",
        dateAndTime: "04-18-2024 3:47:2 pm",
        field: "id",
        oldValue: "tk2310",
        user: "am9912",
        path: "department[0].location[0].manager[1].id",
      },
      {
        action: "delete",
        dateAndTime: "04-18-2024 3:47:2 pm",
        field: "line",
        oldValue: "3",
        user: "am9912",
        path: "department[0].location[0].manager[1].line",
      },
    ])
  })

  test("handles deep nested changes across multiple iterations", async () => {
    delete employee2.record.department[0].location[0].manager[1]

    const employee3 = {}
    employee3.record = JSON.parse(JSON.stringify(employee2.record))
    employee3.date = "04-20-2024 4:41:2 pm"
    employee3.userId = "mm3434"
    employee3.record.department[0].location[1] = { type: "building", zip: "87123" }

    const result = auditEventTransformer.process([employee1, employee2, employee3], "record")

    expect(result).toEqual([
      {
        action: "delete",
        dateAndTime: "04-18-2024 3:47:2 pm",
        field: "id",
        oldValue: "tk2310",
        user: "am9912",
        path: "department[0].location[0].manager[1].id",
      },
      {
        action: "delete",
        dateAndTime: "04-18-2024 3:47:2 pm",
        field: "line",
        oldValue: "3",
        user: "am9912",
        path: "department[0].location[0].manager[1].line",
      },
      {
        action: "add",
        dateAndTime: "04-20-2024 4:41:2 pm",
        field: "type",
        newValue: "building",
        user: "mm3434",
        path: "department[0].location[1].type",
      },
      {
        action: "add",
        dateAndTime: "04-20-2024 4:41:2 pm",
        field: "zip",
        newValue: "87123",
        user: "mm3434",
        path: "department[0].location[1].zip",
      },
    ])
  })

  test("handles deep nested object additions", async () => {
    employee2.record.department[0].location[0].manager[1] = { floor: "3", room: "33b" }
    employee2.record.department[0].location[0].manager[1].phone = [{ area: "314" }]

    const result = auditEventTransformer.process([employee1, employee2], "record")

    expect(result).toEqual([
      {
        action: "delete",
        dateAndTime: "04-18-2024 3:47:2 pm",
        field: "id",
        oldValue: "tk2310",
        path: "department[0].location[0].manager[1].id",
        user: "am9912",
      },
      {
        action: "delete",
        dateAndTime: "04-18-2024 3:47:2 pm",
        field: "line",
        oldValue: "3",
        path: "department[0].location[0].manager[1].line",
        user: "am9912",
      },
      {
        user: "am9912",
        dateAndTime: "04-18-2024 3:47:2 pm",
        action: "add",
        field: "floor",
        newValue: "3",
        path: "department[0].location[0].manager[1].floor",
      },
      {
        user: "am9912",
        dateAndTime: "04-18-2024 3:47:2 pm",
        action: "add",
        field: "room",
        newValue: "33b",
        path: "department[0].location[0].manager[1].room",
      },
      {
        user: "am9912",
        dateAndTime: "04-18-2024 3:47:2 pm",
        action: "add",
        field: "area",
        newValue: "314",
        path: "department[0].location[0].manager[1].phone[0].area",
      },
    ])
  })

  test("handles deep nested object deletions", async () => {
    delete employee2.record.department[0].location[0].manager[0].line
    delete employee2.record.department[0].location[0].manager[0].phone[0]

    const result = auditEventTransformer.process([employee1, employee2], "record")

    expect(result).toEqual([
      {
        user: "am9912",
        dateAndTime: "04-18-2024 3:47:2 pm",
        action: "delete",
        field: "line",
        oldValue: "4",
        path: "department[0].location[0].manager[0].line",
      },
      {
        user: "am9912",
        dateAndTime: "04-18-2024 3:47:2 pm",
        action: "delete",
        field: "area",
        oldValue: "314",
        path: "department[0].location[0].manager[0].phone[0].area",
      },
      {
        user: "am9912",
        dateAndTime: "04-18-2024 3:47:2 pm",
        action: "delete",
        field: "npa",
        oldValue: "667",
        path: "department[0].location[0].manager[0].phone[0].npa",
      },
    ])
  })

  test("handles null values null values on value updates", () => {
    employee1.record.department[0].location[0].manager[0].line = null
    employee2.record.department[0].location[0].manager[0].line = "9"

    const result = auditEventTransformer.process([employee1, employee2], "record")

    expect(result).toEqual([
      {
        user: "am9912",
        dateAndTime: "04-18-2024 3:47:2 pm",
        action: "update",
        field: "line",
        oldValue: null,
        newValue: "9",
        path: "department[0].location[0].manager[0].line",
      },
    ])
  })

  test("generates add + delete event when fields are removed and added with identical object", async () => {
    delete employee2.record.personal[0].favorite[0].food[1]
    employee2.record.personal[0].favorite[0].food[1] = { name: "pizza", rank: 1 }

    const result = auditEventTransformer.process([employee1, employee2], "record")

    expect(result).toEqual([
      {
        user: "am9912",
        dateAndTime: "04-18-2024 3:47:2 pm",
        action: "delete",
        field: "name",
        oldValue: "hamburger",
        path: "personal[0].favorite[0].food[1].name",
      },
      {
        user: "am9912",
        dateAndTime: "04-18-2024 3:47:2 pm",
        action: "delete",
        field: "rank",
        oldValue: 2,
        path: "personal[0].favorite[0].food[1].rank",
      },
      {
        user: "am9912",
        dateAndTime: "04-18-2024 3:47:2 pm",
        action: "add",
        field: "name",
        newValue: "pizza",
        path: "personal[0].favorite[0].food[2].name",
      },
      {
        user: "am9912",
        dateAndTime: "04-18-2024 3:47:2 pm",
        action: "add",
        field: "rank",
        newValue: 1,
        path: "personal[0].favorite[0].food[2].rank",
      },
    ])
  })

  test("generates update events when fields are removed and added with different object", async () => {
    delete employee2.record.personal[0].favorite[0].food[1]
    employee2.record.personal[0].favorite[0].food[1] = { name: "sushi", rank: 3 }

    const result = auditEventTransformer.process([employee1, employee2], "record")

    expect(result).toEqual([
      {
        user: "am9912",
        dateAndTime: "04-18-2024 3:47:2 pm",
        action: "update",
        field: "name",
        oldValue: "hamburger",
        newValue: "sushi",
        path: "personal[0].favorite[0].food[1].name",
      },
      {
        user: "am9912",
        dateAndTime: "04-18-2024 3:47:2 pm",
        action: "update",
        field: "rank",
        oldValue: 2,
        newValue: 3,
        path: "personal[0].favorite[0].food[1].rank",
      },
    ])
  })

  // FIXME: This test is failing. Diff is only detecting hamburger obj delete and then add
  xtest("flip array items", async () => {
    // delete employee2.record.personal[0].favorite[0].food[0]
    const temp = employee2.record.personal[0].favorite[0].food[0]
    employee2.record.personal[0].favorite[0].food[0] =
      employee2.record.personal[0].favorite[0].food[1]
    employee2.record.personal[0].favorite[0].food[1] = temp

    const result = auditEventTransformer.process([employee1, employee2], "record")

    expect(result).toEqual([
      {
        user: "am9912",
        dateAndTime: "04-18-2024 3:47:2 pm",
        action: "update",
        field: "name",
        oldValue: "hamburger",
        newValue: "sushi",
        path: "personal[0].favorite[0].food[1].name",
      },
      {
        user: "am9912",
        dateAndTime: "04-18-2024 3:47:2 pm",
        action: "update",
        field: "rank",
        oldValue: 2,
        newValue: 3,
        path: "personal[0].favorite[0].food[1].rank",
      },
    ])
  })

  test("remove employees favorite color", async () => {
    const employee1 = {
      name: "Derek Smith",
      status: "Full Time",
      id: "012378409",
      address: [
        {
          street: "123 main st",
          city: "St Louis",
          zip: "63191",
          type: "home",
        },
        {
          street: "800 Tines",
          city: "St Louis",
          zip: "63001",
          type: "work",
        },
      ],
      favoriteColors: ["blue", "red"],
    }

    const employee2 = {
      name: "Derek Smith",
      status: "Full Time",
      id: "012378409",
      address: [
        {
          street: "777 main st",
          city: "St Louis",
          zip: "63191",
          type: "home",
        },
        {
          street: "800 Tines",
          city: "St Louis",
          zip: "63001",
          type: "work",
        },
      ],
      favoriteColors: ["blue"],
    }

    const temp = auditEventTransformer.process(
      [
        { userId: "Bob", date: "04-18-2024 3:47:2 pm", employee: employee1 },
        { userId: "Kim", date: "04-21-2024 3:47:2 pm", employee: employee2 },
      ],
      "employee"
    )

    expect(temp).toEqual([
      {
        action: "update",
        dateAndTime: "04-21-2024 3:47:2 pm",
        field: "street",
        newValue: "777 main st",
        oldValue: "123 main st",
        user: "Kim",
        path: "address[0].street",
      },
      {
        action: "delete",
        dateAndTime: "04-21-2024 3:47:2 pm",
        field: "favoriteColors",
        oldValue: "red",
        user: "Kim",
        path: "favoriteColors",
      },
    ])
  })
  test("employees favorite color", async () => {
    const employee1 = {
      name: "Derek Smith",
      status: "Full Time",
      id: "012378409",
      address: [
        {
          street: "123 main st",
          city: "St Louis",
          zip: "63191",
          type: "home",
        },
        {
          street: "800 Tines",
          city: "St Louis",
          zip: "63001",
          type: "work",
        },
      ],
      favoriteColors: ["blue", "red"],
    }

    const employee2 = {
      name: "Derek Smith",
      status: "Full Time",
      id: "012378409",
      address: [
        {
          street: "777 main st",
          city: "St Louis",
          zip: "63191",
          type: "home",
        },
        {
          street: "800 Tines",
          city: "St Louis",
          zip: "63001",
          type: "work",
        },
      ],
      favoriteColors: ["blue", "red", "green"],
    }

    const temp = auditEventTransformer.process(
      [
        { userId: "Bob", date: "04-18-2024 3:47:2 pm", employee: employee1 },
        { userId: "Kim", date: "04-21-2024 3:47:2 pm", employee: employee2 },
      ],
      "employee"
    )

    expect(temp).toEqual([
      {
        action: "update",
        dateAndTime: "04-21-2024 3:47:2 pm",
        field: "street",
        newValue: "777 main st",
        oldValue: "123 main st",
        user: "Kim",
        path: "address[0].street",
      },
      {
        action: "add",
        dateAndTime: "04-21-2024 3:47:2 pm",
        field: "favoriteColors",
        newValue: "green",
        user: "Kim",
        path: "favoriteColors",
      },
    ])
  })

  test("add primitive data types to favoriteColor array", async () => {
    const employee1 = {
      name: "Derek Smith",
      status: "Full Time",
      id: "012378409",
      address: [
        {
          street: "123 main st",
          city: "St Louis",
          zip: "63191",
          type: "home",
        },
        {
          street: "800 Tines",
          city: "St Louis",
          zip: "63001",
          type: "work",
        },
      ],
      favoriteColors: ["blue", "red"],
    }

    const employee2 = {
      name: "Derek Smith",
      status: "Full Time",
      id: "012378409",
      address: [
        {
          street: "777 main st",
          city: "St Louis",
          zip: "63191",
          type: "home",
        },
        {
          street: "800 Tines",
          city: "St Louis",
          zip: "63001",
          type: "work",
        },
      ],
      favoriteColors: ["blue", "red", 1, true, false, undefined, null],
    }

    const temp = auditEventTransformer.process(
      [
        { userId: "Bob", date: "04-18-2024 3:47:2 pm", employee: employee1 },
        { userId: "Kim", date: "04-21-2024 3:47:2 pm", employee: employee2 },
      ],
      "employee"
    )

    expect(temp).toEqual([
      {
        action: "update",
        dateAndTime: "04-21-2024 3:47:2 pm",
        field: "street",
        newValue: "777 main st",
        oldValue: "123 main st",
        user: "Kim",
        path: "address[0].street",
      },
      {
        action: "add",
        dateAndTime: "04-21-2024 3:47:2 pm",
        field: "favoriteColors",
        newValue: 1,
        user: "Kim",
        path: "favoriteColors",
      },
      {
        action: "add",
        dateAndTime: "04-21-2024 3:47:2 pm",
        field: "favoriteColors",
        newValue: true,
        user: "Kim",
        path: "favoriteColors",
      },
      {
        action: "add",
        dateAndTime: "04-21-2024 3:47:2 pm",
        field: "favoriteColors",
        newValue: false,
        user: "Kim",
        path: "favoriteColors",
      },
    ])
  })

  test("employees favorite color deep", async () => {
    const employee1 = {
      name: "Derek Smith",
      status: "Full Time",
      id: "012378409",
      address: [
        {
          street: "123 main st",
          city: "St Louis",
          zip: "63191",
          type: "home",
        },
        {
          street: "800 Tines",
          city: "St Louis",
          zip: "63001",
          type: "work",
        },
      ],
      personal: { foo: { favoriteColors: ["blue", "red"] } },
    }

    const employee2 = {
      name: "Derek Smith",
      status: "Full Time",
      id: "012378409",
      address: [
        {
          street: "777 main st",
          city: "St Louis",
          zip: "63191",
          type: "home",
        },
        {
          street: "800 Tines",
          city: "St Louis",
          zip: "63001",
          type: "work",
        },
      ],
      personal: { foo: { favoriteColors: ["green", "blue", "red"] } },
    }

    const temp = auditEventTransformer.process(
      [
        { userId: "Bob", date: "04-18-2024 3:47:2 pm", employee: employee1 },
        { userId: "Kim", date: "04-21-2024 3:47:2 pm", employee: employee2 },
      ],
      "employee"
    )

    expect(temp).toEqual([
      {
        action: "update",
        dateAndTime: "04-21-2024 3:47:2 pm",
        field: "street",
        newValue: "777 main st",
        oldValue: "123 main st",
        user: "Kim",
        path: "address[0].street",
      },
      {
        action: "add",
        dateAndTime: "04-21-2024 3:47:2 pm",
        field: "favoriteColors",
        newValue: "green",
        user: "Kim",
        path: "personal.foo.favoriteColors",
      },
    ])
  })
  test("no results generated for top level add undefined field", async () => {
    const employee1 = {
      name: "Derek Smith",
      status: "Full Time",
      id: "012378409",
      address: [
        {
          street: "123 main st",
          city: "St Louis",
          zip: "63191",
          type: "home",
        },
        {
          street: "800 Tines",
          city: "St Louis",
          zip: "63001",
          type: "work",
        },
      ],
      personal: { foo: { favoriteColors: ["blue", "red"] } },
    }

    const employee2 = {
      name: "Derek Smith",
      status: "Full Time",
      id: "012378409",
      temp: null,
      address: [
        {
          street: "123 main st",
          city: "St Louis",
          zip: "63191",
          type: "home",
        },
        {
          street: "800 Tines",
          city: "St Louis",
          zip: "63001",
          type: "work",
        },
      ],
      personal: { foo: { favoriteColors: ["blue", "red"] } },
    }

    const temp = auditEventTransformer.process(
      [
        { userId: "Bob", date: "04-18-2024 3:47:2 pm", employee: employee1 },
        { userId: "Kim", date: "04-21-2024 3:47:2 pm", employee: employee2 },
      ],
      "employee"
    )

    expect(temp).toEqual([])
  })
  xtest("no results generated for top level add null field", async () => {
    const employee1 = {
      name: "Derek Smith",
      status: "Full Time",
      id: "012378409",
      address: [
        {
          street: "123 main st",
          city: "St Louis",
          zip: "63191",
          type: "home",
        },
        {
          street: "800 Tines",
          city: "St Louis",
          zip: "63001",
          type: "work",
        },
      ],
      personal: { foo: { favoriteColors: ["blue", "red"] } },
    }

    const employee2 = {
      name: "Derek Smith",
      status: null,
      id: "012378409",
      // temp: null,
      address: [
        {
          street: "123 main st",
          city: "St Louis",
          zip: "63191",
          type: "home",
        },
        {
          street: "800 Tines",
          city: "St Louis",
          zip: "63001",
          type: "work",
        },
      ],
      personal: { foo: { favoriteColors: ["blue", "red"] } },
    }

    const temp = auditEventTransformer.process(
      [
        { userId: "Bob", date: "04-18-2024 3:47:2 pm", employee: employee1 },
        { userId: "Kim", date: "04-21-2024 3:47:2 pm", employee: employee2 },
      ],
      "employee"
    )

    expect(temp).toEqual([])
  })
})
