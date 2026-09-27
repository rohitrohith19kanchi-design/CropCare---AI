import { useEffect, useState } from "react";
import {
  Upload,
  Leaf,
  ArrowRight,
  ShieldCheck,
  ScanSearch,
  X,
  RefreshCw,
  Check,
  Clock3,
  LoaderCircle,
  AlertTriangle,
  Sprout,
  Thermometer,
  Droplets,
  ClipboardCheck,
} from "lucide-react";

import "./App.css";

const stages = ["Uploading", "Queued", "Processing", "Diagnosis Complete"];
const maxImageSize = 10 * 1024 * 1024;
const supportedImageTypes = ["image/jpeg", "image/png", "image/webp"];

function App() {
  const [image, setImage] = useState(null);
  const [imageDetails, setImageDetails] = useState(null);
  const [diagnosisStage, setDiagnosisStage] = useState(null);
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    if (!diagnosisStage || diagnosisStage === "Diagnosis Complete") return undefined;
    const nextStage = stages[stages.indexOf(diagnosisStage) + 1];
    const timer = window.setTimeout(() => setDiagnosisStage(nextStage), 1100);
    return () => window.clearTimeout(timer);
  }, [diagnosisStage]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    event.target.value = "";

    if (!file) return;

    if (!supportedImageTypes.includes(file.type)) {
      setUploadError("Please choose a JPG, PNG, or WEBP image.");
      return;
    }

    if (file.size > maxImageSize) {
      setUploadError("This image is larger than 10 MB. Choose a smaller file.");
      return;
    }

    if (image?.startsWith("blob:")) URL.revokeObjectURL(image);
    setImage(URL.createObjectURL(file));
    setDiagnosisStage(null);
    setUploadError("");
    setImageDetails({
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2),
    });
  };


  const removeImage = () => {
    if (image?.startsWith("blob:")) URL.revokeObjectURL(image);
    setImage(null);
    setImageDetails(null);
    setDiagnosisStage(null);
    setUploadError("");
  };

  const startAnalysis = () => setDiagnosisStage("Uploading");
  const isAnalyzing = diagnosisStage && diagnosisStage !== "Diagnosis Complete";


  return (
    <div className="app">

      <nav className="navbar">
        <div className="brand">
          <Leaf size={24}/>
          CropCare AI
        </div>

        <div className="status">
          Demo diagnosis mode
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
            Explore a sample crop diagnosis from a plant image and simulated growing conditions.
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
                accept="image/jpeg,image/png,image/webp"
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
                  ✓ Ready to run demo analysis
                </p>


              </div>


              <div className="actions">

                <label className="replace-btn">

                  <RefreshCw size={16}/>
                  Replace

                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
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

              {uploadError && <p className="upload-error" role="alert">{uploadError}</p>}


              <button className="analyze-btn" onClick={startAnalysis} disabled={Boolean(isAnalyzing)}>

                {isAnalyzing ? "Analysis in progress" : diagnosisStage ? "Run again" : "Analyze Image"}
                {isAnalyzing ? <LoaderCircle className="spin" size={18}/> : <ArrowRight size={18}/>}

              </button>

              {diagnosisStage && (
                <div className="pipeline" aria-live="polite">
                  <div className="pipeline-heading"><span>DEMO ANALYSIS</span><span>{diagnosisStage === "Diagnosis Complete" ? "Complete" : "Please wait"}</span></div>
                  <div className="pipeline-steps">
                    {stages.map((stage, index) => {
                      const currentIndex = stages.indexOf(diagnosisStage);
                      const complete = index < currentIndex;
                      const current = index === currentIndex;
                      return <div className={`pipeline-step ${complete ? "complete" : ""} ${current ? "current" : ""}`} key={stage}>
                        <span className="step-icon">{complete ? <Check size={14}/> : current && isAnalyzing ? <LoaderCircle className="spin" size={14}/> : index === 1 ? <Clock3 size={14}/> : <span>{index + 1}</span>}</span>
                        <span>{stage}</span>
                      </div>;
                    })}
                  </div>
                  <div className="pipeline-progress" role="progressbar" aria-label="Demo diagnosis progress" aria-valuemin="0" aria-valuemax="4" aria-valuenow={stages.indexOf(diagnosisStage) + 1}>
                    <span style={{ width: `${((stages.indexOf(diagnosisStage) + 1) / stages.length) * 100}%` }} />
                  </div>
                </div>
              )}

              {diagnosisStage === "Diagnosis Complete" && (
                <section className="diagnosis-result" aria-live="polite">
                  <div className="demo-banner"><AlertTriangle size={15}/><span>DEMO RESULT · Sample only</span></div>
                  <div className="result-title"><div className="result-icon"><Sprout size={20}/></div><div><span>Possible disease</span><h3>Early blight</h3></div></div>
                  <div className="confidence-row"><span>Mock confidence</span><strong>87%</strong></div>
                  <div className="confidence-track"><span/></div>
                  <p className="result-copy">Early blight may show as brown, target-like spots on older leaves. This example is fixed demo content and was not identified from the uploaded photo.</p>
                  <div className="context-panel">
                    <strong>Simulated environmental context</strong>
                    <div className="context-metrics">
                      <div className="context-metric"><Thermometer size={16}/><span>Temperature</span><b>24°C</b></div>
                      <div className="context-metric"><Droplets size={16}/><span>Humidity</span><b>78%</b></div>
                    </div>
                    <p>Example conditions only · no location or weather data used</p>
                  </div>
                  <div className="result-advice"><div className="advice-title"><ClipboardCheck size={16}/><strong>Recommended next checks</strong></div><ul><li>Compare leaf spots with a trusted local crop guide or extension service.</li><li>Inspect older leaves and nearby plants for similar patterns.</li><li>Check whether recent watering or rain has left foliage damp.</li></ul></div>
                  <p className="mock-note">Demo only: real AI inference and live environmental data are not connected. This sample is not an agronomic diagnosis.</p>
                </section>
              )}


            </div>


          )}

          {!image && uploadError && <p className="upload-error upload-error-empty" role="alert">{uploadError}</p>}

        </section>


      </main>


    </div>
  );
}


export default App;
