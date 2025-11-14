// Copyright IBM Corp. 2016. All Rights Reserved.
// Node module: loopback-datasource-juggler
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
'use strict';

var should = require('./init.js');
var DataSource = require('../lib/datasource.js').DataSource;

describe('DataSource', function() {
  it('reports helpful error when connector init throws', function() {
    var throwingConnector = {
      name: 'loopback-connector-throwing',
      initialize: function(ds, cb) {
        throw new Error('expected test error');
      },
    };

    (function() {
      // this is what LoopBack does
      return new DataSource({
        name: 'dsname',
        connector: throwingConnector,
      });
    }).should.throw(/loopback-connector-throwing/);
  });

  it('reports helpful error when connector init via short name throws', function() {
    (function() {
      // this is what LoopBack does
      return new DataSource({
        name: 'dsname',
        connector: 'throwing',
      });
    }).should.throw(/expected test error/);
  });

  it('reports helpful error when connector init via long name throws', function() {
    (function() {
      // this is what LoopBack does
      return new DataSource({
        name: 'dsname',
        connector: 'loopback-connector-throwing',
      });
    }).should.throw(/expected test error/);
  });
  describe('getMaxOfflineRequests', () => {
    let ds;
    beforeEach(() => ds = new DataSource('ds', {connector: 'memory'}));

    it('sets the default maximum number of event listeners to 16', () => {
      ds.getMaxOfflineRequests().should.be.eql(16);
    });

    it('uses provided number of listeners', () => {
      ds.settings.maxOfflineRequests = 17;
      ds.getMaxOfflineRequests().should.be.eql(17);
    });

    it('throws an error if a non-number is provided for the max number of listeners', () => {
      ds.settings.maxOfflineRequests = '17';

      (function() {
        return ds.getMaxOfflineRequests();
      }).should.throw('maxOfflineRequests must be a number');
    });
  });
});
