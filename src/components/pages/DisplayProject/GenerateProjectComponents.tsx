import arrowRight from "../../../assets/createProject/arrowRight.png";
import arrowUp from "../../../assets/createProject/arrowUp.png";
import { useEffect, useRef } from "react";

function ProjectComponent(projectData: any, imageData: any) {
  const elementRef = useRef<HTMLImageElement>(null);
  const elementHeight = useRef<number>(0);

  useEffect(() => {
    if (elementRef.current) {
      elementHeight.current = elementRef.current.offsetHeight;
    }
  }, [elementRef]);

  return (
    <>
      <div className="create-project-layout">
        <div>
          <p
            id="about-artwork"
            style={{ maxHeight: `${elementHeight.current}px` }}
          >
            A few words <br /> about this artwork
          </p>
          <p id="about-artwork-content">{projectData.description}</p>
        </div>
        <div>
          <img
            ref={elementRef}
            src={arrowRight}
            alt=""
            id="about-arrow-right"
          />
        </div>
        <div>
          {imageData ? (
            <img
              src={imageData}
              style={{ width: "100%" }}
              alt=""
              placeholder="image"
            />
          ) : (
            <div id="project-no-image-placeholder">
              <p className="">No image to show.</p>
            </div>
          )}
        </div>
      </div>
      <div className="create-project-layout">
        <div></div>
        <div></div>
        <div className="set-artwork-title-container">
          <img src={arrowUp} alt="" />
          <p id="">{projectData.title}</p>
        </div>
      </div>
    </>
  );
}

export default ProjectComponent;
