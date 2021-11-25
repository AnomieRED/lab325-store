import fs from 'fs';

export default function imageUpload({
	                                    stream,
	                                    filename
                                    }) {
	const uploadDir = '/usr/src/app/data/photos';
	const path = `${uploadDir}/${filename}`;
	return new Promise((resolve, reject) =>
		stream
			.on('error', error => {
				if (stream.truncated)
					fs.unlinkSync(path);
				reject(error);
			})
			.pipe(fs.createWriteStream(path))
			.on('error', error => reject(error))
			.on('finish', () => resolve({ path }))
	);
}