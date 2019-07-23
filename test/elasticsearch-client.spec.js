const { createElasticSearchClient } = require('../src/elasticsearch-client');

const client = createElasticSearchClient('http://localhost:9200');

async function run() {
    await client.index({
        index: 'my-index',
        body: {
            id: 101,
            name: 'the first item'
        }
    });

    await client.index({
        index: 'my-index',
        body: {
            id: 102,
            name: 'the second item'
        }
    });

    await client.index({
        index: 'my-index',
        body: {
            id: 103,
            name: 'the third item'
        }
    });

    await client.indices.refresh({ index: 'my-index' });

    const { body } = await client.search({
        index: 'my-index',
        body: {
            query: {
                match: { name: 'item' }
            }
        }
    });

    console.log(body.hits.hits);
}

run().catch(console.error);

setTimeout(() => process.exit(0), 1000);
