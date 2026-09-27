import { useState } from "react";
import {
  Upload,
  Leaf,
  ArrowRight,
  ShieldCheck,
  ScanSearch,
  X,
  RefreshCw,
} from "lucide-react";

import "./App.css";

function App() {
  const [image, setImage] = useState(null);
  const [imageDetails, setImageDetails] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      setImage(URL.createObjectURL(file));

      setImageDetails({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2),
      });
    }
  };


  const removeImage = () => {
    setImage(null);
    setImageDetails(null);
  };


  return (
    <div className="app">

      <nav className="navbar">
        <div className="brand">
          <Leaf size={24}/>
          CropCare AI
        </div>

        <div className="status">
          Diagnostic engine online
        </div>
      </nav>


      <main className="hero">

        <section className="hero-text">

          <div className="tag">
            <ScanSearch size={16}/>
            AI-POWERED CROP HEALTH
          </div>


          <h1>
            Understand
            <br/>
            crop's
            <br/>
            health better.
          </h1>


          <p>
            AI-powered crop diagnosis using plant images and environmental context.
          </p>


          <div className="features">

            <span>
              <ShieldCheck size={18}/>
              Image-based analysis
            </span>

            <span>
              <ShieldCheck size={18}/>
              Clear explanations
            </span>

          </div>


        </section>



        <section className="upload-card">


          {!image ? (

            <label className="upload-box">

              <Upload size={32}/>

              <h2>
                Upload a plant image
              </h2>


              <p>
                Use a clear photo showing the affected leaf,
                stem, fruit, or other visible symptoms.
              </p>


              <span>
                Choose image → JPG, PNG or WEBP · Max 10 MB
              </span>


              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />

            </label>


          ) : (


            <div className="preview-box">


              <img
                src={image}
                alt="plant preview"
              />


              <div className="image-info">

                <h3>
                  Selected Image
                </h3>


                <p>
                  🌿 {imageDetails.name}
                </p>


                <p>
                  Size: {imageDetails.size} MB
                </p>


                <p className="ready">
                  ✓ Ready for AI analysis
                </p>


              </div>


              <div className="actions">

                <label className="replace-btn">

                  <RefreshCw size={16}/>
                  Replace

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />

                </label>


                <button
                  className="remove-btn"
                  onClick={removeImage}
                >

                  <X size={16}/>
                  Remove

                </button>


              </div>


              <button className="analyze-btn">

                Analyze Image
                <ArrowRight size={18}/>

              </button>


            </div>


          )}

        </section>


      </main>


    </div>
  );
}


export default App;