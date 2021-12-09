import { initialize } from "..";

export default class Startscreen {
  constructor(holder) {
    this.holder = holder;
    this.init();
    this.setEvents();
  }
  init() {
    this.holder.innerHTML = `
        <div id="startScreen">
        <h1>Welkom bij Train Adventure!</h1>
        <h3>Zo ga je op avontuur:</h3>
        <ul class="explanation">
        <li class="explanation__item">Klik hieronder op start en kies daarna het station waar je wil starten</li>
        <li class="explanation__item">Je krijgt dan het vertrekbord* te zien met de volgende treinen en hun eindstations</li>
        <li class="explanation__item">Neem een trein naar keuze, en eens je op de trein zit, zie je alle tussenstations</li>
        <li class="explanation__item">Stap uit in een station naar keuze, waar je dan weer een nieuw vertrekbord krijgt</li>
        <li class="explanation__item">Herhaal naar hartlust deze stappen en ontdek waar je zoal terecht komt met de trein</li>
        </ul>
        <p>*het is mogelijk dat we voor een bepaald station geen vertrekbord kunnen tonen. Dan krijg je hier een melding van en kan je een nieuwe keuze maken.</p>
        <button id="startButton">START</button>
        </div>`;
  }
  setEvents() {
    document.getElementById("startButton").onclick = () => initialize();
  }
}
