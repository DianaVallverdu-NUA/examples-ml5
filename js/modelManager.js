//label and probability paragraph objects
let labelP, probabilityP;

//type is either VIDEO or IMAGE
let type;

/**
 * Callback for image classifier - logs model is loaded
 */
const modelLoaded = () => {
  console.log("model is loaded");
};

/**
 *
 * @param {*} error
 * @param {*} results
 */
const gotResults = (error, results) => {
  //check no errors
  if (error) {
    console.error(error);
    return;
  }

  //store results
  const label = results[0].label;
  const probability = Number(results[0].confidence).toFixed(2);

  //display results in label and probability paragraph
  if (!labelP && !probabilityP) {
    console.log("labelP and probabilityP are empty");
    labelP = createP(label);
    probabilityP = createP(`probability: ${probability}`);

    //recall if video
    if(type === VIDEO) mobileNet.predict(gotResults)
    return;
  }
  labelP.html(label);
  probabilityP.html(`probability: ${probability}`);

  //recall if it's a video
  //TO DO: for future, if it's a video it should check it's not over but for now video means webcam
  if(type === VIDEO) mobileNet.predict(gotResults);
};