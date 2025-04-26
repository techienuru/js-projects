class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkOpen;

  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
  }
  displayInfo() {
    console.log(
      `${this.#brand} ${this.#model}, Speed: ${
        this.speed
      } km/h -- Trunk Status: ${this.isTrunkOpen ? this.isTrunkOpen : false}`
    );
  }

  go() {
    if (!this.speed < 0 || !this.speed > 200 || !this.isTrunkOpen) {
      this.speed += 5;
    }
  }

  break() {
    if (!this.speed < 0 || !this.speed > 200) {
      this.speed -= 5;
    }
  }

  openTrunk() {
    if (this.speed === 0) {
      this.isTrunkOpen = true;
    }
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }
}

const firstCar = new Car({ brand: "Toyota", model: "Corolla" });
const secondCar = new Car({ brand: "Tesla", model: "Model 3" });

console.log(firstCar);
console.log(secondCar);

/*
firstCar.go(); // Add speed to the first car
secondCar.break(); // Tries to reduce speed of the second car to below 0
*/

/*
firstCar.go(); // Add speed to the first car
firstCar.openTrunk(); // Tries to open first Car trunk while car is moving
secondCar.openTrunk(); // Opens the second car trunk as car is not moving
*/

firstCar.openTrunk(); // Open the trunk of the first car
firstCar.go(); // Tries to move the car while the trunk is open

firstCar.displayInfo(); // Displays the Status of the 1st Car
secondCar.displayInfo(); // Displays the Status of the 2nd Car

class RaceCar extends Car {
  acceleration;

  constructor(carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }

  go() {
    if (!this.speed < 0 || !this.speed > 300) {
      this.speed += this.acceleration;
    }
  }

  openTrunk() {
    return;
  }

  closeTrunk() {
    return;
  }
}

const thirdCar = new RaceCar({
  brand: "McLaren",
  model: "F1",
  acceleration: 20
});

thirdCar.go();
