export async function generateSoundWaveImage(file: File) {
	const audioBuffer = await decodeFile(file);
	const filteredData = filterSoundData(audioBuffer);
	const normalizedData = normalizeData(filteredData);
	const canvas = await drawSoundWave(normalizedData);
	return await generateBlob(canvas);
}

export async function blobToDataUrl(blob: Blob) {
	return new Promise<string>((resolve) => {
		const reader = new FileReader();
		reader.addEventListener("load", () => {
			resolve(reader.result as string);
		});
		reader.readAsDataURL(blob);
	});
}

async function decodeFile(file: File) {
	const audioContext = new AudioContext();
	const arrayBuffer = await file.arrayBuffer();
	return await audioContext.decodeAudioData(arrayBuffer);
}

function filterSoundData(audioBuffer: AudioBuffer) {
	const rawData = audioBuffer.getChannelData(0); // We only need to work with one channel of data
	const samples = 75; // Number of samples we want to have in our final data set
	const blockSize = Math.floor(rawData.length / samples); // the number of samples in each subdivision
	const filteredData = [];
	for (let i = 0; i < samples; i++) {
		let blockStart = blockSize * i; // the location of the first sample in the block
		let sum = 0;
		for (let j = 0; j < blockSize; j++) {
			sum = sum + Math.abs(rawData[blockStart + j]); // find the sum of all the samples in the block
		}
		filteredData.push(sum / blockSize); // divide the sum by the block size to get the average
	}

	return filteredData;
}

function normalizeData(filteredData) {
	const multiplier = Math.pow(Math.max(...filteredData), -1);
	return filteredData.map((n) => n * multiplier);
}

function drawLineSegment(ctx: OffscreenCanvasRenderingContext2D, x, y, width) {
	ctx.beginPath();
	ctx.roundRect(x - 1, -y, width - width / 2, y * 2, [width / 2]);
	//ctx.fillRect(x - 1, -y, width - width / 3, y * 2);
	ctx.fill();
}

async function drawSoundWave(normalizedData) {
	const canvas = new OffscreenCanvas(800, 360);
	const padding = canvas.height / 2;
	const ctx = canvas.getContext("2d");
	ctx.fillStyle = "black";
	ctx.translate(0, canvas.height / 2); // Set Y = 0 to be in the middle of the canvas

	// draw the line segments
	const width = canvas.width / normalizedData.length;
	for (let i = 0; i < normalizedData.length; i++) {
		const x = width * i;
		let height = normalizedData[i] * ((canvas.height - padding) / 2);
		height = height < 0.5 ? 0.5 : height;
		drawLineSegment(ctx, x, height, width);
	}

	return canvas;
}

async function generateBlob(canvas: OffscreenCanvas) {
	const imgBlob = await canvas.convertToBlob();

	return blobToDataUrl(imgBlob);
}
