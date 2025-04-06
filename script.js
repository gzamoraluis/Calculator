 <script>
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

        // Toggle language
        document.getElementById('languageToggle').addEventListener('click', function() {
            currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
            updateLanguage();
        });

        function updateLanguage() {
            document.getElementById('appTitle').textContent = texts[currentLanguage].title;
            document.getElementById('gallonsLabel').textContent = texts[currentLanguage].gallonsLabel;
            document.getElementById('barrelsLabel').textContent = texts[currentLanguage].barrelsLabel;
            document.getElementById('calculateBtn').textContent = texts[currentLanguage].calculateBtn;
            document.getElementById('languageText').textContent = texts[currentLanguage].toggleLanguage;

            // Update results if displayed
            if (document.getElementById('result').style.display !== 'none') {
                document.getElementById('totalBarrelsText').textContent = texts[currentLanguage].totalBarrelsText;
                document.getElementById('perBarrelText').textContent = texts[currentLanguage].perBarrelText;
                document.getElementById('distributionTitle').textContent = texts[currentLanguage].distributionTitle;
                document.getElementById('subtractionTitle').textContent = texts[currentLanguage].subtractionTitle;
            }
        }

        function calculate() {
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

    // Calcular los valores redondeados para cada lote
    barrelBatches.forEach((batch, index) => {
        const batchGallons = batch * gallonsPerBarrel;
        const rounded = Math.round(batchGallons * 4) / 4; // Redondeo al 0.25 más cercano
        roundedGallons.push(rounded);
        totalRounded += rounded;
    });

    // Ajustar la diferencia en el último lote para que la suma sea exacta
    const difference = gallons - totalRounded;
    if (difference !== 0) {
        roundedGallons[roundedGallons.length - 1] += difference;
    }

    // Mostrar resultados y pasos de resta
    subtractionStepsHTML += `<p>${texts[currentLanguage].initialTotal} ${remainingGallons.toFixed(2)}G</p>`;

    barrelBatches.forEach((batch, index) => {
        const rounded = roundedGallons[index];
        
        batchResultsHTML += `
            <div class="result-item">
                <strong>${currentLanguage === 'en' ? 'Batch' : 'Lote'} ${index + 1} (${batch} ${currentLanguage === 'en' ? 'barrels' : 'barriles'}):</strong> 
                ${rounded.toFixed(2)}G
            </div>
        `;

        subtractionStepsHTML += `
            <p>${remainingGallons.toFixed(2)}G - ${rounded.toFixed(2)}G (${currentLanguage === 'en' ? 'Batch' : 'Lote'} ${index + 1}) = ${(remainingGallons - rounded).toFixed(2)}G ${texts[currentLanguage].remaining}</p>
        `;
        remainingGallons -= rounded;
    });

    document.getElementById("batchResults").innerHTML = batchResultsHTML;
    document.getElementById("subtractionSteps").innerHTML = subtractionStepsHTML;
    document.getElementById("result").style.display = 'block';
}
    </script>
    
