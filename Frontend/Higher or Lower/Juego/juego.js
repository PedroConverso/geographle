function openmenudropdown() {
    let menu = document.getElementById("menudropdown")
    if (menu.classList.contains("open")) {
        menu.classList.remove("open")
    } else {
        menu.classList.add("open")
    }
}

function openestadown() {
    let menu = document.getElementById("estadown")
    if (menu.classList.contains("edOpen")) {
        menu.classList.remove("edOpen")
    } else {
        menu.classList.add("edOpen")
    }
}

function optisdown() {
    let menu = document.getElementById("optidown")
    if (menu.classList.contains("edSet")) {
        menu.classList.remove("edSet")
    } else {
        menu.classList.add("edSet")
    }
}

function thememode() {
    let menu = document.getElementById("themeMode-check-container")
    if (menu.classList.contains("themeMode-check-container-on")) {
        menu.classList.remove("themeMode-check-container-on")
    } else {
        menu.classList.add("themeMode-check-container-on")
    }
}

function thememode2() {
    let menu = document.getElementById("themeMode-check-container2")
    if (menu.classList.contains("themeMode-check-container-on2")) {
        menu.classList.remove("themeMode-check-container-on2")
    } else {
        menu.classList.add("themeMode-check-container-on2")
    }
}
let firstClick = true;

let consigna

document.addEventListener("DOMContentLoaded", () => {
    postData("iniciarRonda", null, (res) => {
        let pais1 = res.country1;
        let pais2 = res.country2;
        consigna = res.consigna;

        document.getElementById("pais1").innerHTML = pais1.country;
        document.getElementById("pais2").innerHTML = pais2.country;
        document.getElementById("gameTheme").innerHTML = consigna;
        document.getElementById("pais1data").innerHTML = pais1[consigna];

        if (firstClick) {
            document.getElementById("higherBtn").addEventListener("click", () => verifyAnswerHigherOrLower(pais1, pais2, consigna, "higher"));
            document.getElementById("lowerBtn").addEventListener("click", () => verifyAnswerHigherOrLower(pais1, pais2, consigna, "lower"));
            firstClick = false; // Set firstClick to false after adding event listeners
        }
    });
});

const verifyAnswerHigherOrLower = (country1, country2, consigna, userGuess) => {
    const data = {
        "country1": country1,
        "country2": country2,
        "consigna": consigna,
        "userGuess": userGuess
    };

    postData("validarRespuesta", data, (res) => {
        if (res === true) {
            handleCorrectAnswer(country2, data);
        } else {
            handleWrongAnswer(country2, data);
        }
    });
};

const handleCorrectAnswer = (country2, data) => {
    document.getElementById("orContent").innerHTML = "Correcto!";
    document.getElementById("higherBtn").style.display = "none";
    document.getElementById("lowerBtn").style.display = "none";
    document.getElementById("pais2data").innerHTML = country2[data.consigna];

    setTimeout(() => {
        postData("continuarJuego", (country2), (res) => {
            updateGameState(res);
        });

        document.getElementById("higherBtn").style.display = "flex";
        document.getElementById("lowerBtn").style.display = "flex";
        document.getElementById("pais2data").innerHTML = "";
        document.getElementById("orContent").innerHTML = "OR";
    }, 1500);
};

const handleWrongAnswer = (country2) => {
    document.getElementById("orContent").innerHTML = "Perdiste! Clickeame para reiniciar";
    document.getElementById("orContent").addEventListener("click", () => {
        window.location.reload();
    })
    document.getElementById("higherBtn").style.display = "none";
    document.getElementById("lowerBtn").style.display = "none";
    document.getElementById("pais2data").innerHTML = country2[consigna];
};

const updateGameState = (res) => {
    console.log(res)
    let pais1 = res.country1;
    let pais2 = res.country2;

    document.getElementById("pais1").innerHTML = pais1.country;
    document.getElementById("pais2").innerHTML = pais2.country;
    document.getElementById("pais1data").innerHTML = pais1[consigna];
    document.getElementById("pais2data").innerHTML = "";
    document.getElementById("orContent").innerHTML = "OR";

    document.getElementById("higherBtn").addEventListener("click", () => verifyAnswerHigherOrLower(pais1, pais2, consigna, "higher"));
    document.getElementById("lowerBtn").addEventListener("click", () => verifyAnswerHigherOrLower(pais1, pais2, consigna, "lower"));
};
