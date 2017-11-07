/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('enrgy.mgr');
 * mod.thing == 'a thing'; // true
 */

const spawnRoom = Game.spawns.Spawn1.room;
var creepsPerSource = 2;
var creepUtils = require('creep.utils');

module.exports = {
    roomSources: spawnRoom.find(FIND_SOURCES),
    harvesters: creepUtils.findAllCreepsOfRoleInRoom('harvester', spawnRoom),
    reprogram: function () {
        this.harvesters = creepUtils.findAllCreepsOfRoleInRoom('harvester', spawnRoom);
        
        this.roomSources = spawnRoom.find(FIND_SOURCES);
        if (this.roomSources.length) {
            creepsPerSource = Math.ceil(this.harvesters.length / this.roomSources.length);
        }

        this.roomSources.forEach((source, index)=>{
            var sourceHarvesters = this.harvesters.slice(creepsPerSource*index, creepsPerSource*index+creepsPerSource);
            sourceHarvesters.forEach((harvester)=>{
                if (harvester.memory.targetSourceId !== source.id) {
                    harvester.memory.targetSourceId = source.id;
                    harvester.say('new src');
                }
            });
        });
        
    },
    run: function () {
        if (Game.time % 5 === 1) {
            this.reprogram();
        }
    }
};