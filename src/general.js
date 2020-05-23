module.exports.init = () => {
    let harvesterTarget = new Set();
    Object.entries(Game.spawns).forEach(([spawnName, spawnObject]) => {
        harvesterTarget.add(spawnObject.id);
        spawnObject.memory.source = new Object();
        spawnObject.memory.source[spawnObject.id] = spawnObject.pos.findClosestByPath(FIND_SOURCES, {ignoreCreeps: true}).id;
        spawnObject.room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_EXTENSION}})
                .forEach((extensionObject) => {
            spawnObject.memory.source[extensionObject.id] = extensionObject.pos.findClosestByPath(FIND_SOURCES, {ignoreCreeps: true}).id;
            harvesterTarget.add(extensionObject.id);
        });
    });
    
    let targets = new Object();
    harvesterTarget.forEach(i => targets[i] = 0);
    
    Memory.targets = new Object();
    Memory.targets["harvester"] = targets;

};
