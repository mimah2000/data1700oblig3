//Erklærer en variabel kalt billetter og initialiserer den til en tom array
let billetter = [];

function lagreBillett() {
    let error = false;
    let billett = {
        film: document.getElementById("film").value,
        antall: document.getElementById("antall").value,
        fornavn: document.getElementById("fornavn").value,
        etternavn: document.getElementById("etternavn").value,
        tlf: document.getElementById("tlf").value,
        epost: document.getElementById("epost").value
    };

    for (let i in billett) {
        if (billett[i] === "") {
            document.getElementById(i + "Error").innerHTML = "Vennligst fyll ut " + i;
            error = true;
        } else {
            document.getElementById(i + "Error").innerHTML = "";
        }
    }

    if (!error) {
        if (billett.antall < 1) {
            document.getElementById("antallError").innerHTML = "Antallet må være minst 1";
            error = true;
        }
        if (billett.tlf.length !== 8) {
            document.getElementById("tlfError").innerHTML = "Vennligst skriv inn 8 sifre";
            error = true;
        }
        if (!billett.epost.includes('@') || !billett.epost.includes(".")) {
            document.getElementById("epostError").innerHTML = "Ugyldig epostadresse";
            error = true;
        }
    }

    if (!error) {
        billetter.push(billett);
        tomInput();
        visBilletter(billetter);

        $.post("/lagreAlle", billett, function (data) {
            console.log("Data saved to server:", data);
            hentAlle();
        });
    }
}

function tomInput() {
    const inputs = ["film", "antall", "fornavn", "etternavn", "tlf", "epost"];
    inputs.forEach(input => {
        document.getElementById(input).value = "";
    });
}

function visBilletter(billetter) {
    let ut = "<tr><th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnummer</th><th>E-post</th></tr>";
    billetter.forEach(billett => {
        ut += `<tr><td>${billett.film}</td><td>${billett.antall}</td><td>${billett.fornavn}</td><td>${billett.etternavn}</td><td>${billett.tlf}</td><td>${billett.epost}</td></tr>`;
    });
    document.getElementById("billetter").innerHTML = ut;
}

function hentAlle() {
    $.get("/hentAlle", function (data) {
        console.log("data received from server", data);
        visBilletter(data);
    });
}

function clearAll() {
    $.get("/slettAlle", function (data) {
        //console.log (data)
    }).done(function(){
    updateBestilling()
    })
}

/*
function clearAll() {
    console.log("Attempting to clear all tickets...");
    $.get("/slettAlle", function () {
        console.log("All data deleted from server.");
        billetter = [];  // Bruk billetter = [] for å sikre at arrayet er tomt.
        document.getElementById("billetter").innerHTML = "";
        hentAlle();  // Henter oppdaterte data for å bekrefte at alt er slettet.
    }).fail(function (error) {
        console.error("Failed to clear tickets:", error);
    });


/*
//Denne funksjonen bruker en for-each loop for å sette verdiene i billett arrayet inn i Tablemid?
function updateBestilling(){
    let arrayEmpty = bool;
    $.get("/checkBilletterIsEmpty", function (bool) {
        arrayEmpty = bool;
    }).done(function(){
        //passer på at resten av koden ikke kjører før denne er ferdig.
        if (arrayEmpty) {
            $("#showTable").addClass("d-none");
            //om det ikke er noe innhold i billetter arrayet, så blir div-en gjemt.
        } else {
            let BilletterList;
            $.get("/getAllBilletter", function (data) {
                BilletterList = data;
                //console.log("recieving list")
            }).done(function(){
                //pass på at resten av koden ikke kjører før denne er ferdig
                const tableStart =
                    <table class></table>
            }
        }
    }
}