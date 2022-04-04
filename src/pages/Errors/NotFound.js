import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from '../../images/logo.png';

const NotFound = () => {
	const canvasRef = useCanvas(([canvas, ctx]) => {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		const balls = [];
		for (let i = 0; i < 10; i++) {
			let r = Math.floor(Math.random() * 25) + 15;
			let x = Math.random() * (canvas.width - r * 2) + r;
			let y = Math.random() * (canvas.height - r * 2) + r;
			let c = '#ffe0e4';
			balls.push(new Circle(canvas, ctx, x, y, r, c));
		}

		const update = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			for (let i = 0; i < balls.length; i++) {
				let ball = balls[i];
				ball.animate();
			}

			requestAnimationFrame(update);
		};

		update();
	});

	return (
		<>
			<canvas ref={canvasRef} className="bg-background"></canvas>
			<div className="absolute top-0 bottom-0 left-0 right-0" >
				<div className="flex flex-col items-center justify-center h-full py-2 gap-10" >
					<img src={logo} alt="logo" />
					<div className="flex flex-col gap-5 text-center border border-border p-5 py-10 sm:p-20 rounded-md bg-light" >
						<h1 className="font-bold text-6xl text-danger">404</h1>
						<h2 className="font-bold text-2xl text-placeholder">Fant ikke denne siden</h2>
						<Link to='/' className='bg-primary text-center rounded-md py-2 px-10 text-light font-bold'>Hjem</Link>
					</div>
				</div>
			</div>
		</>
	);
};

const useCanvas = (callback) => {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
		callback([canvas, ctx]);
	}, []);

	return canvasRef;
};

class Circle {
	constructor(canvas, ctx, x, y, r, c) {
		this.canvas = canvas;
		this.ctx = ctx;
		this.x = x;
		this.y = y;
		this.r = r;
		this.c = c;

		this.dx = Math.floor(Math.random() * 4) + 1;
		this.dx *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;
		this.dy = Math.floor(Math.random() * 4) + 1;
		this.dy *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;
	}

	draw() {
		this.ctx.beginPath();
		this.ctx.fillStyle = this.c;
		this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
		this.ctx.fill();
	}

	animate() {
		this.x += this.dx;
		this.y += this.dy;


		if (this.x + this.r > this.canvas.width || this.x - this.r < 0) {
			this.dx = -this.dx;
		}
		if (this.y + this.r > this.canvas.height || this.y - this.r < 0) {
			this.dy = -this.dy;
		}

		this.draw();
	};
}

export default NotFound;;