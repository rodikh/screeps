/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('enrgy.mgr');
 * mod.thing == 'a thing'; // true
 */

const spawnRoom = Game.spawns.Spawn1.room;

module.exports = {
    roomSources: spawnRoom.find(FIND_SOURCES),
    harvesters: spawnRoom.find(FIND_MY_CREEPS, {filter: (object) => object.memory.role == 'harvester'}),
    reprogram: function () {
        this.harvesters = spawnRoom.find(FIND_MY_CREEPS, {filter: (object) => object.memory.role == 'harvester'});
        
        this.roomSources = spawnRoom.find(FIND_SOURCES);
        if (this.roomSources.length) {
            creepsPerSource = Math.ceil(this.harvesters.length / this.roomSources.length);
        }
        
        // this.roomSources = [Game.spawns.Spawn1.pos.findClosestByRange(FIND_SOURCES)];
        // var creepsPerSource = 3;
        
        this.roomSources.forEach((source, index)=>{
            var sourceHarvesters = this.harvesters.slice(creepsPerSource*index, creepsPerSource*index+creepsPerSource);
            sourceHarvesters.forEach((harvester)=>{
                if (harvester.memory.targetSourceId !== source.id) {
                    harvester.memory.targetSourceId = source.id;
                    harvester.memory.targetStoreId = null;
                    harvester.say('new src');
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