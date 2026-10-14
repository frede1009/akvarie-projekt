// FISKEDATA
const akvarieFisk = [
  {
    id: "picasso",
    navn: "Picasso-fisken",
    art: "Rhinecanthus aculeatus",
    billede: "images/Art 1 · Picasso-fisken.svg",
    foder: "Små krebsdyr, bløddyr og alger",
    findested: "Ved revets klipper og sandbund",
    sjovtFact: "Den kan sprøjte en vandstråle mod sandet for at finde skjult føde.",
    størrelse: "Bliver op til 30 cm lang",
    farve: "#FF003C",
    alt: "Picasso-fisk med blå og gule striber i et koralrev",
  },
  {
    id: "sommerfuglefisk",
    navn: "Sommerfuglefisk",
    art: "Chaetodon semilarvatus",
    billede: "images/Art 2 · Gul kejserfisk.svg",
    foder: "Koraller, smådyr og plankton",
    findested: "Blandt korallerne",
    sjovtFact: "Den er flad som en pandekage. Derfor kan den nemt smutte ind mellem stenene.",
    størrelse: "Bliver op til 23 cm lang",
    farve: "#E94C06",
    alt: "Gul og brun sommerfuglefisk, der svømmer i blåt vand",
  },
  {
    id: "klovnfisk",
    navn: "Klovnfisk",
    art: "Amphiprion ocellaris",
    billede: "images/Art 3 · Klovnfisk.svg",
    foder: "Alger, plankton og små krebsdyr",
    findested: "Klovnfisken gemmer sig ofte mellem anemonernes fangarme",
    sjovtFact: "Hvis hunnen i gruppen forsvinder, kan hannen blive til en hun.",
    størrelse: "Bliver op til 11 cm lang",
    farve: "#F5B71F",
    alt: "Klovnfisk, der gemmer sig mellem en anemones fangarme",
  },
  {
    id: "kuglefisk",
    navn: "Blå kuglefisk",
    art: "Tetraodontidae",
    billede: "images/Art 4 · Blå kuglefisk.svg",
    foder: "Muslinger, snegle og koraller",
    findested: "Langs sandbunden",
    sjovtFact: "Når kuglefisken bliver bange, kan den puste sig op som en ballon.",
    størrelse: "Bliver op til 40 cm lang",
    farve: "#2CAA9A",
    alt: "Blå kuglefisk foran et mørkt koralrev",
  },
  {
    id: "sergentfisk",
    navn: "Sergentfisk",
    art: "Abudefduf vaigiensis",
    billede: "images/Art 5 · Rev-sommerfuglefisk.svg",
    foder: "Plankton, alger og små krebsdyr",
    findested: "Ved koralrevet i små stimer",
    sjovtFact: "Far-fisken passer på æggene og vifter frisk vand hen over dem.",
    størrelse: "Bliver op til 20 cm lang",
    farve: "#ACD188",
    alt: "Blåstribet sergentfisk ved et koralrev",
  },
  {
    id: "pudsefisk",
    navn: "Pudsefisk",
    art: "Labroides dimidiatus",
    billede: "images/Art 6 - Pudsefisk.svg",
    foder: "Små parasitter og døde hudrester fra andre fisk",
    findested: "Ved revets pudsestationer",
    sjovtFact: "Større fisk lader pudsefisken svømme ind i munden for at rense tænderne.",
    størrelse: "Bliver op til 14 cm lang",
    farve: "#FF97C2",
    alt: "Gul og blå pudsefisk med en mindre fisk i baggrunden",
  },
];

// HTML-elementer, som opdateres eller lytter efter brugerens handlinger.
const fiskekortListe = document.querySelector("#fish-grid");
const storFiskBillede = document.querySelector("#featured-image");
const storFiskArtsnavn = document.querySelector("#featured-species");
const storFiskNavn = document.querySelector("#featured-name");
const storFiskFindested = document.querySelector("#featured-location");
const moedFiskKnap = document.querySelector("#featured-details");
const fiskeDetaljeDialog = document.querySelector("#fish-dialog");
const fisketunnel = document.querySelector(".bund-tunnel");
const startFisk = akvarieFisk.find((fisk) => fisk.id === "kuglefisk");
let valgtFisk = startFisk;

// OVERSIGTSKORT
// Bygger et fiskekort med navn, art og billedindhold.
function opretFiskekort(fisk, index) {
  const listeElement = document.createElement("li");
  listeElement.className = "fish-list-item";

  const fiskArtikel = document.createElement("article");
  fiskArtikel.className = "fish-card-article";

  const kortOverskrift = document.createElement("h3");
  kortOverskrift.className = "visually-hidden";
  kortOverskrift.id = `fish-heading-${fisk.id}`;
  kortOverskrift.textContent = `${fisk.navn}, ${fisk.art}`;

  const fiskeknap = document.createElement("button");
  fiskeknap.className = "fish-card";
  fiskeknap.type = "button";
  fiskeknap.dataset.fishId = fisk.id;
  fiskeknap.setAttribute("aria-pressed", String(fisk.id === valgtFisk.id));
  fiskeknap.setAttribute("aria-labelledby", kortOverskrift.id);
  fiskeknap.style.setProperty("--fish-color", fisk.farve);

  const kortBillede = document.createElement("img");
  kortBillede.src = fisk.billede;
  kortBillede.alt = "";
  kortBillede.loading = "lazy";

  const billedSkygge = document.createElement("span");
  billedSkygge.className = "fish-card-shade";
  billedSkygge.setAttribute("aria-hidden", "true");

  const artsNummer = document.createElement("span");
  artsNummer.className = "fish-card-number";
  artsNummer.setAttribute("aria-hidden", "true");
  artsNummer.textContent = String(index + 1).padStart(2, "0");

  const kortTekst = document.createElement("span");
  kortTekst.className = "fish-card-copy";

  const artsnavn = document.createElement("span");
  artsnavn.className = "fish-card-species";
  artsnavn.textContent = fisk.art;

  const fiskeNavn = document.createElement("strong");
  fiskeNavn.textContent = fisk.navn;

  kortTekst.append(artsnavn, fiskeNavn);
  fiskeknap.append(kortBillede, billedSkygge, artsNummer, kortTekst);
  fiskArtikel.append(kortOverskrift, fiskeknap);
  listeElement.append(fiskArtikel);
  return listeElement;
}

// Tegner alle kortene fra data og synkroniserer tælleren.
function visFiskeliste() {
  fiskekortListe.replaceChildren(
    ...akvarieFisk.map((fisk, index) => opretFiskekort(fisk, index)),
  );
}

// Valg af fisk opdaterer både det store kort og den aktive markering.
function vaelgFisk(fisk) {
  valgtFisk = fisk;
  storFiskBillede.src = fisk.billede;
  storFiskBillede.alt = fisk.alt;
  storFiskArtsnavn.textContent = fisk.art;
  storFiskNavn.textContent = fisk.navn;
  storFiskFindested.textContent = fisk.findested;
  moedFiskKnap.setAttribute("aria-label", `Mød ${fisk.navn}`);

  fiskekortListe.querySelectorAll(".fish-card").forEach((fiskeknap) => {
    fiskeknap.setAttribute(
      "aria-pressed",
      String(fiskeknap.dataset.fishId === fisk.id),
    );
  });
}

// DETALJEVISNING
// Tilføjer én ikonmarkeret række til listens fakta.
function tilfoejFiskeoplysning(egenskabsListe, ikon, betegnelse, vaerdi) {
  const egenskabsElement = document.createElement("div");
  const egenskabsNavn = document.createElement("dt");
  const egenskabsVaerdi = document.createElement("dd");
  const ikonElement = document.createElement("span");

  ikonElement.className = "detail-attribute-icon";
  ikonElement.setAttribute("aria-hidden", "true");
  ikonElement.textContent = ikon;
  egenskabsNavn.append(ikonElement, document.createTextNode(` ${betegnelse}`));
  egenskabsVaerdi.textContent = vaerdi;
  egenskabsElement.append(egenskabsNavn, egenskabsVaerdi);
  egenskabsListe.append(egenskabsElement);
}

// Udfylder detaljerne for den valgte fisk og åbner dialogen.
function aabnFiskeDetaljer(fisk) {
  const detaljeBillede = document.querySelector("#detail-image");
  const egenskabsListe = document.querySelector("#detail-attributes");
  const billedTekst = document.querySelector("#detail-caption");

  vaelgFisk(fisk);
  detaljeBillede.src = fisk.billede;
  detaljeBillede.alt = fisk.alt;
  billedTekst.textContent = fisk.navn;
  document.querySelector("#detail-species").textContent = fisk.art;
  document.querySelector("#detail-name").textContent = fisk.navn;
  document.querySelector("#detail-fact").textContent = fisk.sjovtFact;
  egenskabsListe.replaceChildren();

  [
    ["📏", "Størrelse", fisk.størrelse],
    ["🍴", "På menuen", fisk.foder],
    ["📍", "Find den", fisk.findested],
  ].forEach(([ikon, betegnelse, vaerdi]) =>
    tilfoejFiskeoplysning(egenskabsListe, ikon, betegnelse, vaerdi),
  );

  fiskeDetaljeDialog.showModal();
}

// INITIALISERING
// Tegn artslisten og vis kuglefisken som den første valgte fisk.
visFiskeliste();
vaelgFisk(startFisk);

// Hændelseslyttere på fiskekortene bruger event delegation fra listen.
fiskekortListe.addEventListener("click", (haendelse) => {
  const fiskeknap = haendelse.target.closest(".fish-card");
  if (!fiskeknap) {
    return;
  }

  const fisk = akvarieFisk.find(
    (fiskeData) => fiskeData.id === fiskeknap.dataset.fishId,
  );
  if (fisk) {
    vaelgFisk(fisk);
  }
});

// Detaljeknappen åbner oplysninger om den aktuelt valgte fisk.
moedFiskKnap.addEventListener("click", () =>
  aabnFiskeDetaljer(valgtFisk),
);

// TUNNELFISK
// Ved klik vælger fisken en tilfældig retning og svømmer ud af tunnelen.
fisketunnel.addEventListener("click", (haendelse) => {
  const tunnelFisk = haendelse.target.closest(".bundfisk");
  if (!tunnelFisk || tunnelFisk.classList.contains("bundfisk--skraemt")) {
    return;
  }

  const tunnelOmraade = fisketunnel.getBoundingClientRect();
  const fiskOmraade = tunnelFisk.getBoundingClientRect();
  const startPosition = fiskOmraade.left - tunnelOmraade.left;
  const svømModHoejre = Math.random() < 0.5;

  tunnelFisk.style.left = `${startPosition}px`;
  tunnelFisk.style.setProperty("--escape-start-left", `${startPosition}px`);
  tunnelFisk.style.setProperty(
    "--escape-end-left",
    svømModHoejre
      ? `${fisketunnel.clientWidth + tunnelFisk.offsetWidth}px`
      : `${-tunnelFisk.offsetWidth}px`,
  );
  tunnelFisk.style.setProperty(
    "--escape-flip",
    svømModHoejre ? "scaleX(-1)" : "scaleX(1)",
  );
  tunnelFisk.classList.add("bundfisk--skraemt");

  // Når flugten slutter, fjernes midlertidig styling, så løkken kan fortsætte.
  const afslutFlugt = (animation) => {
    if (animation.animationName !== "fishEscape") {
      return;
    }

    tunnelFisk.removeEventListener("animationend", afslutFlugt);
    tunnelFisk.classList.remove("bundfisk--skraemt");
    tunnelFisk.style.removeProperty("left");
    tunnelFisk.style.removeProperty("--escape-start-left");
    tunnelFisk.style.removeProperty("--escape-end-left");
    tunnelFisk.style.removeProperty("--escape-flip");
  };

  tunnelFisk.addEventListener("animationend", afslutFlugt);
});

// DIALOGENS LUKNING
// Begge knapper lukker dialogen; klik på baggrunden gør det også.
document.querySelector("#dialog-close").addEventListener("click", () => {
  fiskeDetaljeDialog.close();
});

document.querySelector("#detail-done").addEventListener("click", () => {
  fiskeDetaljeDialog.close();
});

fiskeDetaljeDialog.addEventListener("click", (haendelse) => {
  if (haendelse.target === fiskeDetaljeDialog) {
    fiskeDetaljeDialog.close();
  }
});
