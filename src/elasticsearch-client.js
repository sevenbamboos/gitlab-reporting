const { Client } = require('@elastic/elasticsearch');

exports.createElasticSearchClient = function(url) {
    return new Client({ node: url });
};


