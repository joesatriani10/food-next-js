'use client';
import classes from './image-picker.module.css';
import React, {useRef, useState} from 'react';
import Image from 'next/image';

const ImagePicker = ({label, name}) => {
    const [pickedImage, setPickedImage] = useState();
    const imageInput = useRef(null);
    const HandlePickClick = () => {
        imageInput.current.click();
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (!file) {
            setPickedImage(null);
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        }

        fileReader.readAsDataURL(file);
    }

    return <div className={classes.picker}>
        <label htmlFor={name}>{label}</label>
        <div className={classes.controls}>
            <div className={classes.preview}>
                {!pickedImage && <p>No image picked yet.</p>}
                {pickedImage && (
                    <Image
                        src={pickedImage}
                        alt={"The file selected by the user."}
                        fill
                    />)}
            </div>
            <input
                className={classes.input}
                type="file" id={name}
                accept={"image/png, image/jpeg"}
                name={name}
                ref={imageInput}
                onChange={handleImageChange}
                required
            />
            <button className={classes.button} type={"button"} onClick={HandlePickClick}>
                Pick an Image
            </button>
        </div>
    </div>;
}

export default ImagePicker;