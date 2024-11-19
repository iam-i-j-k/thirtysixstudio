import { useEffect, useRef, useState } from "react"
import canvasImages from "./canvasImages";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Canvas = ({details}) => {
    // console.log(startIndex);
    const { duration, numImages, startIndex, size, top, left, zIndex } = details;
    const [index, setIndex] = useState({value: startIndex});
    const canvasRef = useRef(null);
    useGSAP(()=>{
        gsap.to(index, {
            value: startIndex + numImages - 1,
            duration: duration*1.7,
            repeat: -1,
            ease: "linear",
            onUpdate: () =>{
                setIndex({value: Math.round(index.value)});
            }
        });

        gsap.from(canvasRef.current,{
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut"
        });
    });

    useEffect(() => {
      const scale = window.devicePixelRatio;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = canvasImages[index.value];
      img.onload = ()=>{
        canvas.width = canvas.offsetWidth * scale;
        canvas.height = canvas.offsetHeight * scale;
        canvas.style.width = canvas.offsetWidth + "px";
        canvas.style.height = canvas.offsetHeight + "px";
        ctx.drawImage(img,0,0, canvas.offsetWidth, canvas.offsetHeight);
        ctx.scale(scale, scale);
      };
    }, [index]);
    
  return <canvas
   ref={canvasRef}
   data-scroll
   data-scroll-speed={
   Math.random().toFixed(2)
   }
    className="absolute" 
    style={{width: `${size*1.3}px`, height: `${size*1.3}px`, top: `${top}%`, left: `${left}%`, zIndex: zIndex}} 
    id="canvas">

    </canvas>
}

export default Canvas
