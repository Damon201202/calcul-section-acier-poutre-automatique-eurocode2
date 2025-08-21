// Copyright © 2025 Dimitry Lyubichev / beton-guide.com
// Licensed under the MIT License.
// You may freely use, modify, and distribute this code under the terms of the MIT License.
// See the LICENSE file in the project root for details.

// Demarrage de calcul à ouverture de page
window.onload = function() {
    calculPoutre();
};

let aS;
let fctm = parseFloat();
let med;
let mqp;
let fck;
let aCom;
let d;
let b;
let h;
let cReel;
let Dmax;
let cmin;
let ved;
let pu;
let fcd;
let As_cad;
let ln; // La portée entre nus des appuis
let n_complet; // Nombre de cadres
let AsReel;
let fctk;
let tg;
let td;
let leff;
let select_diamCad; // Diametre des cadres
let aMin; // Distance verticale entre les lits

let repartition_debut;
let repartition_fin;
let repartition;
let repartition_total;

// Listen for changes in 
document.querySelector('.calcul-four-select-classe_beton').addEventListener('change', calculPoutre);
document.querySelector('.calcul-four-select-nuance_acier').addEventListener('change', calculPoutre);
document.querySelector('.calcul-four_h').addEventListener('input', calculPoutre);
document.querySelector('.calcul-four_b').addEventListener('input', calculPoutre);
document.querySelector('.calcul-four_ln').addEventListener('input', calculPoutre);
document.querySelector('.calcul-four-select-nuance_acier').addEventListener('change', calculPoutre);
document.querySelector('.calcul-four_gu').addEventListener('input', calculPoutre);
document.querySelector('.calcul-four_q').addEventListener('input', calculPoutre);
document.querySelector('.calcul-four-select-coef_reduct').addEventListener('change', calculPoutre);
document.querySelector('.calcul-four-select_duree').addEventListener('change', calculPoutre);
document.querySelector('.calcul-four-select-classe_exposition').addEventListener('change', calculPoutre);
document.querySelector('.calcul-four_tg').addEventListener('input', calculPoutre);
document.querySelector('.calcul-four_td').addEventListener('input', calculPoutre);
//document.querySelector('.calcul-four_leff').addEventListener('input', calculPoutre);
document.querySelector('.calcul-four_dprecis').addEventListener('input', calculPoutre);
document.querySelector('.calcul-four_cenr').addEventListener('input', calculPoutre);
document.querySelector('.calcul-four-select-c_min_b').addEventListener('input', calculPoutre);
document.querySelector('.calcul-enrobage_reel').addEventListener('input', calculPoutre);
document.querySelector('.calcul-dmax').addEventListener('input', calculPoutre);

function calculPoutre() {
    h = parseFloat(document.querySelector('.calcul-four_h').value) || 0;
    let dAnticipe = 0.9 * h;
    dAnticipe = parseFloat(dAnticipe.toFixed(3));
    
    b = Number(document.querySelector('.calcul-four_b').value) || 0;
    ln = Number(document.querySelector('.calcul-four_ln').value) || 0;
    let Gu = parseFloat(document.querySelector('.calcul-four_gu').value) || 0;
    let Q = parseFloat(document.querySelector('.calcul-four_q').value) || 0;
    //leff = parseFloat(document.querySelector('.calcul-four_leff').value) || 0;
    tg = parseFloat(document.querySelector('.calcul-four_tg').value);
    td = parseFloat(document.querySelector('.calcul-four_td').value);
    d = parseFloat(document.querySelector('.calcul-four_dprecis').value) || 0;
    let c = parseFloat(document.querySelector('.calcul-four_cenr').value) || 0; // c'
    cReel = Number(document.querySelector('.calcul-enrobage_reel').value) || 0;
    
    leff = (tg/2)+ln+(td/2);
    document.querySelector('.calcul-four_leff').innerHTML = leff.toFixed(2);
    
    const alertPoutre = document.querySelector('.alert-element_poutre');

if (!(ln > 3 * b)) {
  alertPoutre.innerHTML = `⚠️ Les conditions ne sont pas satisfaites ! Cet élément n'est pas une poutre car sa longueur (${ln} m) n'est pas supérieure à 3 fois son épaisseur (${b} m). Veuillez augmenter la longueur de l'élément ou diminuer son épaisseur.`;
  alertPoutre.style.display = "block"; // ✅ Affiche l'alerte
} else {
  alertPoutre.innerHTML = "";
  alertPoutre.style.display = "none"; // ✅ Cache l'alerte
}

    
    const alertHauteur = document.querySelector('.alert-element_d');

if (h <= d) {
  alertHauteur.innerHTML = `⚠️ Attention : la hauteur utile de la section = ${d} m ne peut pas être égale ou dépasser la hauteur de la poutre = ${h} m.`;
  alertHauteur.style.display = "block"; // ✅ Affiche l'alerte
} else {
  alertHauteur.innerHTML = "";
  alertHauteur.style.display = "none"; // ✅ Cache l'alerte
}

    
    //Function to update durée d’utilisation value
    let select_duree = document.querySelector('.calcul-four-select_duree');
    let duree = 50;
    
    switch (select_duree.value) {
        case '10' :
            duree = 10;
            document.querySelector('.calcul-four_duree').innerHTML = "Structures provisoires.";
            break;
        case '15' :
            duree = 15;
            document.querySelector('.calcul-four_duree').innerHTML = "Eléments structuraux remplaçables, comme des appareils d'appui.";
            break;
        case '25' :
            duree = 25;
            document.querySelector('.calcul-four_duree').innerHTML = "Structures agricoles et similaires.";
            break;
        case '50' :
            duree = 50;
            document.querySelector('.calcul-four_duree').innerHTML = "Bâtiments et autres structures courantes.";
            break;
        case '100' :
            duree = 100;
            document.querySelector('.calcul-four_duree').innerHTML = "Structures monumentales de bâtiments, ponts et autres ouvrages de génie civil.";
            break;
        
    }
    
    
    
    
    // Function to update classeExposition value XO=0, XC=1+, XD=2+, XS=3+, XF=4+, XA=5+
    let select_classeExposition = document.querySelector('.calcul-four-select-classe_exposition');
    let classeExposition = 20;
    let expValue = 11;
    let beton = "Béton C20/25";
    
    switch (select_classeExposition.value) {
        case 'XO' :
            classeExposition = 12;
            expValue = 0;
            beton = "C12/15";
            break;
        case 'XC1' :
            classeExposition = 20;
            expValue = 11;
            beton = "C20/25";
            break;
        case 'XC2' :
            classeExposition = 20;
            expValue = 12;
            beton = "C20/25";
            break;
        case 'XC3' :
            classeExposition = 25;
            expValue = 13;
            beton = "C25/30";
            break;
        case 'XD1' :
            classeExposition = 25;
            expValue = 21;
            beton = "C25/30";
            break;
        case 'XD2' :
            classeExposition = 30;
            expValue = 22;
            beton = "C30/37";
            break;
        case 'XD3' :
            classeExposition = 35;
            expValue = 23;
            beton = "C35/45";
            break;
        case 'XS1' :
            classeExposition = 30;
            expValue = 31;
            beton = "C30/37";
            break;
        case 'XS2' :
            classeExposition = 30;
            expValue = 32;
            beton = "C30/37";
            break;
        case 'XS3' :
            classeExposition = 35;
            expValue = 33;
            beton = "C40/50";
            break;
        case 'XF1' :
            classeExposition = 25;
            expValue = 41;
            beton = "C25/30";
            break;
        case 'XF2' :
            classeExposition = 25;
            expValue = 42;
            beton = "C25/30";
            break;
        case 'XF3' :
            classeExposition = 30;
            expValue = 43;
            beton = "C30/37";
            break;
        case 'XF4' :
            classeExposition = 35;
            expValue = 44;
            beton = "C35/45";
            break;
        case 'XA1' :
            classeExposition = 30;
            expValue = 51;
            beton = "C30/37";
            break;
        case 'XA2' :
            classeExposition = 35;
            expValue = 52;
            beton = "C35/45";
            break;
        case 'XA3' :
            classeExposition = 40;
            expValue = 53;
            beton = "C40/50";
            break;
    }
    
    const select_nuanceAcier = document.querySelector('.calcul-four-select-nuance_acier');
const alertNuanceAcier = document.querySelector('.alert-element-classe-nuance_acier');

switch (select_nuanceAcier.value) {
  case 'A':
    alertNuanceAcier.innerHTML = "⚠️ Attention : Pour l’instant, cette version du calcul prend en compte uniquement l’acier B500B.";
    alertNuanceAcier.style.display = "block"; // ✅ Affiche l'alerte
    break;

  case 'B':
    alertNuanceAcier.innerHTML = "";
    alertNuanceAcier.style.display = "none"; // ✅ Cache l'alerte
    break;
}

    
    
    // Convert fck to a number (assuming it's a string)
    let fckString = document.querySelector('.calcul-four-beton_fck').innerHTML;
    fck = parseFloat(fckString);
    //let fctm = parseFloat(); //0.3*fck*2/3(v stepeny)
    
   // Function to update fck value
    let select_fck = document.querySelector('.calcul-four-select-classe_beton');

    switch (select_fck.value) {
        case '12-15':
            fck = 12;
            fctm = 1.6;
            break;
        case '16-20':
            fck = 16;
            fctm = 1.9;
            break;
        case '20-25':
            fck = 20;
            fctm = 2.2;
            break;
        case '25-30':
            fck = 25;
            fctm = 2.6;
            break;
        case '30-37':
            fck = 30;
            fctm = 2.9;
            break;
        case '35-45':
            fck = 35;
            fctm = 3.2;
            break;
        case '40-50':
            fck = 40;
            fctm = 3.5;
            break;
        case '45-55':
            fck = 45;
            fctm = 3.8;
            break;
        case '50-60':
            fck = 50;
            fctm = 4.1;
            break;
    }
    document.querySelector('.calcul-four-beton_fck').innerHTML = fck;
    
    const alertBox = document.querySelector('.alert-element-classe_beton');

// Condition : classe d’exposition vs résistance béton
if (classeExposition > fck) {
  alertBox.innerHTML = `⚠️ Attention : pour cette classe d’exposition, la classe de résistance du béton doit être égale ou supérieure à ${beton}.`;
  alertBox.style.display = "block"; // ✅ Affiche l'alerte
} else {
  alertBox.innerHTML = "";
  alertBox.style.display = "none"; // ✅ Cache l'alerte
}

    
    // Classe structurale
    let expCoef = 0;
    
    if (duree === 100) {
        expCoef += 2;
    } else if (duree <= 25) {
        expCoef -= 0;
    }
    
    if (fck >= 30 && fck < 50 && (expValue === 0 || expValue === 11)) {
    expCoef -= 1;
    } else if (fck >= 50 && (expValue === 0 || expValue === 11)) {
        expCoef -= 2;
    } else if (fck >= 30 && fck < 55 && (expValue === 12 || expValue === 13)) {
        expCoef -= 1;
    } else if (fck >= 55 && (expValue === 12 || expValue === 13)) {
       expCoef -= 2; 
    } else if (fck >= 35 && fck < 60 && (expValue === 14 || expValue === 41 || expValue === 43)) {
        expCoef -= 1;
    } else if (fck >= 60 && (expValue === 14 || expValue === 41 || expValue === 43)) {
        expCoef -= 2;
    } else if (fck >= 40 && fck < 60 && (expValue === 21 || expValue === 31 || expValue === 51 || expValue === 22 || expValue === 32 || expValue === 52 || expValue === 42 || expValue === 44)) {
        expCoef -= 1;
    } else if (fck >= 60 && (expValue === 21 || expValue === 31 || expValue === 51 || expValue === 22 || expValue === 32 || expValue === 52 || expValue === 42 || expValue === 44)) {
        expCoef -= 2;
    } else if (fck >= 45 && fck < 70 && (expValue === 23 || expValue === 33 || expValue === 53)) {
        expCoef -= 1;
    } else if (fck >= 70 && (expValue === 23 || expValue === 33 || expValue === 53)) {
        expCoef -= 1;
    }
    
    let classeStr = 4 + expCoef;
    document.querySelector('.calcul-four-beton-classe_str').innerHTML = `S${classeStr} `;
    
    // CALCUL ENROBAGE
    
    // Calcul Enrodage cmin,dur (classeExposition value XO=0, XC=1+, XD=2+, XS=3+, XF=4+, XA=5+)
    
    let cMindur;
    
    const mappings = {
    1: {
        0: 10, 11: 10, 12: 10, 13: 10,
        14: 15, 41: 15,
        21: 20, 31: 20, 42: 20, 43: 20,
        22: 25, 32: 25, 44: 25,
        23: 30, 33: 30
        },
    2: {
        0: 10, 11: 10, 12: 15, 13: 15,
        14: 20, 41: 20,
        21: 25, 31: 25, 42: 25, 43: 25,
        22: 30, 32: 30, 44: 30,
        23: 35, 33: 35
    },
    3: {
        0: 10, 11: 10, 12: 20, 13: 20,
        14: 25, 41: 25,
        21: 30, 31: 30, 42: 30, 43: 30,
        22: 35, 32: 35, 44: 35,
        23: 40, 33: 40
    },
    4: {
        0: 10, 11: 15, 12: 25, 13: 25,
        14: 30, 41: 30,
        21: 35, 31: 35, 42: 35, 43: 35,
        22: 40, 32: 40, 44: 40,
        23: 45, 33: 45
    },
    5: {
        0: 15, 11: 20, 12: 30, 13: 30,
        14: 35, 41: 35,
        21: 40, 31: 40, 42: 40, 43: 40,
        22: 45, 32: 45, 44: 45,
        23: 50, 33: 50
    },
    6: {
        0: 20, 11: 25, 12: 35, 13: 35,
        14: 40, 41: 40,
        21: 45, 31: 45, 42: 45, 43: 45,
        22: 50, 32: 50, 44: 50,
        23: 55, 33: 55
    },
    
    };

    if (classeStr in mappings && expValue in mappings[classeStr]) {
        cMindur = mappings[classeStr][expValue];
    }
    
    document.querySelector('.calcul-enrobage_min_dur').innerHTML = cMindur;
    
    // calcul cnom
    let select_c_min_b = document.querySelector('.calcul-four-select-c_min_b');
    let cMinb = select_c_min_b.value;
    
    // Calcul de cmin
    cmin = Math.max(cMinb, cMindur, 10);
    document.querySelector('.calcul-enrobage_min').innerHTML = cmin;
    
    // Enrobage nom en m
    let cNom = (cmin/1000)+0.01;
    document.querySelector('.calcul-enrobage_nom').innerHTML = cNom.toFixed(3);
    
    const alertEnrobage = document.querySelector('.alert-element-classe-enrobage');

if (cReel < cNom) {
  alertEnrobage.innerHTML = `⚠️ Attention : L'enrobage nominal c<sub>nom</sub> = ${cNom.toFixed(3)} m est supérieur à l'enrobage réel c = ${cReel.toFixed(3)} m. Veuillez vérifier et corriger pour assurer la conformité aux exigences de durabilité et de sécurité définies par l'Eurocode 2.`;
  alertEnrobage.style.display = "block"; // ✅ Affiche l'alerte
} else {
  alertEnrobage.innerHTML = "";
  alertEnrobage.style.display = "none"; // ✅ Cache l'alerte
}

    
    
    // Function to update coef_reduct Ψ2 value
    let coefReduct = parseFloat(document.querySelector('.calcul-four-select-coef_reduct').value);
    
    // Function to update nuance_acier value
    let selectNuanceAcier = document.querySelector('.calcul-four-select-nuance_acier').value;
    
    //const alertNuanceAcier = document.querySelector('.alert-nuance_acier');

if (selectNuanceAcier === 'b500a') {
  alertNuanceAcier.innerHTML = "⚠️ Attention : Cet outil ne prend pas en charge le calcul pour l’acier de nuance A. Veuillez sélectionner une autre nuance d’acier.";
  alertNuanceAcier.style.display = "block"; // ✅ Affiche l'alerte
} else {
  alertNuanceAcier.innerHTML = "";
  alertNuanceAcier.style.display = "none"; // ✅ Cache l'alerte
}

    
     // calcul fcd
    fcd = fck / 1.5;
    fcd = parseFloat(fcd.toFixed(1));
    
    // fctk
    let fctkString = document.querySelector('.calcul-four-beton_fctk').innerHTML;
    fctk = parseFloat(fctkString);
    
    let select_fctk = document.querySelector('.calcul-four-select-classe_beton');

    switch (select_fctk.value) {
        case '12-15':
            fctk = 1.1;
            break;
        case '16-20':
            fctk = 1.3;
            break;
        case '20-25':
            fctk = 1.5;
            break;
        case '25-30':
            fctk = 1.8;
            break;
        case '30-37':
            fctk = 2.0;
            break;
        case '35-45':
            fctk = 2.2;
            break;
        case '40-50':
            fctk = 2.5;
            break;
        case '45-55':
            fctk = 2.7;
            break;
        case '50-60':
            fctk = 2.9;
            break;
    }
    
    // calculer poids propre de la poutre par mètre linéaire
    let Gpp = 25*b*h;
    
    // Calculer G
    let G = Gu + Gpp;
    
    // Calculer pu en utilisant les valeurs de G et Q
    pu = 1.35 * G + 1.5 * Q;
    // Calculer p_ser,qp en utilisant les valeurs de G, Q et Ψ_2 (coefReduct)
    let pSerQp = G + (coefReduct*Q);
    // Calculer MEd = Mu, max = Mleff,u,max = pu * leff² / 8
    med = (pu * leff*leff) / 8;
    // Calculer Mqp = Mser = pser,qp * leff² / 8
    mqp = (pSerQp * leff*leff) / 8;
    // Calcul de Effort tranchant maximal de calcul VEd = Vleff,u,nu appui = Vln,u,appui = pu * ln / 2
    ved = pu * ln / 2;
    // Calcul du moment réduit : μ = MEd / b * d² * fcd
    let mu = (med/1000) / (b*d*d*fcd);
    // Calcul de x/d (α)
    let alpha;
    let alertMessage_negatif = "";
    let alphaConditionsSatisfied = true;
    
    if (mu <= 0.5) {
        alpha = 1.25 * (1 - Math.sqrt(1 - 2 * mu));
    } else {
        alpha = 1;
        alertMessage_negatif = `Attention : μ = ${mu.toFixed(3)} > 0.5. La section est largement sur-armée et doit être redimensionnée.<br>
        Pour redimensionner la section, on pourrait généralement :
        <br>1. Augmenter la hauteur de la poutre (h) <span style="color: red; font-weight: bold;">‼️</span> Ajuster la hauteur utile de la section (d) selon la valeur d<sub>anticipé</sub> proposée.
        <br>2. Augmenter la largeur de la poutre (b)
        <br>3. Utiliser un béton de classe supérieure
        <br>4. Réduire les charges appliquées si possible`;
        alphaConditionsSatisfied = false;
    }
    
    const alertElement = document.querySelector('.alert-element_alpha');

if (alertMessage_negatif && alertMessage_negatif.trim() !== "") {
  alertElement.innerHTML = `⚠️ ${alertMessage_negatif}`;
  alertElement.style.display = "block"; // ✅ Affiche l'alerte
} else {
  alertElement.innerHTML = "";
  alertElement.style.display = "none"; // ✅ Cache l'alerte
}

    
    // Vérification de la classe de béton et de alpha
    let alertMessage_alpha = "";
    if (!alertMessage_negatif) {  // Seulement si alertMessage_negatif n'est pas affiché
        let classBeton = document.querySelector('.calcul-four-select-classe_beton').value;
        let classBetonNumber = parseInt(classBeton.split('-')[1]);
        if (classBetonNumber <= 60) {
            if (alpha > 0.45) {
                alertMessage_alpha = `⚠️ Attention : x/d (α) = ${alpha.toFixed(3)} > 0,45 pour un béton de classe C${classBeton}. 
            La section n'est pas assez ductile et doit être redimensionnée.<br>
            Pour redimensionner la section, on pourrait généralement :
            <br>1. Augmenter la hauteur de la poutre (h) <span style="color: red; font-weight: bold;">‼️</span> Ajuster la hauteur utile de la section (d) selon la valeur d<sub>anticipé</sub> proposée.
            <br>2. Augmenter la largeur de la poutre (b)
            <br>3. Utiliser un béton de classe supérieure`;
                alphaConditionsSatisfied = false;
            }
        } else {
            if (alpha > 0.35) {
                alertMessage_alpha = `⚠️ Attention : x/d (α) = ${alpha.toFixed(3)} > 0,35 pour un béton de classe C${classBeton}. 
            La section n'est pas assez ductile et doit être redimensionnée.<br>
            Pour redimensionner la section, on pourrait généralement :
            <br>1. Augmenter la hauteur de la poutre (h) <span style="color: red; font-weight: bold;">‼️</span> Ajuster la hauteur utile de la section (d) selon la valeur d<sub>anticipé</sub> proposée.
            <br>2. Augmenter la largeur de la poutre (b)
            <br>3. Utiliser un béton de classe supérieure`;
                alphaConditionsSatisfied = false;
            }
        }
        
        // Affichage de l'alerte si nécessaire
let alertElement_2 = document.querySelector('.alert-element_alpha_1');
if (alertMessage_alpha) {
    alertElement_2.innerHTML = alertMessage_alpha;
    alertElement_2.style.display = 'block';
} else {
    alertElement_2.innerHTML = "";
    alertElement_2.style.display = 'none';
}
} else {
    // Masquer alertElement_2 si alertMessage_negatif est affiché
    let alertElement_2 = document.querySelector('.alert-element_alpha_1');
    alertElement_2.innerHTML = "";
    alertElement_2.style.display = 'none';
}


    // Afficher "OK" en vert si toutes les conditions sont satisfaites
    let unitElement = document.querySelector('.calcul-four_text_alpha');
    if (alphaConditionsSatisfied) {
        unitElement.innerHTML = "Pour les bétons de classe &le; C50/60 : α (x/d) doit être &le; 0,45 - <span style=\"font-size: 1.2rem; color: green; font-weight: bold;\">OK</span>";
        
    } else {
        unitElement.innerHTML = "Pour les bétons de classe &le; C50/60 : α (x/d) doit être &le; 0,45";
        unitElement.style.color = "initial";
    }
    
    // Verification si aciers comprimés A' est nessasaire, et si Pivot est C
    //let aCom;
    //let aS;
    let sigmaS; // σs
    let epsilonS; // εs
    let muR = 0.372;
    let alphaR = 0.619;
    let sigmaSC; // σsc

    if (mu < 0.372) {
    aCom = 0;
    document.querySelector('.calcul-four_text_acom').innerHTML = 'μ &lt; μ<sub>R</sub> = 0,372, les armatures de compression ne sont pas requises (A\' = 0).';
    
        // Calcule Armatures de traction As pour mu < 0.372
        if (mu <= 0.056) {
            aS = ((med/1000)/((1-0.4*alpha)*d*470))*10000;
            document.querySelector('.calcul-four_symb_as').innerHTML = 'A<sub>s</sub> = M<sub>Ed</sub> / (1 - 0.4α)*d*σ<sub>s</sub>';
            document.querySelector('.calcul-four_text_as').innerHTML = 'μ ≤ 0.056 - Pivot A ,<br> σ<sub>s</sub> = 470 Mpa.';
        } else {
            epsilonS = 0.0035*((1-alpha)/alpha);
            sigmaS = 435+727*(epsilonS-0.00217);
            aS = ((med/1000)/((1-0.4*alpha)*d*sigmaS))*10000;
            document.querySelector('.calcul-four_symb_as').innerHTML = 'A<sub>s</sub> = M<sub>Ed</sub> / (1 - 0.4α)*d*σ<sub>s</sub>';
            document.querySelector('.calcul-four_text_as').innerHTML = 'μ > 0.056 - Pivot B;<br>ε<sub>s</sub> = (1/α-1)*ε<sub>cu</sub>, ε<sub>cu2</sub> <sub>0/00</sub> = 3,5;<br>σ<sub>s</sub> = 435 +727(ε<sub>s</sub> - 2.17*10<sup>-3</sup>).';
        }
    } else {
    // Pour mu >= 0.372 (Pivot C)
    // calcul A' aCom
    let yR = alphaR*d;
    let epsilonSC = 0.0035*(((yR*100)-(c*100))/(yR*100));
        if (epsilonSC < 0.00217) {
            sigmaSC = 200000*epsilonSC;
        } else {
            sigmaSC = 435+(727*(epsilonSC-0.00217));
        }
        
    let mR = muR*b*d*d*fcd;
    aCom = (((med/1000)-mR)/((d-c)*sigmaSC))*10000;
    document.querySelector('.calcul-four_text_acom').innerHTML = "μ<sub>R</sub> = 0.372, M<sub>R</sub> = μ<sub>R</sub>bd<sup>2</sup>f<sub>cd</sub>,<br> σ<sub>sc</sub> = 435 + 727(ε<sub>sc</sub> - 2.17*10<sup>-3</sup>);";
    document.querySelector('.calcul-four_symb_acom').innerHTML = "A' = M<sub>Ed</sub> - M<sub>R</sub> / (d - c')σ<sub>sc</sub>"
    
    // calcul As; σs = fyd = fyk/ɣs = 500/1.15 = 435; αR = 0.619;
    sigmaS = 435;
    aS = ((med/1000)/((1-0.4*0.619)*d*sigmaS))*10000+(aCom*(sigmaSC/sigmaS));
    document.querySelector('.calcul-four_symb_as').innerHTML = "A<sub>s</sub> = M<sub>Ed</sub> / (1 - 0.4α<sub>R</sub>)*d*σ<sub>s</sub> + A'(σ<sub>sc</sub> / σ<sub>s</sub>)";
    document.querySelector('.calcul-four_text_as').innerHTML = 'μ<sub>R</sub> = 0.372, α<sub>R</sub> = 0.619, σ<sub>s</sub> = f<sub>yk</sub> = 435MPa;';
    }
    
    
    // Output data
    document.querySelector('.calcul-four-rem_dprecis').innerHTML = 'd<sub>anticipé</sub> = (0.9 x h) = ' +dAnticipe +' m, <span style="font-size: 0.8rem;">ajustez cette valeur en fonction des résultats obtenus.</span>';
    
    document.querySelector('.calcul-four-beton_fcd').innerHTML = fcd;
    document.querySelector('.calcul-four-beton_fctk').innerHTML = fctk;
    document.querySelector('.calcul-four-beton_pu').textContent = pu.toFixed(2);
    document.querySelector('.calcul-four-coef_reduct').innerHTML = ' Ψ<sub>2</sub> = ' +coefReduct;
    document.querySelector('.calcul-four-beton_pser_qp').textContent = pSerQp.toFixed(2);
    document.querySelector('.calcul-four_med').innerHTML = med.toFixed(2);
    document.querySelector('.calcul-four_mqp').innerHTML = mqp.toFixed(2);
    document.querySelector('.calcul-four_ved').innerHTML = ved.toFixed(2);
    document.querySelector('.calcul-four_mu').innerHTML = mu.toFixed(3);
    document.querySelector('.calcul-four_as').innerHTML = aS.toFixed(3);
    // montrer le resultat en rouge si alfa > 0.45
    const resultAlpha = document.querySelector('.calcul-four_alpha');
    resultAlpha.innerHTML = alpha.toFixed(3);
    if (alpha > 0.45) {
    resultAlpha.style.color = 'red';
    }else {
    resultAlpha.style.color = '##58a6ff';    
    }
    
    //éviter d'afficher des zéros non nécessaires pour valeurs = 0
    function formatNumber(num) {
    if (num === 0) return '0';
    let formatted = num.toFixed(3);
    return parseFloat(formatted).toString();
    }
    document.querySelector('.calcul-four_acom').innerHTML = formatNumber(aCom);
    document.querySelector('.calcul-four-beton_g').innerHTML = formatNumber(G);
    document.querySelector('.calcul-four-beton_gpp').innerHTML = formatNumber(Gpp);
        
    verificationPoutre();
    
}

// Fonction pour effectuer les vérification
    let AB;
    let asMax;
    let asMin;
    let sigmaCqp;
    let fck45;
    let ldRatio;

function verificationPoutre(){
    let h = parseFloat(document.querySelector('.calcul-four_h').value) || 0;
    let b = Number(document.querySelector('.calcul-four_b').value) || 0;
    let d = parseFloat(document.querySelector('.calcul-four_dprecis').value) || 0;
    
    asMax = 0.04 * b * h*10000; // As,max = 0.04 * Ac
    
    // Vérifie si asMax est un nombre entier
    let asMaxStr = Number.isInteger(asMax) ? asMax.toFixed(0) : asMax.toFixed(3);
    
    // Taux d'armature maximal
    document.querySelector('.calcul-four_verif_asmax').innerHTML = `A<sub>s</sub> = ${aS.toFixed(3)} cm²<br>A<sub>s,max</sub> = ${asMaxStr} cm²`;
     if (aS <= asMax){
    document.querySelector('.verif-status_asmax').innerHTML = '<span style="color: green; font-weight: bold;">OK</span>';
    } else {
        document.querySelector('.verif-status_asmax').innerHTML = '<span style="color: red; font-weight: bold;">Non validé</span>';
    }
    
    
    // Taux d'armature minimale (non-fragilité)
    // Vérification de l'acier minimal selon EC2
    let asMin1 = (0.26 * (fctm / 500) * d * b) * 10000;
    let asMin2 = (0.0013 * d * b) * 10000;
    let asMin = Math.max(asMin1, asMin2);

    // Affichage des valeurs d'armature
    document.querySelector('.calcul-four_verif_asmin').innerHTML = `
        A<sub>s</sub> = ${aS.toFixed(3)} cm²<br>
        A<sub>s,min</sub> = ${asMin.toFixed(3)} cm²
    `;

    // Vérification et mise à jour
if (aS < asMin) {
    aS = asMin; // Ajustement automatique

    document.querySelector('.verif-status_asmin').innerHTML = `
        <span style="color: red; font-weight: bold;">Non conforme</span>
    `;

    document.querySelector('.alert-element_asmin').innerHTML = `
        <div style="background-color: #fff3cd; color: #856404; border: 1px solid #ffeeba; padding: 10px; border-radius: 5px; font-size: 0.95em;">
            ⚠️ L'armature calculée A<sub>s</sub> était inférieure à la valeur minimale exigée par l'Eurocode 2.<br>
            <strong>Le calcul se poursuit automatiquement avec</strong> A<sub>s</sub> = A<sub>s,min</sub> <strong>conformément à la norme</strong>, afin de garantir la sécurité structurelle (non-fragilité).
        </div>
    `;
    document.querySelector('.alert-element_asmin').style.display = 'block'; // ✅ Affiche l'alerte
} else {
    document.querySelector('.verif-status_asmin').innerHTML = `
        <span style="color: green; font-weight: bold;">OK</span>
    `;
    document.querySelector('.alert-element_asmin').innerHTML = ''; // Pas d'alerte si conforme
    document.querySelector('.alert-element_asmin').style.display = 'none'; // ✅ Cache l'alerte
}


    
    //Vérification de la contrainte de compression σc,qp,ser ≤ 0.45*fck pour fluage linéaire
    let Es = 200000; // Module d'élasticité de l'acier (MPa)
    let Ecm = 22000 * Math.pow((fck + 8) / 10, 0.3); // Module d'élasticité du béton (MPa)
    let αe = Es / Ecm; // Coefficient d'équivalence
    let aSm = aS/10000;
    
    // Calcul de la position de l'axe neutre
    //let x = (αe * aSm / b) * (Math.sqrt(1 + (2 * b * d) / (αe * aSm)) - 1);
    let A = b / 2;
    let B = αe * aSm;
    let C = -αe * aSm * d;
    let x = (-B + Math.sqrt(B*B - 4*A*C)) / (2*A);
    
    // Calcul du moment d'inertie de la section fissurée
    let I = (b * Math.pow(x, 3)) / 3 + αe * aSm * Math.pow(d - x, 2);
    // Calcul de la contrainte de compression σc sous charge quasi-permanente
    sigmaCqp = ((mqp/1000) * x) / I;
    fck45 = 0.45*fck;
    
    document.querySelector('.calcul-four_verif_sigmacqp').innerHTML = `σ<sub>c,qp,ser</sub> = ${sigmaCqp.toFixed(1)} MPa<br>0.45*f<sub>ck</sub> = ${fck45.toFixed(1)} MPa`;

if (sigmaCqp <= fck45) {
    document.querySelector('.verif-status_sigmacqp').innerHTML = '<span style="color: green; font-weight: bold;">OK</span>';
    document.querySelector('.alert-element_sigmacqp').innerHTML = "";
    document.querySelector('.alert-element_sigmacqp').style.display = 'none'; // ✅ Cache l'alerte
} else {
    document.querySelector('.verif-status_sigmacqp').innerHTML = '<span style="color: red; font-weight: bold;">Non validé</span>';
    document.querySelector('.alert-element_sigmacqp').innerHTML = `⚠️ Attention : σ<sub>c,qp,ser</sub> = ${sigmaCqp.toFixed(1)} MPa > 0.45*f<sub>ck</sub> = ${fck45.toFixed(1)} MPa - La contrainte de compression dépasse la limite admissible, la section doit être redimensionnée.<br>
        Pour redimensionner la section, on pourrait généralement :

        <br>1. Augmenter la hauteur de la poutre (h) <span style="color: red; font-weight: bold;">‼️</span> Ajuster la hauteur utile de la section (d) selon la valeur d<sub>anticipé</sub> proposée.
        <br>2. Augmenter la largeur de la poutre (b)
        <br>3. Utiliser un béton de classe supérieure.`;
    document.querySelector('.alert-element_sigmacqp').style.display = 'block'; // ✅ Affiche l'alerte
}

    
    // Vérification de la flèche
    let rho = (aS/10000) / (b * d);
    let rho_prime = (aCom/10000) / (b * d);
    let rho_0 = Math.sqrt(fck) * 1e-3;
    ldRatio = leff/d;
    let K = 1;
    
    if (leff > 7) {
       ldRatio = (leff/d)*(7/leff); 
    }
    
    if (rho <= rho_0) {
        AB = K * (11 + 1.5 * Math.sqrt(fck) * rho_0 / rho + 3.2 * Math.sqrt(fck) * Math.pow((rho_0 / rho - 1), 1.5));
    } else {
        AB = K * (11 + 1.5 * Math.sqrt(fck) * rho_0 / (rho - rho_prime) + 1/12 * Math.sqrt(fck) * Math.sqrt(rho_prime / rho_0));
    }
    
    document.querySelector('.calcul-four_verif_fleche').innerHTML = `ρ = ${rho.toFixed(3)}<br> ρ' = ${rho_prime.toFixed(3)}<br> ρ<sub>0</sub> = ${rho_0.toFixed(3)}<br> l<sub>eff</sub>/d = ${ldRatio.toFixed(1)}<br> A = ${AB.toFixed(1)}`;

if (ldRatio <= AB) {
    document.querySelector('.verif-status_fleche').innerHTML = '<span style="color: green; font-weight: bold;">OK</span>';
    document.querySelector('.alert-element_fleche').innerHTML = '';
    document.querySelector('.alert-element_fleche').style.display = 'none'; // ✅ Cache l'alerte
} else {
    document.querySelector('.verif-status_fleche').innerHTML = '<span style="color: red; font-weight: bold;">Non validé</span>';
    document.querySelector('.alert-element_fleche').innerHTML = `⚠️ Attention : l<sub>eff</sub>/d = ${ldRatio.toFixed(2)} > A = ${AB.toFixed(2)} - la vérification simplifiée de la flèche  par le rapport l/d n'est pas validée, la section doit être redimensionnée ou un calcul plus détaillé de la valeur réelle de la flèche est nécessaire.<br>
        Pour redimensionner la section, on pourrait généralement :
        <br>1. Augmenter la hauteur de la poutre (h) <span style="color: red; font-weight: bold;">‼️</span> Ajuster la hauteur utile de la section (d) selon la valeur d<sub>anticipé</sub> proposée.
        <br>2. Augmenter la largeur de la poutre (b)
        <br>3. Utiliser un béton de classe supérieure.`;
    document.querySelector('.alert-element_fleche').style.display = 'block'; // ✅ Affiche l'alerte
}

    
}
