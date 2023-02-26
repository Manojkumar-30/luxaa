// Three js code for landing banner animation--
const nearDist = 0.1;
const farDist = 10000;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	nearDist,
	farDist
);
camera.position.x = farDist * -3;
camera.position.z = 500;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#000000"); // Backgrond Color - Blue
renderer.setPixelRatio(window.devicePixelRatio); // For HiDPI devices to prevent bluring output canvas
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector("#canvas-wrapper").appendChild(renderer.domElement);

// CREATE CUBES
const cubeSize = 10;
const geometry = new THREE.BoxBufferGeometry(cubeSize, cubeSize, cubeSize); // BufferAttribute allows for more efficient passing of data to the GPU
const material = new THREE.MeshNormalMaterial(); // Maps the normal vectors to RGB colors
const group = new THREE.Group();
for (let i = 0; i < 550; i++) {
	const mesh = new THREE.Mesh(geometry, material);
	const dist = farDist / 3;
	const distDouble = dist * 2;
	const tau = 2 * Math.PI; // One turn

	mesh.position.x = Math.random() * distDouble - dist;
	mesh.position.y = Math.random() * distDouble - dist;
	mesh.position.z = Math.random() * distDouble - dist;
	mesh.rotation.x = Math.random() * tau;
	mesh.rotation.y = Math.random() * tau;
	mesh.rotation.z = Math.random() * tau;

	// Manually control when 3D transformations recalculation occurs for better performance
	mesh.matrixAutoUpdate = false;
	mesh.updateMatrix();

	group.add(mesh);
}
scene.add(group);

// CREATE TYPOGRAPHY
const loader = new THREE.FontLoader();
const textMesh = new THREE.Mesh();
const createTypo = font => {
	// const word = "LUXAA";
	const typoProperties = {
		font: font,
		size: cubeSize,
		height: cubeSize / 5,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 10,
		bevelSize: 6,
		bevelOffset: 1,
		bevelSegments: 8
	};
	const text = new THREE.TextGeometry(word, typoProperties);
	textMesh.geometry = text;
	textMesh.material = material;
	textMesh.position.x = cubeSize * -2;
	textMesh.position.z = cubeSize * -1;
	scene.add(textMesh);
};
loader.load(
	"https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
	createTypo
);

// CREATE PART OF THE MOUSE/TOUCH OVER EFFECT
let mouseX = 0;
let mouseY = 0;
const mouseFX = {
	windowHalfX: window.innerWidth / 2,
	windowHalfY: window.innerHeight / 2,
	coordinates: function(coordX, coordY) {
		mouseX = (coordX - mouseFX.windowHalfX) * 10;
		mouseY = (coordY - mouseFX.windowHalfY) * 10;
	},
	onMouseMove: function(e) {
		mouseFX.coordinates(e.clientX, e.clientY);
	},
	onTouchMove: function(e) {
		mouseFX.coordinates(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
	}
};
document.addEventListener("mousemove", mouseFX.onMouseMove, false);
document.addEventListener("touchmove", mouseFX.onTouchMove, false);

// RENDER 3D GRAPHIC
const render = () => {
	requestAnimationFrame(render);

	// Camera animation
	// Works with onMouseMove and onTouchMove functions
	camera.position.x += (mouseX - camera.position.x) * 0.05;
	camera.position.y += (mouseY * -1 - camera.position.y) * 0.05;
	camera.lookAt(scene.position); // Rotates the object to face a point in world space

	const t = Date.now() * 0.001;
	const rx = Math.sin(t * 0.7) * 0.5;
	const ry = Math.sin(t * 0.3) * 0.5;
	const rz = Math.sin(t * 0.2) * 0.5;
	group.rotation.x = rx;
	group.rotation.y = ry;
	group.rotation.z = rz;
	textMesh.rotation.x = rx;
	textMesh.rotation.y = ry;
	textMesh.rotation.z = rx; // Happy accident :) 

	renderer.render(scene, camera);
};
render();



// Landing Shoe wiggle animation--
// get the image element
var img = document.getElementsByClassName("bannerShoe")[0];

// set initial position
var xPos = 0;
var yPos = 0;

// add mousemove event listener
document.addEventListener("mousemove", function(event) {
  // calculate new position based on mouse movement
  xPos = event.clientX / window.innerWidth - 0.5;
  yPos = event.clientY / window.innerHeight - 0.5;

  // apply the new position to the image element
  img.style.transform = "translate(" + xPos * 20 + "px, " + yPos * 20 + "px) rotate(" + xPos * 20 + "deg)";
});


// Scrroll Zoom animation--
const banner = document.querySelector('.landingcontent');
window.addEventListener('scroll', () => {
  const scrollPosition = window.pageYOffset;
  banner.style.transform = `translateY(-${scrollPosition}px) scale(${1 + scrollPosition/350})`;
});


// Carousel active--
$(".option").click(function () {
	$(".option").removeClass("active");
	$(this).addClass("active");
 });



// Large Text Scroll Animation--
 $(document).ready(function () {
	var containers = $(".container1");
  
	if (containers.length) {
	  containers.each(function () {
		var container = $(this);
  
		// Support small text - copy to fill screen width
		if (container.find(".scrolling-text").outerWidth() < $(window).width()) {
		  var windowToScrolltextRatio = Math.round(
			  $(window).width() / container.find(".scrolling-text").outerWidth()
			),
			scrollTextContent = container
			  .find(".scrolling-text .scrolling-text-content")
			  .text(),
			newScrollText = "";
		  for (var i = 0; i < windowToScrolltextRatio; i++) {
			newScrollText += " " + scrollTextContent;
		  }
		  container
			.find(".scrolling-text .scrolling-text-content")
			.text(newScrollText);
		}
  
		// Init variables and config
		var scrollingText = container.find(".scrolling-text"),
		  scrollingTextWidth = scrollingText.outerWidth(),
		  scrollingTextHeight = scrollingText.outerHeight(true),
		  startLetterIndent =
			parseInt(
			  scrollingText.find(".scrolling-text-content").css("font-size"),
			  10
			) / 4.8,
		  startLetterIndent = Math.round(startLetterIndent),
		  scrollAmountBoundary = Math.abs($(window).width() - scrollingTextWidth),
		  transformAmount = 0,
		  leftBound = 0,
		  rightBound = scrollAmountBoundary,
		  transformDirection = container.hasClass("left-to-right") ? -1 : 1,
		  transformSpeed = 200;
  
		// Read transform speed
		if (container.attr("speed")) {
		  transformSpeed = container.attr("speed");
		}
  
		// Make scrolling text copy for scrolling infinity
		container.append(scrollingText.clone().addClass("scrolling-text-copy"));
		container.find(".scrolling-text").css({ position: "absolute", left: 0 });
		container.css("height", scrollingTextHeight);
  
		var getActiveScrollingText = function (direction) {
		  var firstScrollingText = container.find(".scrolling-text:nth-child(1)");
		  var secondScrollingText = container.find(
			".scrolling-text:nth-child(2)"
		  );
  
		  var firstScrollingTextLeft = parseInt(
			container.find(".scrolling-text:nth-child(1)").css("left"),
			10
		  );
		  var secondScrollingTextLeft = parseInt(
			container.find(".scrolling-text:nth-child(2)").css("left"),
			10
		  );
  
		  if (direction === "left") {
			return firstScrollingTextLeft < secondScrollingTextLeft
			  ? secondScrollingText
			  : firstScrollingText;
		  } else if (direction === "right") {
			return firstScrollingTextLeft > secondScrollingTextLeft
			  ? secondScrollingText
			  : firstScrollingText;
		  }
		};
  
		$(window).on("wheel", function (e) {
		  var delta = e.originalEvent.deltaY;
  
		  if (delta > 0) {
			// going down
			transformAmount += transformSpeed * transformDirection;
			container
			  .find(".scrolling-text .scrolling-text-content")
			  .css("transform", "skewX(10deg)");
		  } else {
			transformAmount -= transformSpeed * transformDirection;
			container
			  .find(".scrolling-text .scrolling-text-content")
			  .css("transform", "skewX(-10deg)");
		  }
		  setTimeout(function () {
			container
			  .find(".scrolling-text")
			  .css(
				"transform",
				"translate3d(" + transformAmount * -1 + "px, 0, 0)"
			  );
		  }, 10);
		  setTimeout(function () {
			container
			  .find(".scrolling-text .scrolling-text-content")
			  .css("transform", "skewX(0)");
		  }, 500);
  
		  // Boundaries
		  if (transformAmount < leftBound) {
			var activeText = getActiveScrollingText("left");
			activeText.css({
			  left:
				Math.round(leftBound - scrollingTextWidth - startLetterIndent) +
				"px"
			});
			leftBound = parseInt(activeText.css("left"), 10);
			rightBound =
			  leftBound +
			  scrollingTextWidth +
			  scrollAmountBoundary +
			  startLetterIndent;
		  } else if (transformAmount > rightBound) {
			var activeText = getActiveScrollingText("right");
			activeText.css({
			  left:
				Math.round(
				  rightBound +
					scrollingTextWidth -
					scrollAmountBoundary +
					startLetterIndent
				) + "px"
			});
			rightBound += scrollingTextWidth + startLetterIndent;
			leftBound =
			  rightBound -
			  scrollingTextWidth -
			  scrollAmountBoundary -
			  startLetterIndent;
		  }
		});
	  });
	}
  });
  

//   cards
/*--------------------
Vars
--------------------*/
let progress = 0;
let startX = 0;
let active = 0;
let isDown = false;

/*--------------------
Contants
--------------------*/
const speedWheel = 0.02;
const speedDrag = -0.1;

/*--------------------
Get Z
--------------------*/
const getZindex = (array, index) =>
  array.map((_, i) =>
    index === i ? array.length : array.length - Math.abs(index - i)
  );

/*--------------------
Items
--------------------*/
const $items = document.querySelectorAll(".carousels-items");
const $cursors = document.querySelectorAll(".cursor");

const displayItems = (item, index, active) => {
  const zIndex = getZindex([...$items], active)[index];
  item.style.setProperty("--zIndex", zIndex);
  item.style.setProperty("--active", (index - active) / $items.length);
};

/*--------------------
Animate
--------------------*/
const animate = () => {
  progress = Math.max(0, Math.min(progress, 100));
  active = Math.floor((progress / 100) * ($items.length - 1));

  $items.forEach((item, index) => displayItems(item, index, active));
};
animate();

/*--------------------
Click on Items
--------------------*/
$items.forEach((item, i) => {
  item.addEventListener("click", () => {
    progress = (i / $items.length) * 100 + 10;
    animate();
  });
});

/*--------------------
Handlers
--------------------*/
const handleWheel = (e) => {
  const wheelProgress = e.deltaY * speedWheel;
  progress = progress + wheelProgress;
  animate();
};

const handleMouseMove = (e) => {
  if (e.type === "mousemove") {
    $cursors.forEach(($cursor) => {
      $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
  }
  if (!isDown) return;
  const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  const mouseProgress = (x - startX) * speedDrag;
  progress = progress + mouseProgress;
  startX = x;
  animate();
};

const handleMouseDown = (e) => {
  isDown = true;
  startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
};

const handleMouseUp = () => {
  isDown = false;
};

/*--------------------
Listeners
--------------------*/
document.addEventListener("mousewheel", handleWheel);
document.addEventListener("mousedown", handleMouseDown);
document.addEventListener("mousemove", handleMouseMove);
document.addEventListener("mouseup", handleMouseUp);
document.addEventListener("touchstart", handleMouseDown);
document.addEventListener("touchmove", handleMouseMove);
document.addEventListener("touchend", handleMouseUp);



// video Player
/* Get Elements */
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const controls = player.querySelector(".player__controls");
const progresss = player.querySelector(".progresss");
const progressBar = player.querySelector(".progress__filled");
const toggleButton = player.querySelector(".togglePlayback");
const volume = player.querySelector(".playerVolume");
const speed = player.querySelector(".playerSpeed");
const fullscreen = player.querySelector(".toggleFullscreen");

/* Functions */
function togglePlay() {
 const icon = toggleButton.querySelector(".player__playbackIcon");
 video.paused ? video.play() : video.pause();
 icon.classList.toggle("player__playbackIcon--paused");
}

function handleRangeUpdate() {
 video[this.name] = this.value;
}

function handleProgress() {
 const percent = video.currentTime / video.duration * 100;
 progressBar.style.flexBasis = `${percent}%`;
}

function handleSeek(e) {
 const seekTime = e.offsetX / progress.offsetWidth * video.duration;
 video.currentTime = seekTime;
}

// Create fullscreen video button
function toggleFullscreen() {
 if (!document.webkitFullscreenElement) {
  if (video.requestFullScreen) {
   player.requestFullScreen();
  } else if (video.webkitRequestFullScreen) {
   player.webkitRequestFullScreen();
  } else if (video.mozRequestFullScreen) {
   player.mozRequestFullScreen();
  }
 } else {
  document.webkitExitFullscreen();
 }
}

var countrolsHideTimeout;
function toggleControls() {
 if (!video.paused) {
  clearTimeout(countrolsHideTimeout);
  controls.classList.add("player__controls--visible");
  countrolsHideTimeout = setTimeout(() => {
   controls.classList.remove("player__controls--visible");
  }, 3000);
 }
}

/* Hook up the event listeners */

video.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", handleProgress);

toggleButton.addEventListener("click", togglePlay);
volume.addEventListener("change", handleRangeUpdate);
volume.addEventListener("mousemove", handleRangeUpdate);
speed.addEventListener("change", handleRangeUpdate);

let mousedown = false;
progress.addEventListener("click", handleSeek);
progress.addEventListener("mousemove", e => mousedown && handleSeek(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));

fullscreen.addEventListener("click", toggleFullscreen);
video.addEventListener("dblclick", toggleFullscreen);

video.addEventListener("mousemove", toggleControls);
controls.addEventListener("mouseover", () => {
 clearTimeout(countrolsHideTimeout);
});
