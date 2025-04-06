// Bilingual texts
const texts = {
    en: {
        title: "Barrel Topping Calculator",
        gallonsLabel: "Gallons used:",
        barrelsLabel: "Barrel batches (comma-separated):",
        calculateBtn: "Calculate",
        totalBarrelsText: "Total barrels:",
        perBarrelText: "Gallons per barrel (unrounded):",
        distributionTitle: "Distribution per batch:",
        subtractionTitle: "Subtraction Steps:",
        toggleLanguage: "Español",
        remaining: "remaining",
        initialTotal: "Initial total:"
    },
    es: {
        title: "Calculadora de Topping para Barriles",
        gallonsLabel: "Galones usados:",
        barrelsLabel: "Lotes de barriles (separados por comas):",
        calculateBtn: "Calcular",
        totalBarrelsText: "Total de barriles:",
        perBarrelText: "Galones por barril (sin redondear):",
        distributionTitle: "Distribución por lote:",
        subtractionTitle: "Pasos de resta:",
        toggleLanguage: "English",
        remaining: "restantes",
        initialTotal: "Total inicial:"
    }
};

let currentLanguage = 'en';

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Set up event listeners
    document.getElementById('languageToggle').addEventListener('click', toggleLanguage);
    document.getElementById('calculateBtn').addEventListener('click', calculate);
    
    // Initialize language
    updateLanguage();
});

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
    updateLanguage();
}

function updateLanguage() {
    // Update all text elements
    document.getElementById('appTitle').textContent = texts[currentLanguage].title;
    document.getElementById('gallonsLabel').textContent = texts[currentLanguage].gallonsLabel;
    document.getElementById('barrelsLabel').textContent = texts[currentLanguage].barrelsLabel;
    document.getElementById('calculateBtn').textContent = texts[currentLanguage].calculateBtn;
    document.getElementById('languageText').textContent = texts[currentLanguage].toggleLanguage;
    document.getElementById('totalBarrelsText').textContent = texts[currentLanguage].totalBarrelsText;
    document.getElementById('perBarrelText').textContent = texts[currentLanguage].perBarrelText;
    document.getElementById('distributionTitle').textContent = texts[currentLanguage].distributionTitle;
    document.getElementById('subtractionTitle').textContent = texts[currentLanguage].subtractionTitle;

    // If results are displayed, update them too
    if (document.getElementById('result').style.display !== 'none') {
        updateResultsLanguage();
    }
}

function updateResultsLanguage() {
    const resultDiv = document.getElementById('result');
    if (resultDiv.style.display === 'none') return;

    // Update the language of existing results
    const batchItems = document.querySelectorAll('#batchResults .result-item');
    const subtractionSteps = document.querySelectorAll('#subtractionSteps p');
    
    // This would need to be more sophisticated if you want to preserve calculations
    // For now, we'll just recalculate
    calculate(false);
}

function calculate(showResult = true) {
    const gallons = parseFloat(document.getElementById("gallons").value);
    const barrelBatches = document.getElementById("barrelBatches").value.split(",").map(Number);
    const totalBarrels = barrelBatches.reduce((a, b) => a + b, 0);

    if (!gallons || totalBarrels === 0 || isNaN(gallons)) {
        alert(currentLanguage === 'en' ? "Please enter valid data!" : "¡Ingrese datos válidos!");
        return;
    }

    const gallonsPerBarrel = gallons / totalBarrels;
    document.getElementById("totalBarrels").textContent = totalBarrels;
    document.getElementById("perBarrel").textContent = gallonsPerBarrel.toFixed(4);

    let batchResultsHTML = '';
    let subtractionStepsHTML = '';
    let remainingGallons = gallons;
    let roundedGallons = [];
    let totalRounded = 0;

    // Calculate rounded values for each batch
    barrelBatches.forEach((batch, index) => {
        const batchGallons = batch * gallonsPerBarrel;
        const rounded = Math.round(batchGallons * 4) / 4; // Round to nearest 0.25
        roundedGallons.push(rounded);
        totalRounded += rounded;
    });

    // Adjust the difference in the last batch
    const difference = gallons - totalRounded;
    if (difference !== 0) {
        roundedGallons[roundedGallons.length - 1] += difference;
    }

    // Show results and subtraction steps
    subtractionStepsHTML += `<p>${texts[currentLanguage].initialTotal} ${remainingGallons.toFixed(2)}G</p>`;

    barrelBatches.forEach((batch, index) => {
        const rounded = roundedGallons[index];
        const displayValue = rounded.toFixed(2);
        
        batchResultsHTML += `
            <div class="result-item">
                <strong>${currentLanguage === 'en' ? 'Batch' : 'Lote'} ${index + 1} (${batch} ${currentLanguage === 'en' ? 'barrels' : 'barriles'}):</strong> 
                ${displayValue}G
            </div>
        `;

        subtractionStepsHTML += `
            <p>${remainingGallons.toFixed(2)}G - ${displayValue}G (${currentLanguage === 'en' ? 'Batch' : 'Lote'} ${index + 1}) = ${(remainingGallons - rounded).toFixed(2)}G ${texts[currentLanguage].remaining}</p>
        `;
        remainingGallons -= rounded;
    });

    document.getElementById("batchResults").innerHTML = batchResultsHTML;
    document.getElementById("subtractionSteps").innerHTML = subtractionStepsHTML;
    
    if (showResult) {
        document.getElementById("result").style.display = 'block';
   
    if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(registration => console.log('SW registrado:', registration))
      .catch(error => console.log('Error SW:', error));
  });
}
    
