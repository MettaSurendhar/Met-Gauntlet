/* eslint-disable no-unused-vars */
import './App.css';
import React, { useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
import Webcam from 'react-webcam';
import { drawHand } from './utilities';

function App() {
	// Set up references
	const webcamRef = useRef(null);
	const canvasRef = useRef(null);

	// Load handpose
	const runHandpose = async () => {
		const net = await handpose.load();
		console.log('handpose model loaded');
		setInterval(() => {
			detect(net);
		}, 100);
	};

	// Detect function
	const detect = async (net) => {
		// Check data is available
		if (
			typeof webcamRef.current !== 'undefined' &&
			webcamRef.current !== null &&
			webcamRef.current.video.readyState === 4
		) {
			// Get video properties
			const video = webcamRef.current.video;
			const videoHeight = webcamRef.current.video.videoHeight;
			const videoWidth = webcamRef.current.video.videoWidth;
			// Set video height and width
			webcamRef.current.video.width = videoWidth;
			webcamRef.current.video.height = videoHeight;
			// Set canvas height and width
			canvasRef.current.height = videoHeight;
			canvasRef.current.width = videoWidth;
			// Make detections
			const hand = await net.estimateHands(video);
			// Draw mesh
			const ctx = canvasRef.current.getContext('2d');
			drawHand(hand, ctx);
		}
	};

	runHandpose();

	return (
		<div className='App'>
			<h1
				style={{
					margin: 0,
					padding: 0,
					paddingTop: '8vh',
				}}
			>
				MET - GAUNTLET MAKER
			</h1>
			<header className='App-header'>
				<Webcam
					ref={webcamRef}
					style={{
						position: 'absolute',
						marginLeft: 'auto',
						marginRight: 'auto',
						left: 0,
						right: 0,
						textAlign: 'center',
						zIndex: 9,
						width: '640px',
						height: '480px',
					}}
				/>
				<canvas
					ref={canvasRef}
					style={{
						position: 'absolute',
						marginLeft: 'auto',
						marginRight: 'auto',
						left: 0,
						right: 0,
						textAlign: 'center',
						zIndex: 9,
						width: '640px',
						height: '480px',
					}}
				/>
			</header>
		</div>
	);
}

export default App;
