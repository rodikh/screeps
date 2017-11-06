
var breeder = require('breeder');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleTower = require('role.tower');
var defence = require('defence');
var memUtils = require('memory.utils');


var energyManager = require('energy.mngr');
var buildManager = require('build.mngr');
var constructionManager = require('construction.mngr');
var upgradeManager = require('upgrade.mngr');

// constructionManager.buildRoadToAllSources()

module.exports.loop = function () {
    memUtils.clearDead();
    breeder.breed();
    energyManager.run();
    buildManager.run();
    upgradeManager.run();
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
    
    for(var name in Game.structures) {
        var structure = Game.structures[name];
        if(structure.structureType === STRUCTURE_TOWER) {
            roleTower.run(structure);
        }
    }
}

module.exports.buildExec = function () {
    constructionManager.buildRoadToAllSources();
}