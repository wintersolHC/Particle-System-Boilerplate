**Particle System Boilerplate**

Welcome to the Particle System Boilerplate repository! This project provides a simple and easy-to-use boilerplate code for creating particle systems using vanilla JavaScript and the HTML5 canvas element.

**Features**

- Vanilla JavaScript: No external libraries or frameworks required.
- Canvas API: Utilizes the HTML5 canvas element for rendering particles.
- Customizable Particle Settings:
    - Amount: Set the number of particles.
    - Speed: Control the speed of particle movement.
    - Size: Adjust the size of the particles.
    - Color: Change the color of the particles.
- Edge Collision: Particles bounce off the edges of the viewport.

**Usage**

To customize the particle system, you can modify the following variables inside the Cluster class of the particles.js file:
```
this.particleAmount = 10;
this.maxSpeed = 2;
this.particleRadius = 10;
this.particlesColor = "black";
```
Inside this same class, there's a time limit that you can disable at any time.
```
this.animationIsInfinite = false;
```
Once created an instance of class Cluster, the animation can be switched on and off with the following methods.
```
const cluster = new Cluster();
cluster.on(); // Starts animation & adds window event listener for resizing
// cluster.off() // Stops animation & removes window event listener for resizing
```

**Contributing**

Contributions are welcome! If you have any suggestions, bug reports, or improvements, please open an issue or submit a pull request.

License
This project is licensed under the MIT License. See the LICENSE file for more details.
