'use strict';

function Robot() {
  this.bearing = 'north';
  this.directions = ['north', 'east', 'south', 'west'];
  this.coordinates = [0, 0];

}


Robot.prototype.orient = function(direction){
  if (this.directions.includes(direction)){
    this.bearing = direction;
  } else {
    throw new Error("Invalid Robot Bearing");
    }
  };

Robot.prototype.turnRight = function(){
  switch(this.bearing) {
     case 'north':
       this.bearing = 'east';
       break;
     case 'east':
       this.bearing = 'south';
       break;
     case 'south':
       this.bearing = 'west';
       break;
     case 'west':
       this.bearing = 'north';
       break;
   }
};

Robot.prototype.turnLeft = function(){
  switch(this.bearing) {
     case 'north':
       this.bearing = 'west';
       break;
     case 'east':
       this.bearing = 'north';
       break;
     case 'south':
       this.bearing = 'east';
       break;
     case 'west':
       this.bearing = 'south';
       break;
   }
};

Robot.prototype.at = function (x, y) {
  this.coordinates = [x, y];
};

Robot.prototype.advance = function () {
  if(this.bearing === 'north'){
    this.coordinates[1]+=1;
  } else if(this.bearing === 'east'){
    this.coordinates[0]+=1;
  } else if(this.bearing === 'south'){
    this.coordinates[1]-=1;
  } else if(this.bearing === 'west'){
    this.coordinates[0]-=1;
  }
};

Robot.prototype.instructions = function (instructions) {
  var results = []
  var instructionArr = instructions.split("");
  instructionArr.forEach(instruction =>{
    if(instruction === 'L'){
      results.push('turnLeft');
    } else if (instruction === 'R'){
      results.push('turnRight');
    } else if (instruction === 'A'){
      results.push('advance');
    }
  });
  return results;
};

Robot.prototype.place = function (options) {
  this.coordinates = [options.x, options.y];
  this.bearing = options.direction;
};

Robot.prototype.evaluate = function (options) {
  this.instructions(options).forEach(instruction => {
    this[instruction]();
  });

};
