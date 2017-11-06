/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('upgrade.mngr');
 * mod.thing == 'a thing'; // true
 */

const spawnRoom = Game.spawns.Spawn1.room;

module.exports = {
    roomSources: spawnRoom.find(FIND_SOURCES),
    upgraders: spawnRoom.find(FIND_MY_CREEPS, {filter: (object) => object.memory.role == 'upgrader'}),
    reprogram: function () {
        this.upgraders = spawnRoom.find(FIND_MY_CREEPS, {filter: (object) => object.memory.role == 'upgrader'});
        
        this.roomSources = spawnRoom.find(FIND_SOURCES);
        if (this.roomSources.length) {
            creepsPerSource = Math.ceil(this.upgraders.length / this.roomSources.length);
        }
        
        this.roomSources.forEach((source, index)=>{
            var upgraders = this.upgraders.slice(creepsPerSource*index, creepsPerSource*index+creepsPerSource);
            upgraders.forEach((upgrader)=>{
                if (upgrader.memory.targetSourceId !== source.id) {
                    upgrader.memory.targetSourceId = source.id;
                    upgrader.memory.targetStoreId = null;
                    upgrader.say('new src');
                }
            });
            // console.log('redirected ' + sourceHarvesters.length+ ' out of ' + this.harvesters.length, 'harvs to', source, creepsPerSource*index, creepsPerSource*index+creepsPerSource, this.harvesters)
        });
        
    },
    run: function () {
        if (Game.time % 5 === 1) {
            this.reprogram();
        }
    }
};