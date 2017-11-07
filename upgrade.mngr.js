/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('upgrade.mngr');
 * mod.thing == 'a thing'; // true
 */

const spawnRoom = Game.spawns.Spawn1.room;
var creepUtils = require('creep.utils');

module.exports = {
    roomSources: spawnRoom.find(FIND_SOURCES),
    upgraders: creepUtils.findAllCreepsOfRoleInRoom('upgrader', spawnRoom),
    reprogram: function () {
        this.upgraders = creepUtils.findAllCreepsOfRoleInRoom('upgrader', spawnRoom);
        
        this.roomSources = spawnRoom.find(FIND_SOURCES);
        if (this.roomSources.length) {
            creepsPerSource = Math.ceil(this.upgraders.length / this.roomSources.length);
        }
        
        this.roomSources.forEach((source, index)=>{
            var upgraders = this.upgraders.slice(creepsPerSource*index, creepsPerSource*index+creepsPerSource);
            upgraders.forEach((upgrader)=>{
                if (upgrader.memory.targetSourceId !== source.id) {
                    upgrader.memory.targetSourceId = source.id;
                    upgrader.say('new src');
                }
            });
        });
        
    },
    run: function () {
        if (Game.time % 5 === 3) {
            this.reprogram();
        }
    }
};