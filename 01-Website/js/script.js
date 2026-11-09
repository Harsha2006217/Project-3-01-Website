/* ==========================================================================
   TribeLink projectsite — js/script.js
   Harsha Kanaparthi · Project 3 · HBO-ICT Open-ICT semester 1
   ==========================================================================
   Negen genummerde blokken. Zoek op BLOK om te navigeren.
     BLOK 1  De gegevens (stories en woordenlijst)
     BLOK 2  Het hoofdmenu
     BLOK 3  Leesmodus met localStorage
     BLOK 4  Headerhoogte meten
     BLOK 5  Demo 1: de pixel-lobby
     BLOK 6  Filter op de ontmoetingsmanieren
     BLOK 7  Demo 2: het profiel in lagen
     BLOK 8  De tabel met user stories
     BLOK 9  De woordenlijst zoeken
   ========================================================================== */

/* Alles staat in één functie zodat mijn variabelen niet op window komen.
   Zo kan een andere script (of een browser-extensie) ze niet per ongeluk
   overschrijven. */
(function () {
  "use strict";

  /* ---------- BLOK 1 — De gegevens ----------
     Alle inhoud die in een tabel of lijst komt, staat hier als gegeven en
     niet in de HTML. Daardoor kan ik sorteren en filteren zonder de HTML
     aan te passen, en staan de cijfers op één plek. */

  /* De stand van Sprint 1 zoals verantwoord bij de review op 15 oktober
     2026: tien van de twaalf stories af, twee teruggezet op de backlog. */
  var STORIES = [
    { nr: "S1",  naam: "Registreren met HU-mail",      wie: "Bart",   stand: "af",    uitleg: "Alleen een @student.hu.nl-adres kan een account maken, met een verificatiecode van zes cijfers." },
    { nr: "S2",  naam: "Inloggen en wachtwoord reset", wie: "Bart",   stand: "af",    uitleg: "Wachtwoord van minimaal twaalf tekens, gehasht opgeslagen. Resetlink via e-mail." },
    { nr: "S3",  naam: "Profiel aanmaken",             wie: "Harsha", stand: "af",    uitleg: "Gebruikersnaam, profielfoto, banner en bio. Onderdeel van het sprintdoel." },
    { nr: "S4",  naam: "Onboarding met poppetje",      wie: "Nick",   stand: "af",    uitleg: "Na registreren maak je meteen je poppetje, zodat je de lobby in kan." },
    { nr: "S5",  naam: "Contact leggen",               wie: "Harsha", stand: "af",    uitleg: "Vriendschapsverzoek sturen, accepteren of weigeren. Onderdeel van het sprintdoel." },
    { nr: "S6",  naam: "Profiel in lagen delen",       wie: "Harsha", stand: "af",    uitleg: "Per onderdeel kiezen wat de ander ziet. Volledig profiel pas na vrijgave van twee kanten." },
    { nr: "S7",  naam: "Ontmoeten: Random chat",       wie: "Marvin", stand: "af",    uitleg: "Koppeling met iemand die online is. Verlaten kan altijd; bewaren maakt er een contact van." },
    { nr: "S8",  naam: "Ontmoeten: Lobby",             wie: "Nick",   stand: "af",    uitleg: "Poppetje in een veld, anderen zien staan en een spel voorstellen." },
    { nr: "S9",  naam: "Ontmoeten: Poster met QR",     wie: "Marvin", stand: "af",    uitleg: "PDF met QR-code en een landingspagina voor wie nog geen account heeft." },
    { nr: "S10", naam: "Berichten en DM",              wie: "Marvin", stand: "af",    uitleg: "Chat met een bewaard contact, met de geschiedenis erbij." },
    { nr: "S11", naam: "Ontmoeten: Open brief",        wie: "Bart",   stand: "terug", uitleg: "Voorkant was klaar, de koppeling met de backend niet. Teruggezet op de product backlog." },
    { nr: "S12", naam: "Feed Pagina",                  wie: "Marvin", stand: "terug", uitleg: "Posts plaatsen, liken en reageren moest nog aan de backend gekoppeld worden. Teruggezet." }
  ];

  /* Veertien termen die in dit project voorkomen. Ik leg ze uit omdat ik
     bij Project 2 de feedback kreeg dat ik onbekende termen liet staan. */
  var TERMEN = [
    { term: "Tribe", uitleg: "De groep van ongeveer dertig eerstejaars waar je het hele semester mee werkt. Je squad zit in een tribe." },
    { term: "Squad", uitleg: "Het projectgroepje binnen een tribe. Bij ons: Bart, Harsha, Nick, Marvin en Ekrem." },
    { term: "Designsprint", uitleg: "De week vóór het bouwen. Onderzoeken, ideeën bedenken, twee papieren prototypes maken en dan pas kiezen." },
    { term: "Low fidelity prototype", uitleg: "Een ruwe schets op papier of met post-its. Bedoeld om een idee te testen, niet om mooi te zijn. Niet gecodeerd." },
    { term: "User story", uitleg: "Een wens in het formaat: als [rol] wil ik [actie], zodat [doel]. Beschrijft waarde voor de gebruiker, niet de oplossing." },
    { term: "Acceptatiecriteria", uitleg: "De lijst waaraan een user story moet voldoen om af te zijn. Functionele eisen, geschreven in taal die de gebruiker begrijpt." },
    { term: "Kwaliteitscriteria", uitleg: "Eisen uit het beroepenveld, met bron. Bijvoorbeeld een contrast van minstens 4,5:1 volgens WCAG." },
    { term: "MoSCoW", uitleg: "Manier om te prioriteren: Must have, Should have, Could have, Won't have. Wij hebben In-App chat en AI-matching bewust Won't gemaakt." },
    { term: "DEEP backlog", uitleg: "Detailed appropriately, Estimated, Emergent, Prioritized. Een backlog die genoeg detail heeft om aan te beginnen, maar niet meer dan dat." },
    { term: "Story points", uitleg: "Een getal voor de zwaarte van een story, meestal uit de Fibonacci-reeks. Het gaat om inspanning en risico, niet om uren." },
    { term: "Laravel", uitleg: "Het PHP-framework waar TribeLink op draait. Regelt routes, database en inloggen." },
    { term: "Inertia", uitleg: "De laag tussen Laravel en React. Je schrijft gewone Laravel-controllers, maar de pagina's zijn React-componenten." },
    { term: "MVC", uitleg: "Model-View-Controller. Model = gegevens, View = wat je ziet, Controller = wat er gebeurt. Bij ons: Model User.php, View een React-pagina, Controller ProfileController.php." },
    { term: "Merge request", uitleg: "Een verzoek om jouw branch samen te voegen. Bij ons moet iemand anders je code eerst reviewen voordat hij naar dev mag." }
  ];

  /* ---------- BLOK 2 — Het hoofdmenu ---------- */
  var menuknop = document.querySelector(".menuknop");
  var hoofdmenu = document.getElementById("hoofdmenu");

  function zetMenu(open) {
    hoofdmenu.classList.toggle("open", open);
    menuknop.setAttribute("aria-expanded", open ? "true" : "false");
    meetHeader();
  }

  menuknop.addEventListener("click", function () {
    zetMenu(menuknop.getAttribute("aria-expanded") !== "true");
  });

  /* Na een klik op een menu-item klapt het menu dicht, maar alleen op
     smalle schermen. Op desktop staat het altijd open en hoeft er niets
     te gebeuren. */
  hoofdmenu.addEventListener("click", function (e) {
    if (e.target.tagName === "A" && window.matchMedia("(max-width: 60em)").matches) {
      zetMenu(false);
    }
  });

  /* Met Escape klapt het menu dicht én gaat de focus terug naar de knop.
     Zonder dat laatste zou de focus in een onzichtbaar element blijven. */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menuknop.getAttribute("aria-expanded") === "true") {
      zetMenu(false);
      menuknop.focus();
    }
  });

  /* ---------- BLOK 3 — Leesmodus met localStorage ---------- */
  var leesknop = document.querySelector(".leesknop");
  var SLEUTEL = "project3-leesmodus";

  function zetLeesmodus(aan) {
    document.body.classList.toggle("leesmodus", aan);
    leesknop.setAttribute("aria-pressed", aan ? "true" : "false");
    /* In sommige privévengsters gooit localStorage een fout. Zonder deze
       try/catch zou mijn hele script stoppen en zou de rest van de pagina
       niet meer werken. Nu gaat de leesmodus gewoon door. */
    try { localStorage.setItem(SLEUTEL, aan ? "1" : "0"); } catch (fout) { /* niets onthouden */ }
    meetHeader();
  }

  leesknop.addEventListener("click", function () {
    zetLeesmodus(!document.body.classList.contains("leesmodus"));
  });

  try {
    if (localStorage.getItem(SLEUTEL) === "1") { zetLeesmodus(true); }
  } catch (fout) { /* privévenster: gewoon de standaardstand */ }

  /* ---------- BLOK 4 — Headerhoogte meten ----------
     De header is sticky en wordt hoger als het menu uitklapt of de tekst
     groter wordt. Ik meet de echte hoogte en zet die in een CSS-variabele,
     zodat een kopje niet onder de header verdwijnt bij een sprong. */
  function meetHeader() {
    var hoogte = document.getElementById("kop").offsetHeight;
    document.documentElement.style.setProperty("--header-hoogte", hoogte + "px");
  }
  window.addEventListener("resize", meetHeader);
  meetHeader();

  /* ---------- BLOK 5 — Demo 1: de pixel-lobby ----------
     Een veld van 14 bij 9 tegels. Mijn poppetje staat op een coördinaat.
     De andere vier staan vast, want er is geen server. Wat wel echt werkt:
     rondlopen, niet door anderen heen lopen, en een spel voorstellen als
     je naast iemand staat. */
  var BREED = 14, HOOG = 9;
  var veld = document.getElementById("lobbyveld");
  var melding = document.getElementById("lobbymelding");
  var loglijst = document.getElementById("lobbylog");
  var spelknop = document.getElementById("spelknop");

  var START = { x: 1, y: 7 };
  var ik = { x: START.x, y: START.y };

  /* Vaste posities en namen. Dit zijn squadleden, geen verzonnen personen. */
  var anderen = [
    { x: 4,  y: 2, naam: "Bart",   klasse: "",       spel: "schaken" },
    { x: 9,  y: 3, naam: "Nick",   klasse: "tweede", spel: "kaartspel" },
    { x: 11, y: 6, naam: "Marvin", klasse: "derde",  spel: "WaveRush" },
    { x: 6,  y: 6, naam: "Ekrem",  klasse: "vierde", spel: "Stack" }
  ];

  /* Ik bouw de tegels één keer op en verplaats daarna alleen de poppetjes.
     Dat is sneller dan het hele veld opnieuw tekenen bij elke stap. */
  var tegels = [];
  for (var y = 0; y < HOOG; y++) {
    for (var x = 0; x < BREED; x++) {
      var tegel = document.createElement("button");
      tegel.type = "button";
      tegel.className = "tegel" + (((x + y) % 2) ? " alt" : "") + ((y === 4 || x === 7) ? " pad" : "");
      tegel.setAttribute("aria-label", "Tegel " + (x + 1) + " van links, " + (y + 1) + " van boven");
      tegel.dataset.x = x;
      tegel.dataset.y = y;
      veld.appendChild(tegel);
      tegels.push(tegel);
    }
  }

  function tekenLobby() {
    tegels.forEach(function (t) { t.innerHTML = ""; });
    anderen.forEach(function (p) {
      var t = tegels[p.y * BREED + p.x];
      var pop = document.createElement("span");
      pop.className = "poppetje npc " + p.klasse;
      pop.textContent = p.naam.charAt(0);
      pop.title = p.naam;
      t.appendChild(pop);
    });
    var mijntegel = tegels[ik.y * BREED + ik.x];
    var mijn = document.createElement("span");
    mijn.className = "poppetje ik";
    mijn.textContent = "H";
    mijn.title = "Jij";
    mijntegel.appendChild(mijn);
    spelknop.disabled = !iemandNaast();
  }

  /* Staat er iemand op een aangrenzende tegel? Diagonaal telt niet mee,
     want dan zou je iemand kunnen uitnodigen die je niet echt raakt. */
  function iemandNaast() {
    for (var i = 0; i < anderen.length; i++) {
      var p = anderen[i];
      if (Math.abs(p.x - ik.x) + Math.abs(p.y - ik.y) === 1) { return p; }
    }
    return null;
  }

  function vrij(x, y) {
    if (x < 0 || y < 0 || x >= BREED || y >= HOOG) { return false; }
    return !anderen.some(function (p) { return p.x === x && p.y === y; });
  }

  function log(tekst) {
    var li = document.createElement("li");
    li.textContent = tekst;
    loglijst.appendChild(li);
    loglijst.scrollTop = loglijst.scrollHeight;
  }

  function stap(dx, dy) {
    var nx = ik.x + dx, ny = ik.y + dy;
    if (!vrij(nx, ny)) {
      melding.textContent = "Daar kan je niet heen. Loop eromheen.";
      return;
    }
    ik.x = nx; ik.y = ny;
    tekenLobby();
    var naast = iemandNaast();
    melding.textContent = naast
      ? "Je staat naast " + naast.naam + ". Je kunt nu een spel voorstellen."
      : "Je staat op tegel " + (ik.x + 1) + ", " + (ik.y + 1) + ". Loop naar iemand toe.";
  }

  /* Klikken op een tegel: ik loop er in rechte stappen heen, eerst
     horizontaal en dan verticaal. Geen padzoeker: dat is voor deze demo
     niet nodig en het zou de code onnodig groot maken. */
  veld.addEventListener("click", function (e) {
    var tegel = e.target.closest(".tegel");
    if (!tegel) { return; }
    var doex = parseInt(tegel.dataset.x, 10), doey = parseInt(tegel.dataset.y, 10);
    var guard = 0;
    while ((ik.x !== doex || ik.y !== doey) && guard < 40) {
      guard++;
      if (ik.x !== doex) {
        var vooruit = ik.x + (doex > ik.x ? 1 : -1);
        if (vrij(vooruit, ik.y)) { ik.x = vooruit; } else if (ik.y !== doey) {
          var zij = ik.y + (doey > ik.y ? 1 : -1);
          if (vrij(ik.x, zij)) { ik.y = zij; } else { break; }
        } else { break; }
      } else if (ik.y !== doey) {
        var vy = ik.y + (doey > ik.y ? 1 : -1);
        if (vrij(ik.x, vy)) { ik.y = vy; } else { break; }
      }
    }
    tekenLobby();
    var naast = iemandNaast();
    melding.textContent = naast
      ? "Je staat naast " + naast.naam + ". Je kunt nu een spel voorstellen."
      : "Je staat op tegel " + (ik.x + 1) + ", " + (ik.y + 1) + ".";
  });

  /* Pijltjestoetsen werken alleen als het veld focus heeft. Zo kaap ik de
     toetsen van de rest van de pagina niet af. */
  veld.addEventListener("keydown", function (e) {
    var map = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] };
    if (map[e.key]) { e.preventDefault(); stap(map[e.key][0], map[e.key][1]); }
  });

  document.querySelectorAll(".pijl").forEach(function (knop) {
    knop.addEventListener("click", function () {
      var map = { omhoog: [0, -1], omlaag: [0, 1], links: [-1, 0], rechts: [1, 0] };
      var d = map[knop.dataset.stap];
      stap(d[0], d[1]);
    });
  });

  spelknop.addEventListener("click", function () {
    var naast = iemandNaast();
    if (!naast) { return; }
    log("Je stelt " + naast.naam + " een potje " + naast.spel + " voor.");
    log(naast.naam + " accepteert. Jullie spelen samen.");
    log("Na afloop kun je kiezen of je " + naast.naam + " wilt bewaren.");
    melding.textContent = "Je hebt met " + naast.naam + " " + naast.spel +
      " gespeeld. Dit is precies de stap die Isabel bedoelde: het spel geeft je een reden om te praten.";
  });

  document.getElementById("herstelknop").addEventListener("click", function () {
    ik.x = START.x; ik.y = START.y;
    loglijst.innerHTML = "";
    tekenLobby();
    melding.textContent = "Je staat weer bij de ingang. Loop naar iemand toe.";
  });

  tekenLobby();
  log("Je bent de lobby binnengekomen. Er zijn vier tribe-leden.");

  /* ---------- BLOK 6 — Filter op de ontmoetingsmanieren ---------- */
  var chips = document.querySelectorAll(".chip[data-filter]");
  var manieren = document.querySelectorAll(".manier");
  var filterstatus = document.getElementById("filterstatus");

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var keuze = chip.dataset.filter;
      /* aria-pressed bijwerken zodat een schermlezer weet welke filter aan
         staat. Zonder dit is de knop voor een blinde gebruiker niet te
         onderscheiden van de andere. */
      chips.forEach(function (c) {
        c.setAttribute("aria-pressed", c === chip ? "true" : "false");
      });
      var zichtbaar = 0;
      manieren.forEach(function (kaart) {
        var past = keuze === "alles" || kaart.dataset.stap === keuze;
        kaart.classList.toggle("verborgen", !past);
        if (past) { zichtbaar++; }
      });
      /* role=status laat een schermlezer deze tekst voorlezen zonder dat
         de focus erheen gaat. */
      filterstatus.textContent = zichtbaar + " van de " + manieren.length + " manieren zichtbaar.";
    });
  });

  /* ---------- BLOK 7 — Demo 2: het profiel in lagen ----------
     Drie lagen. Laag 2 gaat pas open na een ontmoeting in het echt.
     Laag 3 gaat pas open als beide partijen hebben vrijgegeven. Ik simuleer
     de andere partij met een vlaggetje, want er is geen tweede gebruiker. */
  var VELDEN = [
    { naam: "Gebruikersnaam",   waarde: "harsha_k",              laag: 1 },
    { naam: "Poppetje",         waarde: "geel poppetje",         laag: 1 },
    { naam: "Tribe",            waarde: "S1",                    laag: 1 },
    { naam: "Bio",              waarde: "Bouwt graag dingen die werken.", laag: 2 },
    { naam: "Interesses",       waarde: "schaken, bowlen, Python", laag: 2 },
    { naam: "Echte naam",       waarde: "Harsha Kanaparthi",     laag: 3 },
    { naam: "Discord",          waarde: "harsha_k",              laag: 3 },
    { naam: "Telefoon",         waarde: "zichtbaar in het product", laag: 3 }
  ];

  var laag = 1, ontmoet = false, anderKlaar = false;
  var ontmoetknop = document.getElementById("ontmoetknop");
  var deelknop = document.getElementById("deelknop");
  var privacymelding = document.getElementById("privacymelding");
  var profielvelden = document.getElementById("profielvelden");
  var profielsub = document.getElementById("profielsub");

  function tekenProfiel() {
    profielvelden.innerHTML = "";
    VELDEN.forEach(function (v) {
      var li = document.createElement("li");
      var open = v.laag <= laag;
      var links = document.createElement("span");
      links.textContent = v.naam;
      var rechts = document.createElement("span");
      if (open) {
        rechts.textContent = v.waarde;
        li.appendChild(links);
        li.appendChild(rechts);
      } else {
        li.className = "gesloten";
        rechts.className = "veldslot dicht";
        rechts.textContent = "laag " + v.laag + " — nog dicht";
        li.appendChild(links);
        li.appendChild(rechts);
      }
      profielvelden.appendChild(li);
    });
    profielsub.textContent = "Laag " + laag + " van 3 zichtbaar voor Bart";
    deelknop.disabled = laag >= 3 || (laag === 1 && !ontmoet);
    ontmoetknop.disabled = ontmoet;
  }

  ontmoetknop.addEventListener("click", function () {
    ontmoet = true;
    /* In het echt krijgen jullie allebei een tijdelijke code. Ik zet de
       melding erbij zodat duidelijk is dat dit niet zomaar een knop is. */
    privacymelding.textContent =
      "Jullie hebben elkaar in het echt ontmoet en allebei de code ingevoerd. Laag 2 mag nu open.";
    tekenProfiel();
  });

  deelknop.addEventListener("click", function () {
    if (laag === 1 && ontmoet) {
      laag = 2;
      privacymelding.textContent =
        "Laag 2. Bart ziet je bio en je interesses. Je echte naam en contactgegevens blijven dicht.";
    } else if (laag === 2) {
      /* De kern van de keuze: mijn vrijgave alleen is niet genoeg. */
      if (!anderKlaar) {
        anderKlaar = true;
        privacymelding.textContent =
          "Jij hebt laag 3 vrijgegeven, Bart nog niet. Er verandert daarom nog niets. Dit is de wederkerigheid: één kant is niet genoeg.";
      } else {
        laag = 3;
        privacymelding.textContent =
          "Laag 3. Jullie hebben allebei alles vrijgegeven, dus jullie zijn nu officieel vrienden en zien elkaars contactgegevens.";
      }
    }
    tekenProfiel();
  });

  document.getElementById("privacyreset").addEventListener("click", function () {
    laag = 1; ontmoet = false; anderKlaar = false;
    privacymelding.textContent = "Laag 1. Bart ziet alleen jouw gebruikersnaam en je poppetje.";
    tekenProfiel();
  });

  tekenProfiel();

  /* ---------- BLOK 8 — De tabel met user stories ----------
     Drie stappen: filteren op de zoekterm, sorteren, en dan opbouwen met
     createElement. Ik gebruik geen innerHTML met de zoekterm erin, zodat
     een zoekterm nooit als HTML kan worden uitgevoerd. */
  var zoek = document.getElementById("zoek");
  var sortering = document.getElementById("sortering");
  var storyrijen = document.getElementById("storyrijen");
  var storytel = document.getElementById("storytel");

  function bouwTabel() {
    var term = zoek.value.trim().toLowerCase();
    var rijen = STORIES.filter(function (s) {
      if (!term) { return true; }
      return (s.naam + " " + s.wie + " " + s.uitleg + " " + s.nr).toLowerCase().indexOf(term) !== -1;
    });

    var wijze = sortering.value;
    rijen.sort(function (a, b) {
      if (wijze === "naam") { return a.naam.localeCompare(b.naam, "nl"); }
      if (wijze === "status") { return a.stand.localeCompare(b.stand, "nl") || a.nr.localeCompare(b.nr, "nl", { numeric: true }); }
      return a.nr.localeCompare(b.nr, "nl", { numeric: true });
    });

    storyrijen.innerHTML = "";
    rijen.forEach(function (s) {
      var tr = document.createElement("tr");

      var tdNr = document.createElement("td");
      tdNr.textContent = s.nr;
      tr.appendChild(tdNr);

      var th = document.createElement("th");
      th.scope = "row";
      th.textContent = s.naam;
      tr.appendChild(th);

      var tdWie = document.createElement("td");
      tdWie.textContent = s.wie;
      tr.appendChild(tdWie);

      var tdStand = document.createElement("td");
      var badge = document.createElement("span");
      badge.className = "stand " + (s.stand === "af" ? "af" : "terug");
      badge.textContent = s.stand === "af" ? "Af" : "Teruggezet";
      tdStand.appendChild(badge);
      tr.appendChild(tdStand);

      var tdU = document.createElement("td");
      tdU.textContent = s.uitleg;
      tr.appendChild(tdU);

      storyrijen.appendChild(tr);
    });

    var af = rijen.filter(function (s) { return s.stand === "af"; }).length;
    storytel.textContent = rijen.length + " van de " + STORIES.length +
      " stories zichtbaar, waarvan " + af + " af.";
  }

  zoek.addEventListener("input", bouwTabel);
  sortering.addEventListener("change", bouwTabel);
  bouwTabel();

  /* ---------- BLOK 9 — De woordenlijst zoeken ---------- */
  var termzoek = document.getElementById("termzoek");
  var termenlijst = document.getElementById("termenlijst");
  var termtel = document.getElementById("termtel");

  TERMEN.forEach(function (t) {
    var li = document.createElement("li");
    li.className = "term";
    var dl = document.createElement("dl");
    var dt = document.createElement("dt");
    dt.textContent = t.term;
    var dd = document.createElement("dd");
    dd.textContent = t.uitleg;
    dl.appendChild(dt);
    dl.appendChild(dd);
    li.appendChild(dl);
    li.dataset.tekst = (t.term + " " + t.uitleg).toLowerCase();
    termenlijst.appendChild(li);
  });

  function filterTermen() {
    var term = termzoek.value.trim().toLowerCase();
    var zichtbaar = 0;
    termenlijst.querySelectorAll(".term").forEach(function (li) {
      var past = !term || li.dataset.tekst.indexOf(term) !== -1;
      li.classList.toggle("verborgen", !past);
      if (past) { zichtbaar++; }
    });
    termtel.textContent = zichtbaar + " van de " + TERMEN.length + " termen zichtbaar.";
  }

  termzoek.addEventListener("input", filterTermen);
  filterTermen();

})();
