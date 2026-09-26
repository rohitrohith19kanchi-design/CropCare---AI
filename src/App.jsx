import { useState } from "react";
import {
  Upload,
  Leaf,
  ShieldCheck,
  ScanSearch,
  LoaderCircle,
  CheckCircle
} from "lucide-react";

import "./App.css";


function App() {

  const [image, setImage] = useState(null);

  const [crop, setCrop] = useState("");
  const [location, setLocation] = useState("");
  const [humidity, setHumidity] = useState("");
  const [rainfall, setRainfall] = useState("");


  const [status, setStatus] = useState("");
  const [jobId, setJobId] = useState("");
  const [result, setResult] = useState(null);



  const handleImageUpload = (event) => {

    const file = event.target.files[0];

    if(file){
      setImage(URL.createObjectURL(file));
    }

  };




  const startDiagnosis = () => {


    const id =
      "CC-" + Math.floor(Math.random()*90000 + 10000);


    setJobId(id);

    setResult(null);


    setStatus("Creating diagnostic job...");



    setTimeout(()=>{

      setStatus("Analyzing crop image...");

    },1500);



    setTimeout(()=>{

      setStatus("Checking environmental conditions...");

    },3000);



    setTimeout(()=>{

      setStatus("Generating advisory report...");

    },4500);



    setTimeout(()=>{

      setStatus("completed");


      setResult({

        disease:"Early Leaf Blight",

        confidence:"94.2%",

        advice:
        "Conditions indicate fungal risk. Monitor humidity and apply preventive crop management."

      });


    },6000);



  };





return (

<div className="app">


<nav className="navbar">

<div className="logo">

<Leaf size={28}/>

CropCare AI

</div>


<button className="nav-btn">

Diagnostic engine online

</button>


</nav>





<main className="hero">



<section className="hero-text">


<p className="tag">

AI POWERED CROP HEALTH

</p>



<h1>

Understand
<br/>
your crop's
<br/>
health better.

</h1>




<p className="description">

AI-powered crop diagnosis using plant images
and environmental context.

</p>



<div className="features">


<div>

<ShieldCheck size={22}/>

Safer advisory

</div>



<div>

<ScanSearch size={22}/>

AI analysis

</div>


</div>



</section>







<section className="upload-card">


<div className="upload-box">



<Upload size={40}/>



<h2>
Crop Diagnosis
</h2>


<p>
Image + environmental intelligence
</p>




<label className="upload-btn">

Choose Image


<input

type="file"

accept="image/*"

onChange={handleImageUpload}

/>


</label>





{image && (

<img

src={image}

className="preview"

alt="crop"

/>

)}





<div className="form">



<input

placeholder="Crop type"

value={crop}

onChange={(e)=>setCrop(e.target.value)}

/>




<input

placeholder="Location"

value={location}

onChange={(e)=>setLocation(e.target.value)}

/>




<input

placeholder="Humidity %"

value={humidity}

onChange={(e)=>setHumidity(e.target.value)}

/>




<select

value={rainfall}

onChange={(e)=>setRainfall(e.target.value)}

>


<option value="">

Recent rainfall

</option>


<option>
Low
</option>


<option>
Medium
</option>


<option>
High
</option>


</select>





<button

className="diagnose-btn"

onClick={startDiagnosis}

>

Start Diagnosis →

</button>




</div>







{jobId && (

<div className="status-card">


<h3>

Job ID: {jobId}

</h3>


<p>

{status !== "completed" &&

<LoaderCircle className="spin"/>

}


{status}

</p>



</div>

)}







{result && (

<div className="result-card">


<CheckCircle size={30}/>


<h2>

Diagnosis Complete

</h2>



<p>

Disease:
<strong> {result.disease}</strong>

</p>



<p>

Confidence:
<strong> {result.confidence}</strong>

</p>



<p>

{result.advice}

</p>



</div>

)}





</div>


</section>



</main>



</div>

);


}



export default App;