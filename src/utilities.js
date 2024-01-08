// Joints

const fingerJoints = {
	thumb: [0, 1, 2, 3, 4],
	indexFinger: [0, 5, 6, 7, 8],
	middleFinger: [0, 9, 10, 11, 12],
	ringFinger: [0, 13, 14, 15, 16],
	pinky: [0, 17, 18, 19, 20],
};

// Drawing function
export const drawHand = (predictions, ctx) => {
	if (predictions.length > 0) {
		predictions.forEach((prediction) => {
			const landmarks = prediction.landmarks;

			// Draw lines
			for (let j = 0; j < Object.keys(fingerJoints).length; j++) {
				const finger = Object.keys(fingerJoints)[j];
				for (let k = 0; k < fingerJoints[finger].length - 1; k++) {
					const firstJointIndex = fingerJoints[finger][k];
					const secondJointIndex = fingerJoints[finger][k + 1];

					// Draw path
					ctx.beginPath();
					ctx.moveTo(
						landmarks[firstJointIndex][0],
						landmarks[firstJointIndex][1]
					);
					ctx.lineTo(
						landmarks[secondJointIndex][0],
						landmarks[secondJointIndex][1]
					);
					ctx.strokeStyle = 'grey';
					ctx.lineWidth = 4;
					ctx.stroke();
				}
			}

			// Draw points
			for (let i = 0; i < landmarks.length; i++) {
				const x = landmarks[i][0];
				const y = landmarks[i][1];
				ctx.beginPath();
				ctx.arc(x, y, 10, 0, 3 * Math.PI);
				ctx.fillStyle = 'aqua';
				ctx.strokeStyle = 'indigo';
				ctx.fill();
			}
		});
	}
};
