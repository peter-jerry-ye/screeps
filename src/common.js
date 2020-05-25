let harvesters = [];
let upgraders = [];
let builders = [];
let maintainers = [];

module.exports.init = () => {
    harvesters = Object.entries(Game.creeps).filter(([name, object]) => object.memory.role === "harvester");
	upgraders = Object.entries(Game.creeps).filter(([creepName, creepObject]) => creepObject.memory.role === 'upgrader');
	builders = Object.entries(Game.creeps).filter(([creepName, creepObject]) => creepObject.memory.role == 'builder');
	maintainers = Object.entries(Game.creeps).filter(([creepName, creepObject]) => creepObject.memory.role == 'maintainer');
}

module.exports.harvesters = harvesters;
module.exports.upgraders = upgraders;
module.exports.builders = builders;
module.exports.maintainers = maintainers;