import React, { useState } from "react";
import "./App.css";

import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";




export default function App() {
	const inputRef = React.useRef();

	const triggerFileSelectPopup = () => inputRef.current.click();

	const [image, setImage] = React.useState(null);
	const [croppedArea, setCroppedArea] = React.useState(null);
	const [crop, setCrop] = React.useState({ x: 0, y: 0 });
	const [zoom, setZoom] = React.useState(1);
	const [result,setResult] = useState(null)

	const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
		setCroppedArea(croppedAreaPixels);
	};

	const onSelectFile = (event) => {
		if (event.target.files && event.target.files.length > 0) {
			const reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.addEventListener("load", () => {
				setImage(reader.result);
			});
		}
	};

	

	return (
		<div className='container'>
			<div className='container-cropper'>
				{image ? (
					<>
						<div className='cropper'>
							<Cropper
								image={image}
								crop={crop}
								zoom={zoom}
								aspect={1}
								onCropChange={setCrop}
								onZoomChange={setZoom}
								onCropComplete={onCropComplete}
							/>
						</div>
						<div className="slider">
							<Slider min={1} max={3} step={ 0.1} value={zoom} onChange={(e,zoom)=>setZoom(zoom)}/>
							</div>

						
					</>
				) : null}
			</div>

			<div className='container-buttons'>
				<input
					type='file'
					accept='image/*'
					ref={inputRef}
					onChange={onSelectFile}
					style={{ display: "none" }}
				/>
				<button
					
					onClick={triggerFileSelectPopup}
					style={{ marginRight: "10px" }}
				>
					Choose
				</button>
				
				
			</div>
			{result && <div> 
				<img src="{result}" alt="Cropped image" /></div>}
		</div>
	);
}