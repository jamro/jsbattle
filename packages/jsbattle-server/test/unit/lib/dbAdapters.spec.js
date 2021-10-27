const { ServiceBroker } = require('moleculer');
const DbService = require('moleculer-db');
const _ = require("lodash");

expect.extend({
  toContainEntity(received, pattern) {
    const result = received.find(element => _.isMatch(element, pattern))
    if(result) {
      return {
        message: () => () =>
          `pattern ${JSON.stringify(pattern)} found in ${JSON.stringify(received)}}`,
        pass: true,
      };
    }
    return {
      message: () => () =>
        `pattern ${JSON.stringify(pattern)} not found in ${JSON.stringify(received)}}`,
      pass: false,
    };
  }
});

function getAdapter(name) {
  switch(name) {
    case 'default': 
      return undefined;
    default:
      throw new Error(`${name} adapter is not supported`)
  }
}

function createTestService(broker, dbAdapter) {
  broker.createService({
    name: 'testDbService',
    mixins: [DbService],
    adapter: dbAdapter,
  });
}

const adapterList = [
  'default'
];

for(let adapterName of adapterList) {
  describe(`Test '${adapterName}' DB adapter`, () => {

    it(`should initialize`, async () => {
      const broker = new ServiceBroker({logger: false});
      const db = getAdapter(adapterName)
      const service = createTestService(broker, db)

      await broker.start();
    });

    it(`should create item`, async () => {
      const broker = new ServiceBroker({logger: false});
      const db = getAdapter(adapterName)
      const service = createTestService(broker, db)

      const now = new Date();

      await broker.start();
      const newItem = await broker.call('testDbService.create', {
        foo: 'bar8732',
        yes: true,
        val: -34.5,
        when: now,
        blob: { foo: 1523, bar: 'ABC'}
      });
      expect(newItem).toHaveProperty('_id');
      expect(newItem).toHaveProperty('foo', 'bar8732');
      expect(newItem).toHaveProperty('yes', true);
      expect(newItem).toHaveProperty('val', -34.5);
      expect(newItem).toHaveProperty('when');
      expect(newItem.when.getTime()).toBe(now.getTime())
      expect(newItem).toHaveProperty('blob');
      expect(newItem.blob).toHaveProperty('foo', 1523);
      expect(newItem.blob).toHaveProperty('bar', 'ABC');

      const retrievedItem = await broker.call('testDbService.get', {id: newItem._id});

      expect(retrievedItem).toHaveProperty('_id');
      expect(retrievedItem).toHaveProperty('foo', 'bar8732');
      expect(retrievedItem).toHaveProperty('yes', true);
      expect(retrievedItem).toHaveProperty('val', -34.5);
      expect(retrievedItem).toHaveProperty('when');
      expect(retrievedItem.when.getTime()).toBe(now.getTime())
      expect(retrievedItem).toHaveProperty('blob');
      expect(retrievedItem.blob).toHaveProperty('foo', 1523);
      expect(retrievedItem.blob).toHaveProperty('bar', 'ABC');
    });

    it(`should create multiple items`, async () => {
      const broker = new ServiceBroker({logger: false});
      const db = getAdapter(adapterName)
      const service = createTestService(broker, db)

      await broker.start();
      const newItems = await broker.call('testDbService.insert', {entities: [{foo: 'bar001'}, {foo: 'bar002'}]});
      const newItem = await broker.call('testDbService.insert', {entity: {foo: 'bar003'}});
      const items = await broker.call('testDbService.find');
      expect(items).toHaveLength(3)
      expect(newItems).toHaveLength(2)
      expect(newItem).toHaveProperty('_id')
      expect(newItem).toHaveProperty('foo', 'bar003')
    });

    it(`should get item by ID`, async () => {
      const broker = new ServiceBroker({logger: false});
      const db = getAdapter(adapterName)
      const service = createTestService(broker, db)

      await broker.start();
      const newItem = await broker.call('testDbService.create', {foo: 'bar1991'});
      const item = await broker.call('testDbService.get', {id: newItem._id});
      expect(item).toHaveProperty('foo', 'bar1991');

      expect(broker.call('testDbService.get', {id: 'not-a-good-id'})).rejects.toThrow(/not found/)
    });

    it(`should remove item`, async () => {
      const broker = new ServiceBroker({logger: false});
      const db = getAdapter(adapterName)
      const service = createTestService(broker, db)

      await broker.start();
      const newItems = await broker.call('testDbService.insert', {entities: [
        {foo: 'bar510'}, 
        {foo: 'bar511'}
      ]});
      await broker.call('testDbService.remove', {id: newItems[0]._id});
      const items = await broker.call('testDbService.find');
      expect(items).toHaveLength(1)
      expect(items[0]).toHaveProperty('foo', newItems[1].foo)
    });

    it(`should update item`, async () => {
      const broker = new ServiceBroker({logger: false});
      const db = getAdapter(adapterName)
      const service = createTestService(broker, db)

      await broker.start();
      const newItem = await broker.call('testDbService.create', {foo: 'bar00122', alpha: 1000});
      const updatedItem = await broker.call('testDbService.update', {id: newItem._id, alpha: 123});
      const items = await broker.call('testDbService.find');
      expect(items).toHaveLength(1)
      expect(items[0]).toHaveProperty('_id');
      expect(items[0]).toHaveProperty('foo', 'bar00122');
      expect(items[0]).toHaveProperty('alpha', 123);
      expect(updatedItem).toHaveProperty('_id');
      expect(updatedItem).toHaveProperty('foo', 'bar00122');
      expect(updatedItem).toHaveProperty('alpha', 123);
      expect(newItem).toHaveProperty('_id');
      expect(newItem).toHaveProperty('foo', 'bar00122');
      expect(newItem).toHaveProperty('alpha', 1000);
    });

    it(`should get multiple items by ID`, async () => {
      const broker = new ServiceBroker({logger: false});
      const db = getAdapter(adapterName)
      const service = createTestService(broker, db)

      await broker.start();
      const newItems = await broker.call('testDbService.insert', {entities: [{foo: 'bar3001'}, {foo: 'bar3002'}, {foo: 'bar3003'}]});
      const items = await broker.call('testDbService.get', {id: [newItems[0]._id, newItems[1]._id]});
      expect(items).toHaveLength(2);
    });

    it(`should limit found items`, async () => {
      const broker = new ServiceBroker({logger: false});
      const db = getAdapter(adapterName)
      const service = createTestService(broker, db)

      await broker.start();
      await broker.call('testDbService.create', {foo: 'bar221'});
      await broker.call('testDbService.create', {foo: 'bar222'});
      await broker.call('testDbService.create', {foo: 'bar223'});
      const items = await broker.call('testDbService.find', {limit: 2});
      expect(items).toHaveLength(2)
    });

    it(`should sort found items`, async () => {
      const broker = new ServiceBroker({logger: false});
      const db = getAdapter(adapterName)
      const service = createTestService(broker, db)

      await broker.start();
      await broker.call('testDbService.create', {foo: 'bar92', value: 4});
      await broker.call('testDbService.create', {foo: 'bar70', value: -30});
      await broker.call('testDbService.create', {foo: 'bar23', value: 12});

      let items = await broker.call('testDbService.find', {sort: 'value'});
      expect(items).toHaveLength(3)
      expect(items[0]).toHaveProperty('foo', 'bar70');
      expect(items[1]).toHaveProperty('foo', 'bar92');
      expect(items[2]).toHaveProperty('foo', 'bar23');

      items = await broker.call('testDbService.find', {sort: '-value'});
      expect(items).toHaveLength(3)
      expect(items[2]).toHaveProperty('foo', 'bar70');
      expect(items[1]).toHaveProperty('foo', 'bar92');
      expect(items[0]).toHaveProperty('foo', 'bar23');
    });

    it(`should paginate found items`, async () => {
      const broker = new ServiceBroker({logger: false});
      const db = getAdapter(adapterName)
      const service = createTestService(broker, db)

      await broker.start();
      await broker.call('testDbService.create', [
        {foo: 'bar11020'}, 
        {foo: 'bar11021'},
        {foo: 'bar11022'},
        {foo: 'bar11023'},
        {foo: 'bar11024'},
        {foo: 'bar11025'},
      ]);

      const all = await broker.call('testDbService.find');
      const page1 = await broker.call('testDbService.find', {limit: 4, offset: 0});
      const page2 = await broker.call('testDbService.find', {limit: 4, offset: 4});
      expect(page1).toHaveLength(4)
      expect(page2).toHaveLength(2)
      expect(page1[0]).toHaveProperty('foo', all[0].foo);
      expect(page1[1]).toHaveProperty('foo', all[1].foo);
      expect(page1[2]).toHaveProperty('foo', all[2].foo);
      expect(page1[3]).toHaveProperty('foo', all[3].foo);
      expect(page2[0]).toHaveProperty('foo', all[4].foo);
      expect(page2[1]).toHaveProperty('foo', all[5].foo);
    });

    it(`should paginate listed items`, async () => {
      const broker = new ServiceBroker({logger: false});
      const db = getAdapter(adapterName)
      const service = createTestService(broker, db)

      await broker.start();
      await broker.call('testDbService.create', [
        {foo: 'bar11020'}, 
        {foo: 'bar11021'},
        {foo: 'bar11022'},
        {foo: 'bar11023'},
        {foo: 'bar11024'},
        {foo: 'bar11025'},
      ]);

      const all = await broker.call('testDbService.find');
      const page1 = await broker.call('testDbService.list', {pageSize: 4, page: 1});
      const page2 = await broker.call('testDbService.list', {pageSize: 4, page: 2});
      expect(page1).toHaveProperty('rows');
      expect(page1).toHaveProperty('page', 1);
      expect(page1).toHaveProperty('pageSize', 4);
      expect(page1).toHaveProperty('total', 6);
      expect(page1).toHaveProperty('totalPages', 2);
      expect(page1.rows).toHaveLength(4);
      expect(page1.rows[0]).toHaveProperty('foo', all[0].foo);
      expect(page1.rows[1]).toHaveProperty('foo', all[1].foo);
      expect(page1.rows[2]).toHaveProperty('foo', all[2].foo);
      expect(page1.rows[3]).toHaveProperty('foo', all[3].foo);

      expect(page2).toHaveProperty('rows');
      expect(page2).toHaveProperty('page', 2);
      expect(page2).toHaveProperty('pageSize', 4);
      expect(page2).toHaveProperty('total', 6);
      expect(page2).toHaveProperty('totalPages', 2);
      expect(page2.rows).toHaveLength(2);
      expect(page2.rows[0]).toHaveProperty('foo', all[4].foo);
      expect(page2.rows[1]).toHaveProperty('foo', all[5].foo);
    });

    it(`should filter fields of found items`, async () => {
      const broker = new ServiceBroker({logger: false});
      const db = getAdapter(adapterName)
      const service = createTestService(broker, db)

      await broker.start();
      await broker.call('testDbService.create', {foo: 'bar710', alpha: 2, beta: 3});
      await broker.call('testDbService.create', {foo: 'bar711', alpha: 2, beta: 3});

      const items = await broker.call('testDbService.find', {fields: ['foo', 'beta']});
      expect(items).toHaveLength(2);
      expect(items[0]).not.toHaveProperty('alpha')
      expect(items[1]).not.toHaveProperty('alpha')
      expect(items[0]).toHaveProperty('beta', 3)
      expect(items[1]).toHaveProperty('beta', 3)
      expect(items[0]).toHaveProperty('foo')
      expect(items[1]).toHaveProperty('foo')
    });

    it(`should count items`, async () => {
      const broker = new ServiceBroker({logger: false});
      const db = getAdapter(adapterName)
      const service = createTestService(broker, db)

      await broker.start();
      await broker.call('testDbService.create', [
        {foo: 'bar9192'}, 
        {foo: 'bar9193'},
        {foo: 'bar9194'}
      ]);

      const count1 = await broker.call('testDbService.count');
      const count2 = await broker.call('testDbService.count', {query: { foo: { $in: ['bar9193', 'bar9194']}}});
      const count3 = await broker.call('testDbService.count', {query: { foo: "bar9193"}});

      expect(count1).toBe(3)
      expect(count2).toBe(2)
      expect(count3).toBe(1)
    });


    describe(`Test querying syntax`, () => {
      let broker;

      beforeAll(async () => {
        broker = new ServiceBroker({logger: false});
        const db = getAdapter(adapterName)
        const service = createTestService(broker, db)

        await broker.start();
        await broker.call('testDbService.create', {foo: 'bar14', version: 99, compressed: true});
        await broker.call('testDbService.create', {foo: 'bar15', version: 99, compressed: false});
        await broker.call('testDbService.create', {foo: 'bar16', version: 98, compressed: true});
        await broker.call('testDbService.create', {foo: 'bar17', version: 34, compressed: false, unique: 'alpha'});
        await broker.call('testDbService.create', {foo: 'bar18', version: 23, compressed: false});
        await broker.call('testDbService.create', {foo: 'bar19', version: 23, compressed: true});
        await broker.call('testDbService.create', {foo: 'bar20', version: 25, compressed: false});
        let items
      });
      
      it(`should query simple items`, async () => {
        let items = await broker.call('testDbService.find', {query: {version: 23}});
        expect(items).toContainEntity({foo: 'bar18'})
        expect(items).toContainEntity({foo: 'bar19'})
        expect(items).toHaveLength(2)
      });

      it(`should query items using $lt(e) operator`, async () => {
        let items = await broker.call('testDbService.find', {query: {version: {$lte: 25}}});
        expect(items).toHaveLength(3)
        expect(items).toContainEntity({foo: 'bar18'})
        expect(items).toContainEntity({foo: 'bar20'})
        expect(items).toContainEntity({foo: 'bar19'})

        items = await broker.call('testDbService.find', {query: {version: {$lt: 25}}});
        expect(items).toHaveLength(2)
        expect(items).toContainEntity({foo: 'bar18'})
        expect(items).toContainEntity({foo: 'bar19'})
      });

      it(`should query items using $gt(e) operator`, async () => {
        let items = await broker.call('testDbService.find', {query: {version: {$gte: 98}}});
        expect(items).toHaveLength(3)
        expect(items).toContainEntity({foo: 'bar14'})
        expect(items).toContainEntity({foo: 'bar15'})
        expect(items).toContainEntity({foo: 'bar16'})

        items = await broker.call('testDbService.find', {query: {version: {$gt: 98}}});
        expect(items).toHaveLength(2)
        expect(items).toContainEntity({foo: 'bar14'})
        expect(items).toContainEntity({foo: 'bar15'})
      });

      it(`should query items using multiple condition`, async () => {
        let items = await broker.call('testDbService.find', {query: {version: 99, compressed: false}});
        expect(items).toHaveLength(1)
        expect(items).toContainEntity({foo: 'bar15'})
      });

      it(`should query items using $and operator`, async () => {
        let items = await broker.call('testDbService.find', {query: { $and: [{version: 99}, {compressed: false}]}});
        expect(items).toHaveLength(1)
        expect(items).toContainEntity({foo: 'bar15'})
      });

      it(`should query items using $or operator`, async () => {
        let items = await broker.call('testDbService.find', {query: { $or: [{foo: 'bar15'}, {foo: 'bar20'}]}});
        expect(items).toHaveLength(2)
        expect(items).toContainEntity({foo: 'bar15'})
        expect(items).toContainEntity({foo: 'bar20'})
      });

      it(`should query items using $in operator`, async () => {
        let items = await broker.call('testDbService.find', {query: { version: { $in: [34, 25] }}});
        expect(items).toHaveLength(2)
        expect(items).toContainEntity({foo: 'bar17'})
        expect(items).toContainEntity({foo: 'bar20'})
      });

      it(`should query items using multiple logical operator`, async () => {
        let items = await broker.call('testDbService.find', {
          query: { 
            $or: [
              {
                $and: [
                  {foo: 'bar17'},
                  {$not: {compressed: true}}
                ]
              },
              {
                foo: {
                  $in: ['bar0', 'bar19']
                }
              }
            ]
          }
        });
        expect(items).toHaveLength(2)
        expect(items).toContainEntity({foo: 'bar17'})
        expect(items).toContainEntity({foo: 'bar19'})
      });

      it(`should query items using $exists operator`, async () => {
        let items = await broker.call('testDbService.find', {query: { unique: { $exists: true }}});
        expect(items).toHaveLength(1)
        expect(items).toContainEntity({foo: 'bar17'})

        items = await broker.call('testDbService.find', {query: { unique: { $exists: false }}});
        expect(items).toHaveLength(6)
        expect(items).not.toContainEntity({foo: 'bar17'})
      });

    });

  });
}