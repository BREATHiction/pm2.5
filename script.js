let timerInterval;

function startTimer() {
    let timeLeft = 60;
    document.getElementById('timer').textContent = timeLeft;

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert('Timer finished! Enter the number of breaths you counted.');
        }
    }, 1000);
}

function redirectToAirQuality() {
    const city = document.getElementById('cityDropdown').value;
    if (city) {
        window.open(`https://www.iqair.com/philippines/ncr/${city}`, '_blank');
    }
}

function calculateLongTerm() {
    const C = parseFloat(document.getElementById('concentration').value)/ 1000;
    const Wbody = parseFloat(document.getElementById('bodyWeight').value);
    const AGE = parseFloat(document.getElementById('age').value);
    const breathsPerMinute = parseFloat(document.getElementById('breathsPerMinute').value);
    const LE = 24;
    const EF = 365;

    let X = AGE <= 0.08 ? 5 : AGE <= 1 ? 6 : 7;
    const TV = (Wbody * X) / 1e6;
    const AV = breathsPerMinute * 60;
    const IR = TV * AV;

    const Iinh = ((C * IR * LE * EF * AGE) / (Wbody * (AGE * 365))).toFixed(6);
    const AI = breathsPerMinute * 60 * 24;
    const breathingRate = AI * TV;
    const EC = ((Iinh * Wbody) / breathingRate).toFixed(6);
    const RQ = (EC / 0.015).toFixed(6);
    const RQ2 = (EC / 0.035).toFixed(6);
    const P = (RQ * 100).toFixed(2);
    const P2 = (RQ2 * 100).toFixed(2);

    // Function to determine the color and label based on P and P2 values
function getColorForPercentage(value) {
    if (value <= 50) return { color: 'green', label: 'Low' };
    if (value <= 100) return { color: 'yellow', label: 'Moderate' };
    if (value <= 150) return { color: 'orange', label: 'Unhealthy' };
    if (value <= 200) return { color: 'red', label: 'Very Unhealthy' };
    return { color: 'maroon', label: 'Hazardous' };
}

// Function to determine the color and label based on RQ and RQ2 values
function getColorForRisk(value) {
    if (value <= 0.50) return { color: 'green', label: 'Low' };
    if (value <= 1) return { color: 'yellow', label: 'Moderate' };
    if (value <= 1.50) return { color: 'orange', label: 'Unhealthy' };
    if (value <= 2) return { color: 'red', label: 'Very Unhealthy' };
    return { color: 'maroon', label: 'Hazardous' };
}

// Get color and label data
const pData = getColorForPercentage(P);
const p2Data = getColorForPercentage(P2);
const rqData = getColorForRisk(RQ);
const rq2Data = getColorForRisk(RQ2);

document.getElementById('results').innerHTML = ` 
    <div class="result-item"><strong>Inhalation Exposure Dose:</strong> ${Iinh} mg/kg/day</div>
    <div class="result-item"><strong>Risk Quotient based on the World Health Organization of the Philippines:</strong> 
        <span style="color: ${rqData.color};">${RQ} - ${rqData.label}</span>
    </div>
    <div class="result-item"><strong>Risk Quotient based on the guidelines of the United States Environmental Protection Agency:</strong> 
        <span style="color: ${rq2Data.color};">${RQ2} - ${rq2Data.label}</span>
    </div>
    <div class="result-item"><strong>Probability of Danger based on the World Health Organization of the Philippines:</strong> 
        <span style="color: ${pData.color};">${P}% - ${pData.label}</span>
    </div>
    <div class="result-item"><strong>Probability of Danger based on the guidelines of the United States Environmental Protection Agency:</strong> 
        <span style="color: ${p2Data.color};">${P2}% - ${p2Data.label}</span>
    </div>
`;



}

function calculateShortTerm() {
    const C = parseFloat(document.getElementById('concentration').value) / 1000;
    const Wbody = parseFloat(document.getElementById('bodyWeight').value);
    const LE = parseFloat(document.getElementById('exposureDuration').value)/ 24;
    const AGE = parseFloat(document.getElementById('age').value);
    const breathsPerMinute = parseFloat(document.getElementById('breathsPerMinute').value);
    

    let X = AGE <= 0.08 ? 5 : AGE <= 1 ? 6 : 7;
    const TV = (Wbody * X) / 1e6;
    const AV = breathsPerMinute * 60;
    const IR = TV * AV;
    const Iexposure = ((C * IR * LE) / Wbody).toFixed(6);
    const EC = ((Iexposure * Wbody) / IR).toFixed(6);
    const RQ = (EC / 0.015).toFixed(6);
    const RQ2 = (EC / 0.035).toFixed(6);
    const P = (RQ * 100).toFixed(2);
    const P2 = (RQ2 * 100).toFixed(2);


    // Function to determine the color and label based on P and P2 values
function getColorForPercentage(value) {
    if (value <= 50) return { color: 'green', label: 'Low' };
    if (value <= 100) return { color: 'yellow', label: 'Moderate' };
    if (value <= 150) return { color: 'orange', label: 'Unhealthy' };
    if (value <= 200) return { color: 'red', label: 'Very Unhealthy' };
    return { color: 'maroon', label: 'Hazardous' };
}

// Function to determine the color and label based on RQ and RQ2 values
function getColorForRisk(value) {
    if (value <= 0.50) return { color: 'green', label: 'Low' };
    if (value <= 1) return { color: 'yellow', label: 'Moderate' };
    if (value <= 1.50) return { color: 'orange', label: 'Unhealthy' };
    if (value <= 2) return { color: 'red', label: 'Very Unhealthy' };
    return { color: 'maroon', label: 'Hazardous' };
}

// Get color and label data
const pData = getColorForPercentage(P);
const p2Data = getColorForPercentage(P2);
const rqData = getColorForRisk(RQ);
const rq2Data = getColorForRisk(RQ2);

document.getElementById('results').innerHTML = ` 
    <strong>Individual Exposure Dose:</strong> ${Iexposure} mg/kg/hr
    <div class="result-item"><strong>Risk Quotient based on the World Health Organization of the Philippines:</strong> 
        <span style="color: ${rqData.color};">${RQ} - ${rqData.label}</span>
    </div>
    <div class="result-item"><strong>Risk Quotient based on the guidelines of the United States Environmental Protection Agency:</strong> 
        <span style="color: ${rq2Data.color};">${RQ2} - ${rq2Data.label}</span>
    </div>
    <div class="result-item"><strong>Probability of Danger based on the World Health Organization of the Philippines:</strong> 
        <span style="color: ${pData.color};">${P}% - ${pData.label}</span>
    </div>
    <div class="result-item"><strong>Probability of Danger based on the guidelines of the United States Environmental Protection Agency:</strong> 
        <span style="color: ${p2Data.color};">${P2}% - ${p2Data.label}</span>
    </div>
`;


}
