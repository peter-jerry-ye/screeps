let spawn = require("spawn");
let harvester = require("harvester");
let upgrader = require("upgrader");
let builder = require("builder");
let maintainer = require("maintainer");

let general = require("general");

general.init(); // should be executed every 10 ticks

module.exports.loop = function () {
	Object.entries(Game.spawns).forEach(
	    ([spawnName, spawnObject]) => spawn.job(spawnObject)
	);
	Object.entries(Game.creeps).forEach(
	    ([creepName, creepObject]) => {
	        switch(creepObject.memory.role) {
	            case "harvester":
	                harvester.job(creepObject);
	                break;
	            case "upgrader":
	                upgrader.job(creepObject);
	                break;
	            case "builder":
	                let buildList = creepObject.room.find(FIND_CONSTRUCTION_SITES);
	                if (buildList.length == 0) {
	                    maintainer.job(creepObject);
	                }
	                else {
	                    builder.job(creepObject);
	                }
	                break;
	            case "maintainer":
	                let maintainList = creepObject.room.find(FIND_STRUCTURES, {filter: object => object.hits < object.hitsMax});
	                if (maintainList.length == 0) {
	                    builder.job(creepObject);
	                }
	                else {
	                    maintainer.job(creepObject);
	                }
	                break;
	        }
	    }
	);
}
